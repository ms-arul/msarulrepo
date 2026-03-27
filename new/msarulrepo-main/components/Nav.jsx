import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
  HiChevronUp,
} from "react-icons/hi2";

/* ══════════════════════════════
   NAV DATA
══════════════════════════════ */
export const navData = [
  { name: "home",         shortName: "home",  path: "/",             Icon: HiHome,                          color: "#F13024" },
  { name: "about",        shortName: "about", path: "/about",         Icon: HiUser,                          color: "#61DAFB" },
  { name: "services",     shortName: "svc",   path: "/services",      Icon: HiRectangleGroup,                color: "#FBBF24" },
  { name: "work",         shortName: "work",  path: "/work",          Icon: HiViewColumns,                   color: "#34D399" },
  { name: "testimonials", shortName: "talks", path: "/testimonials",  Icon: HiChatBubbleBottomCenterText,    color: "#A78BFA" },
  { name: "contact",      shortName: "mail",  path: "/contact",       Icon: HiEnvelope,                      color: "#F24E1E" },
];

const AUTO_HIDE_DELAY = 5000;
const DESKTOP_BP      = 1200;

/* ══════════════════════════════
   NAV ICON BUTTON
══════════════════════════════ */
const NavItem = ({ link, isActive, index, isDesktop }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <motion.div
      custom={index}
      variants={{
        hidden: { opacity: 0, x: isDesktop ? 20 : 0, y: isDesktop ? 0 : 20, scale: 0.7 },
        show: {
          opacity: 1, x: 0, y: 0, scale: 1,
          transition: { type: "spring", stiffness: 300, damping: 22, delay: index * 0.06 },
        },
      }}
      initial="hidden"
      animate="show"
      className="relative"
    >
      <Link
        href={link.path}
        onClick={handleClick}
        className="relative flex items-center group z-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── desktop tooltip (left side) ── */}
        {isDesktop && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.92 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-[calc(100%+14px)] pointer-events-none z-50"
              >
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold capitalize tracking-wide text-white whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, rgba(19,20,36,0.98), rgba(30,31,50,0.95))",
                    border: `1px solid ${link.color}40`,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px ${link.color}20`,
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* colored dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: link.color, boxShadow: `0 0 6px 2px ${link.color}60` }}
                  />
                  {link.name}
                </div>
                {/* arrow */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -right-[7px] w-0 h-0"
                  style={{
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderLeft: `7px solid ${link.color}40`,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ── icon button ── */}
        <motion.div
          className="nav-icon-btn"
          animate={{
            scale: clicked ? 0.85 : hovered ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {/* active / hover background */}
          <span
            className="absolute inset-0 rounded-[10px] xl:rounded-[14px] transition-all duration-300"
            style={{
              background: isActive
                ? `${link.color}20`
                : hovered
                ? `${link.color}12`
                : "transparent",
              boxShadow: isActive ? `0 0 20px ${link.color}25` : "none",
            }}
          />

          {/* ripple on click */}
          <AnimatePresence>
            {clicked && (
              <motion.span
                className="absolute inset-0 rounded-[10px] xl:rounded-[14px]"
                initial={{ opacity: 0.6, scale: 0.6 }}
                animate={{ opacity: 0, scale: 2 }}
                exit={{}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ background: link.color }}
              />
            )}
          </AnimatePresence>

          <link.Icon
            className="relative z-10 text-[20px] xl:text-[22px] transition-all duration-300"
            style={{
              color: isActive ? link.color : hovered ? link.color : "rgba(255,255,255,0.4)",
              filter: isActive ? `drop-shadow(0 0 6px ${link.color}90)` : "none",
            }}
            aria-hidden
          />

          {/* active dot — desktop = left, mobile = bottom */}
          {isActive && (
            <motion.span
              layoutId="nav-active-dot"
              className="nav-active-indicator"
              style={{
                background: link.color,
                boxShadow: `0 0 10px 2px ${link.color}80`,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </motion.div>

        {/* ── mobile label below icon ── */}
        {!isDesktop && (
          <span
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-bold uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300"
            style={{
              color: isActive ? link.color : "rgba(255,255,255,0.25)",
              maxWidth: "42px",
              textOverflow: "clip",
              letterSpacing: "0.05em",
            }}
          >
            {link.shortName}
          </span>
        )}
      </Link>
    </motion.div>
  );
};

/* ══════════════════════════════
   MAIN NAV
══════════════════════════════ */
const Nav = () => {
  const pathname                          = usePathname();
  const [isVisible, setIsVisible]         = useState(true);
  const [hasAutoHidden, setHasAutoHidden] = useState(false);
  const [isDesktop, setIsDesktop]         = useState(false);
  const hideTimerRef                      = useRef(null);
  const navRef                            = useRef(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_BP);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const resetTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (typeof window !== "undefined" && window.innerWidth >= DESKTOP_BP) return;
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      setHasAutoHidden(true);
    }, AUTO_HIDE_DELAY);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setHasAutoHidden(false);
    resetTimer();
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
  }, [pathname, resetTimer]);

  useEffect(() => {
    if (isDesktop) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setIsVisible(true);
      setHasAutoHidden(false);
    } else {
      resetTimer();
    }
  }, [isDesktop, resetTimer]);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setIsVisible(true);
  };
  const handleMouseLeave = () => { if (!isDesktop) resetTimer(); };
  const handleShowNav    = () => { setIsVisible(true); setHasAutoHidden(false); resetTimer(); };

  /* current page color */
  const currentLink = navData.find((l) => l.path === pathname) ?? navData[0];

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            ref={navRef}
            key="nav-bar"
            initial={isDesktop ? { opacity: 0, x: 20, y: 0 } : { opacity: 0, x: 0, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={isDesktop  ? { opacity: 0, x: 20, y: 0 } : { opacity: 0, x: 0, y: 120 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="nav-position-wrapper"
          >
            <div className="nav-glass-container nav-inner-layout" style={{ paddingBottom: !isDesktop ? "24px" : undefined }}>
              {/* animated glow border */}
              <div className="nav-glow-border" aria-hidden />

              {/* ── desktop page label at top ── */}
              {isDesktop && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center gap-1 mb-1 pb-3 w-full"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span
                      className="text-[8px] font-black uppercase tracking-[3px]"
                      style={{ color: currentLink.color, opacity: 0.8 }}
                    >
                      {currentLink.name}
                    </span>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* ── nav items ── */}
              {navData.map((link, i) => (
                <NavItem
                  key={link.path}
                  link={link}
                  isActive={link.path === pathname}
                  index={i}
                  isDesktop={isDesktop}
                />
              ))}

              {/* ── desktop progress line ── */}
              {isDesktop && (
                <div className="relative w-full mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {/* track */}
                  <div className="w-[2px] h-full bg-white/5 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" style={{ height: "32px" }} />
                  {/* fill */}
                  <motion.div
                    className="w-[2px] rounded-full mx-auto"
                    style={{
                      background: `linear-gradient(to bottom, ${currentLink.color}, transparent)`,
                      height: "32px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "2px",
                    }}
                    layoutId="nav-progress"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── mobile "show nav" floating button ── */}
      <AnimatePresence>
        {!isVisible && hasAutoHidden && !isDesktop && (
          <motion.div
            key="nav-arrow-wrapper"
            initial={{ opacity: 0, scale: 0.2, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="nav-floating-arrow-wrapper"
          >
            <button
              onClick={handleShowNav}
              className="nav-floating-arrow"
              aria-label="Show navigation"
            >
              <span className="nav-arrow-ring" />
              <span className="nav-arrow-ring-outer" />
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center leading-none text-accent"
              >
                <HiChevronUp className="text-base opacity-40 -mb-2.5" />
                <HiChevronUp className="text-lg opacity-70 -mb-1.5" />
                <HiChevronUp className="text-2xl" />
              </motion.span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
