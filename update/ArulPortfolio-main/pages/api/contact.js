import nodemailer from "nodemailer";

/**
 * ✅ Reuse transporter between invocations (good for Vercel)
 */
let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // App password
      },
    });
  }

  return transporter;
}

/**
 * ✅ Basic helpers
 */
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHTML = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

/**
 * ✅ Simple memory rate limiter (best effort)
 * - Works on warm instances (not perfect across all serverless instances)
 */
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP
const ipHits = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const data = ipHits.get(ip) || { count: 0, start: now };

  if (now - data.start > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, start: now });
    return { ok: true };
  }

  if (data.count >= RATE_LIMIT_MAX) {
    return { ok: false };
  }

  data.count += 1;
  ipHits.set(ip, data);
  return { ok: true };
}

export default async function handler(req, res) {
  // ✅ Only POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // ✅ Get user IP (Vercel)
  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  // ✅ Rate limit
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again in a minute.",
    });
  }

  const { name, email, subject, message } = req.body || {};

  // ✅ Validation
  if (
    !name ||
    !email ||
    !subject ||
    !message ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    return res.status(400).json({ success: false, message: "Invalid request data" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  // ✅ Prevent empty / super long spam
  if (name.length > 60 || subject.length > 120 || message.length > 3000) {
    return res.status(400).json({
      success: false,
      message: "Message too long. Please shorten your content.",
    });
  }

  try {
    const transporter = getTransporter();

    // ✅ Optional: verify transporter once (good for debugging)
    // await transporter.verify();

    const receiverEmail = process.env.RECEIVER_EMAIL || process.env.SMTP_USER;

    // ✅ Sanitize (avoid HTML injection)
    const safeName = escapeHTML(name.trim());
    const safeEmail = escapeHTML(email.trim());
    const safeSubject = escapeHTML(subject.trim());
    const safeMessage = escapeHTML(message.trim()).replace(/\n/g, "<br/>");

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: receiverEmail, // ✅ env based receiver
      replyTo: safeEmail,
      subject: `📩 ${safeSubject}`,
      html: `
        <div style="font-family: system-ui, Arial; padding: 12px">
          <h2 style="margin:0 0 10px">New Contact Message</h2>
          <p style="margin:4px 0"><b>Name:</b> ${safeName}</p>
          <p style="margin:4px 0"><b>Email:</b> ${safeEmail}</p>
          <p style="margin:4px 0"><b>Subject:</b> ${safeSubject}</p>
          <hr style="margin:12px 0" />
          <p style="line-height:1.6">${safeMessage}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully ✅",
    });
  } catch (error) {
    console.error("Mail error:", error);

    return res.status(500).json({
      success: false,
      message: "Email service unavailable ❌",
    });
  }
}
