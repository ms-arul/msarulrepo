import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import {
  RiBriefcaseLine,
  RiCodeSSlashLine,
  RiPaletteLine,
  RiBrainLine,
  RiShieldLine,
} from "react-icons/ri";

import ParticlesContainer from "../components/ParticlesContainer";
import Avatar from "../components/Avatar";
import { fadeIn } from "../variants";

/* ─── roles that cycle ─── */
const ROLES = [
  { label: "Full Stack Developer", color: "#61DAFB", Icon: RiCodeSSlashLine },
  { label: "UI / UX Designer", color: "#F24E1E", Icon: RiPaletteLine },
  { label: "AI Enthusiast", color: "#34D399", Icon: RiBrainLine },
  { label: "Cyber Security", color: "#A78BFA", Icon: RiShieldLine },
];

/* ─── floating tech badges ─── */
const TECH_BADGES = [
  { label: "React", angle: 0 },
  { label: "Next.js", angle: 72 },
  { label: "Figma", angle: 144 },
  { label: "Python", angle: 216 },
  { label: "Node", angle: 288 },
];

/* ── orbit badge ── */
const OrbitBadge = ({ label, angle, radius = 80 }) => {
  const rad = (angle * Math.PI) / 180;
  const ox = Math.cos(rad) * radius;
  const oy = Math.sin(rad) * radius;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + angle / 360, duration: 0.5, ease: "backOut" }}
      className="absolute top-1/2 left-1/2 pointer-events-none select-none"
      style={{ transform: `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))` }}
    >
      <span
        className="px-2 py-[3px] rounded-full text-[9px] font-bold tracking-wide text-white/80 whitespace-nowrap"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          display: "inline-block",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
};



/* ── animated role badge ── */
const RoleBadge = ({ role }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={role.label}
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="inline-flex items-center gap-2"
    >
      <span
        className="flex items-center justify-center w-6 h-6 rounded-lg text-sm"
        style={{ background: role.color + "22", color: role.color }}
      >
        <role.Icon />
      </span>
      <span
        className="font-bold text-lg sm:text-xl tracking-tight"
        style={{ color: role.color, textShadow: `0 0 24px ${role.color}66` }}
      >
        {role.label}
      </span>
    </motion.div>
  </AnimatePresence>
);

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
const Home = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  /* cycle roles every 2.8s */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((p) => (p + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const role = ROLES[roleIdx];

  return (
    <div className="bg-primary/60 min-h-screen lg:h-screen relative overflow-y-auto lg:overflow-hidden overflow-x-hidden">

      {/* ── ambient glow blobs ── */}
      <div
        className="pointer-events-none absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full opacity-[0.12]"
        style={{ background: "radial-gradient(circle, #F13024 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      {/* ── gradient overlay ── */}
      <div className="w-full min-h-screen lg:h-screen bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="container mx-auto min-h-screen lg:h-screen flex flex-col justify-center px-4 pt-[110px] pb-[120px] xl:pt-40 xl:pb-0 xl:px-0 text-center xl:text-left">

          {/* ─── MOBILE AVATAR ─── */}
          <motion.div
            variants={fadeIn("down", 0.05)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex justify-center xl:hidden mb-8"
          >
            <div className="relative">
              {/* pulse rings */}
              {[1, 2].map((n) => (
                <motion.div
                  key={n}
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(241,48,36,0.3)" }}
                  animate={{ scale: [1, 1.2 + n * 0.12], opacity: [0.5, 0] }}
                  transition={{ duration: 2, delay: n * 0.4, repeat: Infinity, ease: "easeOut" }}
                />
              ))}

              {/* avatar with gradient border */}
              <div
                className="w-[130px] h-[130px] rounded-full overflow-hidden relative z-10"
                style={{
                  padding: "2px",
                  background: "linear-gradient(135deg, #F13024, #7c3aed)",
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-primary">
                  <Image
                    src="/avatar.png"
                    alt="Arul Prakash"
                    width={130}
                    height={130}
                    className="object-cover object-top w-full h-full scale-[1.2] translate-y-2 translate-x-1"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
                  />
                </div>
              </div>

              {/* orbit badges */}
              <div className="absolute inset-0 hidden sm:block">
                {TECH_BADGES.map((b) => (
                  <OrbitBadge key={b.label} {...b} radius={72} />
                ))}
              </div>

              {/* available chip */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                className="absolute -bottom-2 -right-2 z-20 flex items-center gap-1 px-2 py-[3px] rounded-full text-[10px] font-bold"
                style={{
                  background: "rgba(52,211,153,0.15)",
                  border: "1px solid rgba(52,211,153,0.4)",
                  color: "#34D399",
                }}
              >
                <span className="w-[5px] h-[5px] rounded-full bg-green-400 animate-pulse" />
                Available
              </motion.div>
            </div>
          </motion.div>

          {/* ─── GREETING BADGE ─── */}
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex justify-center xl:justify-start mb-5"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-[7px] rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{
                background: "rgba(241,48,36,0.08)",
                border: "1px solid rgba(241,48,36,0.25)",
                color: "#F13024",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Hello World — I&apos;m Arul Prakash
            </div>
          </motion.div>

          {/* ─── HEADLINE ─── */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <h1 className="h1 text-[32px] sm:text-[44px] md:text-[54px] xl:text-[62px] !mb-3 leading-[1.15] font-black">
              <span className="block text-white">Transforming Ideas</span>
              <span className="block">
                Into{" "}
                <span
                  className="text-accent relative inline-block"
                  style={{ textShadow: "0 0 60px rgba(241,48,36,0.5)" }}
                >
                  Digital Reality
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full overflow-visible"
                    viewBox="0 0 280 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  >
                    <motion.path
                      d="M2 6 C50 2, 110 7, 170 3 C220 0, 250 5, 278 3"
                      stroke="#F13024"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </motion.svg>
                </span>
              </span>
            </h1>
          </motion.div>

          {/* ─── ROLE SWITCHER ─── */}
          <motion.div
            variants={fadeIn("down", 0.25)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex justify-center xl:justify-start mb-6 h-8"
          >
            <RoleBadge role={role} />
          </motion.div>

          {/* ─── BIO (type animation in glass card) ─── */}
          <motion.div
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-md mx-auto xl:mx-0 xl:max-w-[520px] mb-10 xl:mb-12"
          >
            <div
              className="relative p-4 rounded-2xl text-sm sm:text-[15px] leading-relaxed text-white/60"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="absolute -top-3 left-4 text-3xl font-black leading-none select-none"
                style={{ color: "rgba(241,48,36,0.3)" }}
              >
                &ldquo;
              </span>
              <TypeAnimation
                sequence={[
                  300,
                  "Student at St. Joseph's College of Engineering (CGPA 8.39) — skilled in Full Stack Dev, UI/UX, and AI. Passionate about building beautiful, impactful digital experiences.",
                ]}
                wrapper="p"
                speed={70}
                className="m-0 leading-relaxed"
                repeat={0}
                cursor={true}
              />
            </div>
          </motion.div>



          {/* ─── STATS ROW ─── */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-wrap justify-center xl:justify-start gap-6 sm:gap-8 items-center"
          >
            {[
              { n: "3+", label: "Years Exp" },
              { n: "23+", label: "Projects" },
              { n: "19+", label: "Happy Clients" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center xl:items-start"
              >
                <span
                  className="text-2xl sm:text-3xl font-black leading-none"
                  style={{
                    background: "linear-gradient(135deg, #F13024, #ff6b5b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.n}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mt-0.5">
                  {s.label}
                </span>
              </motion.div>
            ))}

            {/* divider + "@ XPOOL" chip — desktop only */}
            <div className="hidden xl:block w-[1px] h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="hidden xl:flex items-center gap-2"
            >
              <RiBriefcaseLine className="text-accent text-sm" />
              <span className="text-white/40 text-xs">
                Currently at{" "}
                <span className="text-white/80 font-semibold">XPOOL</span>
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ─── VISUALS ─── */}
      <div className="w-full h-full absolute right-0 bottom-0 lg:w-[1280px]">
        <div
          className="hidden xl:block bg-explosion bg-cover bg-right bg-no-repeat w-full h-full absolute mix-blend-color-dodge"
          aria-hidden
        />
        <ParticlesContainer />
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="
            absolute bottom-[80px] lg:bottom-0 left-1/2 -translate-x-1/2
            w-[260px] sm:w-[320px] md:w-[380px]
            lg:left-auto lg:right-[8%] lg:translate-x-0
            lg:w-[650px]
          "
        >
          <Avatar />
        </motion.div>
      </div>



    </div>
  );
};

export default Home;
