import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiInstagramLine,
  RiGithubLine,
  RiMailLine,
  RiWhatsappLine,
  RiLinkedinFill,
  RiDownloadLine,
  RiMenu4Line,
  RiCloseLine,
} from "react-icons/ri";

/* ─────────────────────────────────────────
   Social data — per-platform brand colors
───────────────────────────────────────── */
export const socialData = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/ms_arul_?igsh=MXc4cTc4Z3UyMmZxeQ==",
    Icon: RiInstagramLine,
    color: "#E1306C",
    glow: "rgba(225,48,108,0.55)",
  },
  {
    name: "Email",
    link: "mailto:msarul7686@gmail.com",
    Icon: RiMailLine,
    color: "#F13024",
    glow: "rgba(241,48,36,0.55)",
  },
  {
    name: "LinkedIn",
    link: "https://in.linkedin.com/in/arul-prakash-a3694a2ba",
    Icon: RiLinkedinFill,
    color: "#0A66C2",
    glow: "rgba(10,102,194,0.6)",
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/919962349659",
    Icon: RiWhatsappLine,
    color: "#25D366",
    glow: "rgba(37,211,102,0.55)",
  },
  {
    name: "Github",
    link: "https://github.com/ms-arul",
    Icon: RiGithubLine,
    color: "#d1d5db",
    glow: "rgba(209,213,219,0.35)",
  },
];

/* ─────────────────────────────────────────
   Individual icon with hover glow + tooltip
   Tooltip appears BELOW to avoid header clip
───────────────────────────────────────── */
const SocialIcon = ({ social, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 22, delay: index * 0.06 }}
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={social.link}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={social.name}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
        style={{ textDecoration: "none" }}
      >
        {/* Static dark base */}
        <span
          className="absolute inset-0 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        />

        {/* Hover fill */}
        <motion.span
          className="absolute inset-0 rounded-xl"
          animate={{
            opacity: hovered ? 1 : 0,
            boxShadow: hovered ? `0 0 16px 2px ${social.glow}` : "none",
          }}
          transition={{ duration: 0.22 }}
          style={{
            background: `${social.color}18`,
            border: `1px solid ${social.color}45`,
          }}
        />

        {/* Icon */}
        <motion.span
          className="relative z-10 flex items-center text-[19px]"
          animate={{
            color: hovered ? social.color : "rgba(255,255,255,0.45)",
            scale: hovered ? 1.18 : 1,
            filter: hovered
              ? `drop-shadow(0 0 5px ${social.glow})`
              : "none",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 20 }}
        >
          <social.Icon />
        </motion.span>
      </Link>

      {/* Tooltip — positioned BELOW the icon */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.88 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
          >
            <span
              className="block px-2 py-[2px] rounded-md text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
              style={{
                background: "rgba(15,16,28,0.95)",
                border: `1px solid ${social.color}30`,
                color: social.color,
                boxShadow: `0 4px 14px rgba(0,0,0,0.5)`,
                backdropFilter: "blur(10px)",
              }}
            >
              {social.name}
            </span>
            {/* Arrow pointing up */}
            <span
              className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderBottom: `5px solid ${social.color}30`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   CV Button — compact with shimmer sweep
───────────────────────────────────────── */
const CVButton = ({ index }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22, delay: index * 0.06 }}
    >
      <Link
        href="/ARULPRAKASH_RESUME.pdf"
        download
        aria-label="Download CV"
        onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 650); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center gap-[6px] h-9 px-3 rounded-xl overflow-hidden"
        style={{ textDecoration: "none" }}
      >
        {/* Base */}
        <span
          className="absolute inset-0 rounded-xl"
          style={{
            background: hovered
              ? "linear-gradient(135deg, rgba(241,48,36,0.5), rgba(200,24,14,0.4))"
              : "linear-gradient(135deg, rgba(241,48,36,0.14), rgba(180,20,10,0.09))",
            border: `1px solid ${hovered ? "rgba(241,48,36,0.7)" : "rgba(241,48,36,0.3)"}`,
            boxShadow: hovered
              ? "0 0 22px 3px rgba(241,48,36,0.45)"
              : "0 0 8px 0 rgba(241,48,36,0.15)",
            transition: "all 0.25s ease",
          }}
        />

        {/* Shimmer sweep — only while hovered */}
        {hovered && (
          <motion.span
            className="absolute inset-y-0 rounded-xl pointer-events-none"
            initial={{ x: "-80%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.75, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              width: "55%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
            }}
          />
        )}

        {/* Ripple on click */}
        <AnimatePresence>
          {clicked && (
            <motion.span
              className="absolute inset-0 rounded-xl pointer-events-none"
              initial={{ opacity: 0.45, scale: 0.85 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ background: "rgba(241,48,36,0.3)" }}
            />
          )}
        </AnimatePresence>

        {/* Download icon */}
        <motion.span
          className="relative z-10 flex items-center text-[16px] text-white"
          animate={{ y: hovered ? [0, 2, 0] : 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <RiDownloadLine />
        </motion.span>

        {/* Label */}
        <span
          className="relative z-10 text-[11px] font-bold uppercase tracking-widest text-white hidden sm:inline"
        >
          CV
        </span>
      </Link>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   MAIN SOCIALS COMPONENT
───────────────────────────────────────── */
const Socials = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-[3px] z-[60]">

      {/* ── Mobile: hamburger toggle ── */}
      <motion.button
        className="sm:hidden relative flex items-center justify-center w-9 h-9 rounded-xl text-[18px] text-white/65 overflow-hidden z-50"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Toggle socials"
        whileTap={{ scale: 0.86 }}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: -80, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 80, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.18, ease: "backOut" }}
            className="flex items-center"
          >
            {isOpen ? <RiCloseLine /> : <RiMenu4Line />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ── Desktop: inline row ── */}
      <div className="hidden sm:flex items-center gap-[3px]">
        {socialData.map((s, i) => (
          <SocialIcon key={s.name} social={s} index={i} />
        ))}

        {/* Thin separator */}
        <span
          className="w-px h-5 mx-[6px] flex-shrink-0"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        <CVButton index={socialData.length} />
      </div>

      {/* ── Mobile: dropdown panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-panel"
            initial={{ opacity: 0, scale: 0.88, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="sm:hidden absolute top-[48px] right-0 z-50 p-3 rounded-2xl min-w-[176px] flex flex-col gap-1"
            style={{
              background: "linear-gradient(155deg, rgba(14,15,27,0.97), rgba(20,22,38,0.95))",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03) inset",
            }}
          >
            {socialData.map((social, i) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.055, type: "spring", stiffness: 340, damping: 28 }}
              >
                <Link
                  href={social.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.name}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-2 py-[7px] rounded-xl group"
                  style={{ textDecoration: "none" }}
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-[16px] flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: `${social.color}14`,
                      color: social.color,
                      border: `1px solid ${social.color}28`,
                    }}
                  >
                    <social.Icon />
                  </span>
                  <span
                    className="text-[12px] font-semibold tracking-wide text-white/50 group-hover:text-white/80 transition-colors duration-200"
                  >
                    {social.name}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Divider */}
            <div
              className="w-full h-px my-1"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />

            {/* CV row */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: socialData.length * 0.055, type: "spring", stiffness: 340, damping: 28 }}
            >
              <Link
                href="/ARULPRAKASH_RESUME.pdf"
                download
                aria-label="Download CV"
                onClick={() => setIsOpen(false)}
                className="relative flex items-center gap-3 px-2 py-[7px] rounded-xl overflow-hidden group"
                style={{ textDecoration: "none" }}
              >
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "rgba(241,48,36,0.08)",
                    border: "1px solid rgba(241,48,36,0.25)",
                  }}
                />
                <span
                  className="relative flex items-center justify-center w-8 h-8 rounded-lg text-[16px] flex-shrink-0 text-accent"
                  style={{
                    background: "rgba(241,48,36,0.14)",
                    border: "1px solid rgba(241,48,36,0.32)",
                  }}
                >
                  <RiDownloadLine />
                </span>
                <span className="relative text-[12px] font-bold uppercase tracking-widest text-accent">
                  Download CV
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Socials;
