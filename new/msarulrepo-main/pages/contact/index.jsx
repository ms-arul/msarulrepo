import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import {
  RiMailLine,
  RiSendPlaneLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiInstagramLine,
  RiGithubLine,
  RiLinkedinFill,
  RiWhatsappLine,
  RiArrowRightUpLine,
  RiShieldCheckLine,
  RiLogoutBoxRLine,
  RiUserLine,
  RiMapPinLine,
  RiTimeLine,
  RiSparklingLine,
  RiLockLine,
} from "react-icons/ri";

import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";
import { supabase } from "../../lib/supabaseClient";

/* ─────────────────────────────────────
   CONSTANTS
───────────────────────────────────── */
const MAX_MESSAGE_LENGTH = 1500;

const INFO_ITEMS = [
  {
    Icon: RiMailLine,
    label: "Email",
    value: "msarul7686@gmail.com",
    href: "mailto:msarul7686@gmail.com",
    color: "#F13024",
  },
  {
    Icon: RiWhatsappLine,
    label: "WhatsApp",
    value: "+91 99623 49659",
    href: "https://wa.me/919962349659",
    color: "#25D366",
  },
  {
    Icon: RiMapPinLine,
    label: "Location",
    value: "Chennai, Tamil Nadu, IN",
    href: null,
    color: "#A78BFA",
  },
];

const SOCIALS = [
  { Icon: RiInstagramLine, href: "https://www.instagram.com/ms_arul_?igsh=MXc4cTc4Z3UyMmZxeQ==", label: "Instagram", color: "#E1306C" },
  { Icon: RiLinkedinFill, href: "https://in.linkedin.com/in/arul-prakash-a3694a2ba", label: "LinkedIn", color: "#0A66C2" },
  { Icon: RiGithubLine, href: "https://github.com/ms-arul", label: "GitHub", color: "#fff" },
  { Icon: RiWhatsappLine, href: "https://wa.me/919962349659", label: "WhatsApp", color: "#25D366" },
];

/* ─────────────────────────────────────
   STAGGER MOTION VARIANTS
───────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────
   GOOGLE ICON SVG (crisp, multi-color)
───────────────────────────────────── */
const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

/* ─────────────────────────────────────
   FLOATING LABEL INPUT
───────────────────────────────────── */
const FloatingInput = ({ label, name, type = "text", required, disabled, value, readOnly, icon: IconComp }) => {
  const [focused, setFocused] = useState(false);
  const [localVal, setLocalVal] = useState("");
  const isControlled = value !== undefined;
  const lifted = focused || (isControlled ? value.length > 0 : localVal.length > 0);
  const isLocked = readOnly;

  return (
    <motion.div className="relative group" variants={staggerItem}>
      <label
        htmlFor={name}
        className="absolute left-4 transition-all duration-300 pointer-events-none select-none font-medium"
        style={{
          top: lifted ? "6px" : "50%",
          transform: lifted ? "translateY(0) scale(0.75)" : "translateY(-50%)",
          transformOrigin: "left",
          fontSize: lifted ? "11px" : "14px",
          color: isLocked ? "#34D399" : focused ? "#F13024" : "rgba(255,255,255,0.35)",
          zIndex: 2,
          letterSpacing: lifted ? "0.5px" : "0",
        }}
      >
        {label}
        {isLocked && <RiLockLine style={{ display: "inline", marginLeft: 4, fontSize: 9, verticalAlign: "middle" }} />}
        {required && !isLocked && <span style={{ color: "#F13024" }}> *</span>}
      </label>

      {/* Subtle glow underline on focus */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-[1px] rounded-full transition-all duration-500"
        style={{
          background: focused && !isLocked ? "rgba(241,48,36,0.5)" : "transparent",
          boxShadow: focused && !isLocked ? "0 0 12px 2px rgba(241,48,36,0.15)" : "none",
        }}
      />

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        value={isControlled ? value : undefined}
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          if (!isControlled) setLocalVal(e.target.value);
        }}
        onChange={(e) => { if (!isControlled) setLocalVal(e.target.value); }}
        className="w-full h-[56px] pt-5 pb-1 px-4 rounded-xl text-white text-[13px] outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        style={{
          background: isLocked
            ? "rgba(52,211,153,0.03)"
            : focused
              ? "rgba(241,48,36,0.04)"
              : "rgba(255,255,255,0.025)",
          border: isLocked
            ? "1px solid rgba(52,211,153,0.15)"
            : focused
              ? "1px solid rgba(241,48,36,0.4)"
              : "1px solid rgba(255,255,255,0.06)",
          boxShadow: focused && !isLocked
            ? "0 0 0 3px rgba(241,48,36,0.06), 0 4px 16px rgba(0,0,0,0.1)"
            : "0 2px 8px rgba(0,0,0,0.05)",
          cursor: isLocked ? "default" : undefined,
        }}
      />
    </motion.div>
  );
};

/* ─────────────────────────────────────
   FLOATING LABEL TEXTAREA
───────────────────────────────────── */
const FloatingTextarea = ({ label, name, required, disabled, maxLength }) => {
  const [focused, setFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [hasValue, setHasValue] = useState(false);
  const lifted = focused || hasValue;

  return (
    <motion.div className="relative" variants={staggerItem}>
      <label
        htmlFor={name}
        className="absolute left-4 transition-all duration-300 pointer-events-none select-none font-medium"
        style={{
          top: lifted ? "10px" : "22px",
          fontSize: lifted ? "11px" : "14px",
          color: focused ? "#F13024" : "rgba(255,255,255,0.35)",
          zIndex: 2,
          letterSpacing: lifted ? "0.5px" : "0",
        }}
      >
        {label}
        {required && <span style={{ color: "#F13024" }}> *</span>}
      </label>

      {/* Glow underline */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-[1px] rounded-full transition-all duration-500"
        style={{
          background: focused ? "rgba(241,48,36,0.5)" : "transparent",
          boxShadow: focused ? "0 0 12px 2px rgba(241,48,36,0.15)" : "none",
        }}
      />

      <textarea
        id={name}
        name={name}
        required={required}
        disabled={disabled}
        rows={4}
        maxLength={maxLength}
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          setCharCount(e.target.value.length);
        }}
        className="w-full resize-none pt-8 pb-3 px-4 rounded-xl text-white text-[13px] outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        style={{
          background: focused ? "rgba(241,48,36,0.04)" : "rgba(255,255,255,0.025)",
          border: focused ? "1px solid rgba(241,48,36,0.4)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: focused
            ? "0 0 0 3px rgba(241,48,36,0.06), 0 4px 16px rgba(0,0,0,0.1)"
            : "0 2px 8px rgba(0,0,0,0.05)",
        }}
      />

      {/* Character counter */}
      {maxLength && (
        <div
          className="absolute bottom-2 right-3 text-[10px] font-mono transition-colors duration-300"
          style={{
            color: charCount > maxLength * 0.9 ? "#F13024" : "rgba(255,255,255,0.2)",
          }}
        >
          {charCount}/{maxLength}
        </div>
      )}
    </motion.div>
  );
};

/* ─────────────────────────────────────
   SKELETON PULSE (loading state)
───────────────────────────────────── */
const SkeletonPulse = () => (
  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl animate-pulse"
    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
    <div className="w-10 h-10 rounded-full bg-white/5" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-24 rounded bg-white/5" />
      <div className="h-2.5 w-36 rounded bg-white/[0.03]" />
    </div>
  </div>
);

/* ─────────────────────────────────────
   SUCCESS CELEBRATION DOTS
───────────────────────────────────── */
const SuccessParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          background: "#34D399",
          left: `${15 + i * 14}%`,
          top: "50%",
        }}
        initial={{ y: 0, opacity: 1, scale: 1 }}
        animate={{ y: [-20, -40], opacity: [1, 0], scale: [1, 0.5] }}
        transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
      />
    ))}
  </div>
);

/* ════════════════════════════════════════
   MAIN PAGE COMPONENT
════════════════════════════════════════ */
const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [googleUser, setGoogleUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [formProgress, setFormProgress] = useState(0);
  const formRef = useRef(null);

  // Track form completion progress
  const updateProgress = useCallback(() => {
    if (!formRef.current) return;
    const fields = formRef.current.querySelectorAll("input:not([readonly]), textarea");
    let filled = 0;
    let total = fields.length;
    if (googleUser) {
      filled += 2; // name + email are auto-filled
      total += 2;
    }
    fields.forEach((f) => { if (f.value.trim().length > 0) filled++; });
    setFormProgress(total > 0 ? Math.round((filled / (googleUser ? total : total)) * 100) : 0);
  }, [googleUser]);

  /* ── Session check ── */
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setGoogleUser({
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "",
            email: session.user.email || "",
            avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || "",
            id: session.user.id,
          });
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setInitializing(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setGoogleUser({
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "",
            email: session.user.email || "",
            avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || "",
            id: session.user.id,
          });
          setAuthLoading(false);
        }
        if (event === "SIGNED_OUT") {
          setGoogleUser(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  /* ── Google Sign-In ── */
  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined"
            ? `${window.location.origin}/contact`
            : undefined,
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error("Google sign-in error:", err);
      setAuthLoading(false);
      setStatus({ type: "error", message: "Google sign-in failed. Please try again." });
    }
  };

  /* ── Sign Out ── */
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setGoogleUser(null);
    setFormProgress(0);
  };

  /* ── Submit ── */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });
    const form = event.target;

    const payload = {
      name: googleUser ? googleUser.name : form.name.value,
      email: googleUser ? googleUser.email : form.email.value,
      subject: form.subject.value,
      message: form.message.value,
      avatar_url: googleUser?.avatar || null,
      google_uid: googleUser?.id || null,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Submission failed");

      try {
        await supabase.from("contact_enquiries").insert([
          {
            name: payload.name,
            email: payload.email,
            subject: payload.subject,
            message: payload.message,
            avatar_url: payload.avatar_url,
            google_uid: payload.google_uid,
            is_google_auth: !!googleUser,
            created_at: new Date().toISOString(),
          },
        ]);
      } catch (dbErr) {
        console.warn("Supabase insert failed (non-blocking):", dbErr);
      }

      setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
      form.reset();
      setFormProgress(googleUser ? 50 : 0);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen flex items-center justify-center bg-primary/30 overflow-y-auto lg:overflow-hidden overflow-x-hidden pb-40 lg:pb-0 pt-36 lg:pt-[120px] relative">
      <Circles />

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute top-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #F13024 0%, transparent 70%)", filter: "blur(100px)" }} />
      <div className="pointer-events-none absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(90px)" }} />
      <div className="pointer-events-none absolute top-[40%] left-[30%] w-[250px] h-[250px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="w-full max-w-[1100px] mx-auto flex flex-col xl:flex-row gap-8 xl:gap-12 xl:items-center">

          {/* ══════════ LEFT INFO PANEL ══════════ */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="xl:w-[320px] flex-shrink-0 flex flex-col gap-5"
          >
            {/* ─ heading ─ */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
                style={{
                  background: "rgba(241,48,36,0.06)",
                  border: "1px solid rgba(241,48,36,0.15)",
                  color: "#F13024",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                Available for Projects
              </motion.div>

              <h2 className="text-[28px] md:text-[40px] font-bold leading-tight mb-3 text-white">
                Let&apos;s{" "}
                <span
                  className="text-accent relative inline-block"
                  style={{ textShadow: "0 0 40px rgba(241,48,36,0.35)" }}
                >
                  connect
                  <motion.svg
                    className="absolute -bottom-1 left-0 w-full overflow-visible"
                    viewBox="0 0 130 6" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <motion.path
                      d="M2 4 C30 1, 70 5, 100 2 C115 1, 125 3, 128 2"
                      stroke="#F13024" strokeWidth="2" strokeLinecap="round" fill="none"
                    />
                  </motion.svg>
                </span>
                <span className="text-accent">.</span>
              </h2>

              <p className="text-white/45 text-[13px] leading-relaxed max-w-[280px]">
                Got a project or idea? Drop me a message — I&apos;d love to collaborate
                and build something remarkable together.
              </p>
            </div>

            {/* ─ Response time badge ─ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.1)" }}
            >
              <RiTimeLine style={{ color: "#34D399", fontSize: 14 }} />
              <span className="text-[11px] text-white/50">
                Avg. response time: <span className="text-white/70 font-semibold">under 12 hours</span>
              </span>
            </motion.div>

            {/* ─ Info cards ─ */}
            <motion.div
              className="flex flex-col gap-2.5"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {INFO_ITEMS.map(({ Icon, label, value, href, color }) => (
                <motion.div key={label} variants={staggerItem}>
                  {href ? (
                    <Link
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="flex items-center gap-3 px-3.5 py-3 rounded-xl group transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = color + "0A";
                        e.currentTarget.style.borderColor = color + "25";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: color + "12", color }}
                      >
                        <Icon />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase tracking-[1.5px] text-white/25 font-bold mb-0.5">{label}</div>
                        <div className="text-white/75 text-[13px] font-medium truncate">{value}</div>
                      </div>
                      <RiArrowRightUpLine className="ml-auto text-white/15 group-hover:text-white/50 transition-all duration-300 flex-shrink-0 text-sm" />
                    </Link>
                  ) : (
                    <div
                      className="flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: color + "12", color }}
                      >
                        <Icon />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase tracking-[1.5px] text-white/25 font-bold mb-0.5">{label}</div>
                        <div className="text-white/75 text-[13px] font-medium">{value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* ─ Socials ─ */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-[9px] uppercase tracking-[1.5px] text-white/20 font-bold mb-2.5">Connect with me</p>
              <div className="flex items-center gap-2">
                {SOCIALS.map(({ Icon, href, label, color }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = color + "18";
                      e.currentTarget.style.borderColor = color + "40";
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════ RIGHT — FORM PANEL ══════════ */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1 min-w-0"
          >
            <div
              className="rounded-2xl p-5 sm:p-7 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.008) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.02) inset",
              }}
            >
              {/* Subtle top edge glow */}
              <div
                className="absolute top-0 left-[15%] right-[15%] h-[1px]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(241,48,36,0.2), transparent)",
                }}
              />

              {/* ─ Panel Header ─ */}
              <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                  style={{ background: "rgba(241,48,36,0.1)", color: "#F13024" }}
                >
                  <RiMailLine />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white/90 font-bold text-sm">Send a Message</div>
                  <div className="text-white/30 text-[11px]">I&apos;ll get back to you shortly</div>
                </div>

                {/* Progress + Online indicator */}
                <div className="flex items-center gap-3">
                  {/* Mini progress ring */}
                  {formProgress > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative w-7 h-7"
                    >
                      <svg className="w-7 h-7 -rotate-90" viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                        <motion.circle
                          cx="14" cy="14" r="11" fill="none"
                          stroke="#F13024" strokeWidth="2" strokeLinecap="round"
                          strokeDasharray={69.1}
                          initial={{ strokeDashoffset: 69.1 }}
                          animate={{ strokeDashoffset: 69.1 - (69.1 * formProgress / 100) }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white/40">
                        {formProgress}%
                      </span>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <span className="text-[10px] text-white/25 font-medium hidden sm:inline">Online</span>
                  </div>
                </div>
              </div>

              {/* ─ Google Auth Section ─ */}
              <AnimatePresence mode="wait">
                {initializing && (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-5"
                  >
                    <SkeletonPulse />
                  </motion.div>
                )}

                {!initializing && !googleUser && (
                  <motion.div
                    key="google-signin"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="mb-5"
                  >
                    <motion.button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={authLoading}
                      whileHover={!authLoading ? { scale: 1.008, y: -1 } : {}}
                      whileTap={!authLoading ? { scale: 0.98 } : {}}
                      className="w-full flex items-center justify-center gap-3 h-[48px] rounded-xl font-semibold text-[13px] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.8)",
                      }}
                      onMouseEnter={(e) => {
                        if (!authLoading) {
                          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {authLoading ? (
                        <>
                          <motion.span
                            className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          />
                          <span className="text-white/60">Connecting to Google…</span>
                        </>
                      ) : (
                        <>
                          <GoogleIcon size={16} />
                          <span>Sign in with Google</span>
                          <span className="text-[10px] text-white/25 ml-0.5 hidden sm:inline">· auto-fill your details</span>
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center gap-3 my-4">
                      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                      <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">or fill manually</span>
                      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                    </div>
                  </motion.div>
                )}

                {/* ── Signed-in user card ── */}
                {!initializing && googleUser && (
                  <motion.div
                    key="user-card"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl relative overflow-hidden"
                    style={{
                      background: "rgba(52,211,153,0.04)",
                      border: "1px solid rgba(52,211,153,0.12)",
                    }}
                  >
                    {/* Subtle shimmer */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: "linear-gradient(135deg, transparent 40%, rgba(52,211,153,0.06) 50%, transparent 60%)",
                      }}
                    />

                    {/* Avatar */}
                    {googleUser.avatar ? (
                      <div className="relative flex-shrink-0">
                        <img
                          src={googleUser.avatar}
                          alt={googleUser.name}
                          className="w-10 h-10 rounded-full object-cover"
                          style={{ border: "2px solid rgba(52,211,153,0.25)", WebkitTouchCallout: "none" }}
                          referrerPolicy="no-referrer"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#131424] flex items-center justify-center">
                          <RiShieldCheckLine style={{ fontSize: 8, color: "#34D399" }} />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold"
                        style={{ background: "rgba(52,211,153,0.1)", color: "#34D399" }}
                      >
                        <RiUserLine />
                      </div>
                    )}

                    <div className="min-w-0 flex-1 relative z-10">
                      <div className="text-[13px] font-semibold text-white/85 truncate">{googleUser.name}</div>
                      <div className="text-[11px] text-white/40 truncate">{googleUser.email}</div>
                    </div>

                    <div className="flex items-center gap-1.5 relative z-10">
                      <div
                        className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider"
                        style={{ background: "rgba(52,211,153,0.1)", color: "#34D399" }}
                      >
                        <RiShieldCheckLine style={{ fontSize: 10 }} />
                        Verified
                      </div>
                      <motion.button
                        type="button"
                        onClick={handleSignOut}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-white/25 transition-all duration-200 text-sm"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#F13024";
                          e.currentTarget.style.background = "rgba(241,48,36,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.25)";
                          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                        }}
                        title="Sign out"
                      >
                        <RiLogoutBoxRLine />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─ Form ─ */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                autoComplete="off"
                className="flex flex-col gap-3.5"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                onChange={updateProgress}
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <FloatingInput
                    label="Your Name"
                    name="name"
                    required={!googleUser}
                    disabled={isLoading}
                    value={googleUser ? googleUser.name : undefined}
                    readOnly={!!googleUser}
                  />
                  <FloatingInput
                    label="Email Address"
                    name="email"
                    type="email"
                    required={!googleUser}
                    disabled={isLoading}
                    value={googleUser ? googleUser.email : undefined}
                    readOnly={!!googleUser}
                  />
                </div>

                {/* Subject */}
                <FloatingInput label="Subject" name="subject" required disabled={isLoading} />

                {/* Message */}
                <FloatingTextarea
                  label="Your Message"
                  name="message"
                  required
                  disabled={isLoading}
                  maxLength={MAX_MESSAGE_LENGTH}
                />

                {/* Status message */}
                <AnimatePresence mode="wait">
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-medium overflow-hidden"
                      style={{
                        background: status.type === "success"
                          ? "rgba(52,211,153,0.06)"
                          : "rgba(241,48,36,0.06)",
                        border: status.type === "success"
                          ? "1px solid rgba(52,211,153,0.2)"
                          : "1px solid rgba(241,48,36,0.2)",
                        color: status.type === "success" ? "#34D399" : "#F13024",
                      }}
                      role="alert"
                      aria-live="polite"
                    >
                      {status.type === "success" && <SuccessParticles />}
                      {status.type === "success"
                        ? <RiCheckLine className="text-base flex-shrink-0" />
                        : <RiErrorWarningLine className="text-base flex-shrink-0" />
                      }
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  variants={staggerItem}
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.015, y: -1 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className="relative flex items-center justify-center gap-2.5 h-[50px] rounded-xl font-bold text-[13px] text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed mt-0.5 group"
                  style={{
                    background: "linear-gradient(135deg, #F13024 0%, #c72019 100%)",
                    boxShadow: "0 4px 20px rgba(241,48,36,0.35), 0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Shimmer sweep */}
                  {!isLoading && (
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
                      }}
                    />
                  )}

                  {isLoading ? (
                    <>
                      <motion.span
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <RiSendPlaneLine className="text-base relative z-10" />
                      <span className="relative z-10">Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Footer */}
                <motion.p variants={staggerItem} className="text-center text-white/15 text-[10px] mt-0.5 flex items-center justify-center gap-1.5">
                  {googleUser ? (
                    <>
                      <RiShieldCheckLine style={{ fontSize: 10, color: "#34D399" }} />
                      <span>Authenticated via Google · Your info stays private</span>
                    </>
                  ) : (
                    <>
                      <RiLockLine style={{ fontSize: 10 }} />
                      <span>Your information is secure and never shared</span>
                    </>
                  )}
                </motion.p>
              </motion.form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
