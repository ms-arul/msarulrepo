import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
  HiChevronUp,
} from "react-icons/hi2";

// nav data
export const navData = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUser },
  { name: "services", path: "/services", Icon: HiRectangleGroup },
  { name: "work", path: "/work", Icon: HiViewColumns },
  {
    name: "testimonials",
    path: "/testimonials",
    Icon: HiChatBubbleBottomCenterText,
  },
  {
    name: "contact",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

const AUTO_HIDE_DELAY = 5000;
const DESKTOP_BP = 1200;

const Nav = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [hasAutoHidden, setHasAutoHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const hideTimerRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= DESKTOP_BP);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
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
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
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

  const handleMouseLeave = () => {
    if (!isDesktop) resetTimer();
  };

  const handleShowNav = () => {
    setIsVisible(true);
    setHasAutoHidden(false);
    resetTimer();
  };

  const iconVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: 20,
      scale: 0.7,
    }),
    show: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 22,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            ref={navRef}
            key="nav-bar"
            // Mobile slides in from bottom, Desktop fades in from right
            initial={isDesktop ? { opacity: 0, x: 20, y: 0 } : { opacity: 0, x: 0, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={isDesktop ? { opacity: 0, x: 20, y: 0 } : { opacity: 0, x: 0, y: 120 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="nav-position-wrapper"
          >
            <div className="nav-glass-container nav-inner-layout">
              <div className="nav-glow-border" aria-hidden />

              {navData.map((link, i) => {
                const isActive = link.path === pathname;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={iconVariants}
                    initial="hidden"
                    animate="show"
                  >
                    <Link
                      className="relative flex items-center group z-10"
                      href={link.path}
                    >
                      <div className="absolute pl-16 left-0 hidden xl:group-hover:flex nav-tooltip-outer">
                        <div className="nav-tooltip">
                          <span className="text-[11px] leading-none font-semibold capitalize tracking-wide">
                            {link.name}
                          </span>
                          <div
                            className="border-solid border-r-white/90 border-r-8 border-y-transparent border-y-[6px] border-l-0 absolute -left-2"
                            aria-hidden
                          />
                        </div>
                      </div>

                      <div className={`nav-icon-btn ${isActive ? "nav-icon-active" : ""}`}>
                        <link.Icon className="relative z-10 text-[20px] xl:text-[22px]" aria-hidden />
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-dot"
                            className="nav-active-indicator"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

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
