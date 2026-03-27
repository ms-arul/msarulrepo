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

  const { name, email, subject, message, avatar_url, google_uid } = req.body || {};

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
    const transporterInstance = getTransporter();
    const receiverEmail = process.env.RECEIVER_EMAIL || process.env.SMTP_USER;

    // ✅ Sanitize (avoid HTML injection)
    const safeName = escapeHTML(name.trim());
    const safeEmail = escapeHTML(email.trim());
    const safeSubject = escapeHTML(subject.trim());
    const safeMessage = escapeHTML(message.trim()).replace(/\n/g, "<br/>");

    const isGoogleAuth = !!google_uid;

    // Build avatar section for email
    const avatarSection = avatar_url
      ? `<img src="${escapeHTML(avatar_url)}" alt="Profile" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #34D399;vertical-align:middle;margin-right:12px;" />`
      : "";

    const verifiedBadge = isGoogleAuth
      ? `<span style="display:inline-block;padding:2px 8px;border-radius:6px;background:#d1fae5;color:#059669;font-size:11px;font-weight:700;margin-left:8px;">✓ Google Verified</span>`
      : `<span style="display:inline-block;padding:2px 8px;border-radius:6px;background:#fef3c7;color:#d97706;font-size:11px;font-weight:700;margin-left:8px;">Manual Entry</span>`;

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: receiverEmail,
      replyTo: safeEmail,
      subject: `📩 ${safeSubject}`,
      html: `
        <div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:0;">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:28px 24px;border-radius:12px 12px 0 0;">
            <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">
              📬 New Contact Message
            </h2>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.5);font-size:12px;">
              From your Portfolio Contact Page · ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

          <!-- Body -->
          <div style="background:#ffffff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;">
            <!-- Sender Info -->
            <div style="display:flex;align-items:center;padding:16px;background:#f8fafc;border-radius:10px;margin-bottom:20px;">
              ${avatarSection}
              <div>
                <div style="font-size:15px;font-weight:700;color:#1e293b;">
                  ${safeName} ${verifiedBadge}
                </div>
                <div style="font-size:13px;color:#64748b;margin-top:2px;">
                  ${safeEmail}
                </div>
              </div>
            </div>

            <!-- Subject -->
            <div style="margin-bottom:16px;">
              <div style="font-size:11px;text-transform:uppercase;color:#94a3b8;font-weight:700;letter-spacing:1px;margin-bottom:4px;">Subject</div>
              <div style="font-size:15px;color:#1e293b;font-weight:600;">${safeSubject}</div>
            </div>

            <!-- Message -->
            <div style="margin-bottom:16px;">
              <div style="font-size:11px;text-transform:uppercase;color:#94a3b8;font-weight:700;letter-spacing:1px;margin-bottom:8px;">Message</div>
              <div style="font-size:14px;color:#334155;line-height:1.7;padding:16px;background:#f8fafc;border-radius:10px;border-left:3px solid #F13024;">
                ${safeMessage}
              </div>
            </div>

            <!-- Quick Reply -->
            <div style="text-align:center;padding-top:16px;border-top:1px solid #f1f5f9;">
              <a href="mailto:${safeEmail}" style="display:inline-block;padding:10px 28px;background:#F13024;color:#ffffff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">
                ↩ Reply to ${safeName}
              </a>
            </div>
          </div>
        </div>
      `,
    };

    await transporterInstance.sendMail(mailOptions);

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
