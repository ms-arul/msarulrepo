import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import CountUp from "react-countup";

import {
  FaCss3,
  FaFigma,
  FaHtml5,
  FaJs,
  FaReact,
  FaWordpress,
} from "react-icons/fa";

import {
  SiAdobephotoshop,
  SiAdobexd,
  SiFramer,
  SiNextdotjs,
} from "react-icons/si";

import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineLightBulb,
  HiOutlineStar,
  HiOutlineCode,
} from "react-icons/hi";

import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

/* ─────────────────── DATA ─────────────────── */
export const aboutData = [
  {
    title: "skills",
    icon: HiOutlineCode,
    info: [
      {
        title: "Web Development",
        icons: [
          { Icon: FaHtml5, color: "#E44D26", label: "HTML5" },
          { Icon: FaCss3, color: "#264DE4", label: "CSS3" },
          { Icon: FaJs, color: "#F7DF1E", label: "JavaScript" },
          { Icon: FaReact, color: "#61DAFB", label: "React" },
          { Icon: SiNextdotjs, color: "#FFFFFF", label: "Next.js" },
          { Icon: SiFramer, color: "#0055FF", label: "Framer" },
          { Icon: FaWordpress, color: "#21759B", label: "WordPress" },
        ],
      },
      {
        title: "UI / UX Design",
        icons: [
          { Icon: FaFigma, color: "#F24E1E", label: "Figma" },
          { Icon: SiAdobexd, color: "#FF61F6", label: "Adobe XD" },
          { Icon: SiAdobephotoshop, color: "#31A8FF", label: "Photoshop" },
        ],
      },
    ],
  },
  {
    title: "awards",
    icon: HiOutlineStar,
    info: [
      { title: "Winner – Webinar Project", stage: "2024" },
      { title: "Logo Designer", stage: "2025" },
      { title: "Editor PRO-OAK (Photography)", stage: "2019" },
    ],
  },
  {
    title: "internships",
    icon: HiOutlineAcademicCap,
    info: [
      { title: "Full Stack Intern – Blend Vidya (Wipro)", stage: "2025" },
      { title: "Cyber Security Intern – Corizo", stage: "2024" },
    ],
  },
  {
    title: "experience",
    icon: HiOutlineBriefcase,
    info: [
      {
        title: "Full Stack Developer @ XPOOL",
        stage: "2026 – Present",
        current: true,
      },
      { title: "UX / UI Designer", stage: "2025" },
      { title: "Web Developer", stage: "2024" },
      { title: "Intern – DEF Corporation", stage: "2023" },
    ],
  },
  {
    title: "courses",
    icon: HiOutlineLightBulb,
    info: [
      { title: "Artificial Intelligence – Kaashiv Infotech", stage: "2025" },
      { title: "Immersive Tech Workshop – Monolith", stage: "2025" },
      { title: "Machine Learning – Great Learning", stage: "2024" },
      { title: "Full Stack – Navitech", stage: "2024" },
      { title: "Computer Networks – NetworkGeek", stage: "2025" },
    ],
  },
];

const counters = [
  { value: 3, label: "Years Exp", suffix: "+" },
  { value: 19, label: "Clients", suffix: "+" },
  { value: 23, label: "Projects", suffix: "+" },
  { value: 8, label: "Awards", suffix: "+" },
];

/* ─────────────────── SKILL ICON CARD ─────────────────── */
const SkillIcon = ({ Icon, color, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative flex flex-col items-center gap-1 cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {/* glow ring */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-md"
        style={{ background: color }}
        animate={{ opacity: hovered ? 0.35 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <div
        className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl text-white text-xl"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${color}33, ${color}11)`
            : "rgba(255,255,255,0.05)",
          border: `1px solid ${hovered ? color + "66" : "rgba(255,255,255,0.08)"}`,
          transition: "all 0.25s ease",
        }}
      >
        <Icon style={{ color: hovered ? color : "rgba(255,255,255,0.7)" }} />
      </div>
      <motion.span
        className="text-[9px] font-medium tracking-wide text-white/40 text-center leading-none"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

/* ─────────────────── TIMELINE ITEM ─────────────────── */
const TimelineItem = ({ item, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
    className="relative flex items-start gap-4 group"
  >
    {/* line */}
    {!isLast && (
      <div className="absolute left-[7px] top-5 bottom-0 w-[1px] bg-gradient-to-b from-accent/40 to-transparent" />
    )}
    {/* dot */}
    <div className="relative mt-1 flex-shrink-0">
      <motion.div
        className={`w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center ${item.current
          ? "border-accent bg-accent/20"
          : "border-white/20 bg-white/5"
          }`}
        animate={item.current ? { boxShadow: ["0 0 0px #F13024", "0 0 12px #F13024", "0 0 0px #F13024"] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {item.current && (
          <span className="w-[5px] h-[5px] rounded-full bg-accent block" />
        )}
      </motion.div>
    </div>
    {/* content */}
    <div className="flex-1 pb-5">
      <div
        className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl transition-all duration-300"
        style={{
          background: item.current
            ? "linear-gradient(135deg, rgba(241,48,36,0.08), rgba(241,48,36,0.03))"
            : "rgba(255,255,255,0.02)",
          border: item.current
            ? "1px solid rgba(241,48,36,0.2)"
            : "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span
          className={`text-sm font-medium ${item.current ? "text-accent" : "text-white/80"
            }`}
        >
          {item.title}
        </span>
        <div className="flex items-center gap-2">
          {item.current && (
            <span className="px-2 py-[2px] text-[9px] font-bold rounded-full bg-accent text-primary uppercase tracking-wider animate-pulse">
              Live
            </span>
          )}
          {item.stage && (
            <span className="text-[11px] font-mono text-white/40 bg-white/5 px-2 py-[2px] rounded-md">
              {item.stage}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─────────────────── COUNTER CARD ─────────────────── */
const CounterCard = ({ value, label, suffix, index }) => {
  const [started, setStarted] = useState(false);
  return (
    <motion.div
      variants={fadeIn("up", 0.1 * index)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setStarted(true)}
      whileHover={{ scale: 1.05, y: -3 }}
      className="relative flex flex-col items-center justify-center gap-1 p-4 rounded-2xl cursor-default overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(241,48,36,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        border: "1px solid rgba(241,48,36,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* corner accent */}
      <div
        className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl"
        style={{ background: "rgba(241,48,36,0.15)" }}
      />
      <div className="text-3xl font-black text-accent leading-none">
        {started && (
          <CountUp start={0} end={value} duration={3} suffix={suffix} />
        )}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
        {label}
      </div>
    </motion.div>
  );
};

/* ─────────────────── MAIN COMPONENT ─────────────────── */
const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <section className="relative min-h-screen lg:h-screen flex items-center justify-center bg-primary/30 pt-36 pb-40 lg:pt-[120px] lg:pb-0 overflow-y-auto lg:overflow-hidden overflow-x-hidden">
      <Circles />

      {/* ── ambient glow blobs ── */}
      <div
        className="pointer-events-none absolute top-1/4 left-[-100px] w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #F13024 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-[-80px] w-[300px] h-[300px] rounded-full opacity-8"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto px-4 flex flex-col xl:flex-row gap-12 relative z-10 xl:items-center mt-8 lg:mt-12">

        {/* ══════════════ LEFT ══════════════ */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 text-center xl:text-left"
        >
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="h2 mb-2 leading-tight">
              Crafting{" "}
              <span
                className="text-accent relative inline-block"
                style={{ textShadow: "0 0 40px rgba(241,48,36,0.4)" }}
              >
                digital
                {/* underline squiggle */}
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                >
                  <motion.path
                    d="M2 6 C40 2, 80 6, 120 3 C160 0, 180 5, 198 3"
                    stroke="#F13024"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </span>
              <br className="hidden xl:block" />
              experiences that inspire.
            </h2>
          </motion.div>

          {/* bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-8"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full hidden xl:block"
              style={{
                background: "linear-gradient(to bottom, #F13024, transparent)",
              }}
            />
            <p className="text-white/70 max-w-full xl:max-w-[90%] mx-auto xl:mx-0 xl:pl-4 text-sm sm:text-base leading-relaxed">
              I&apos;m a student at{" "}
              <span className="text-white/90 font-medium">
                St. Joseph&apos;s College of Engineering
              </span>{" "}
              (CGPA{" "}
              <span className="text-accent font-bold">8.39</span>). Currently
              working as a{" "}
              <span className="text-accent font-semibold">
                Full Stack Developer at XPOOL
              </span>
              , passionate about scalable web apps, UI/UX, and modern tech.
            </p>
          </motion.div>

          {/* counters grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto xl:mx-0">
            {counters.map((c, i) => (
              <CounterCard key={i} {...c} index={i} />
            ))}
          </div>

          {/* decorative row */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden xl:flex items-center gap-3 mt-8 max-w-[90%]"
            style={{ transformOrigin: "left" }}
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
            <span className="text-white/30 text-xs uppercase tracking-widest font-medium">
              About Me
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-white/10 to-transparent" />
          </motion.div>
        </motion.div>

        {/* ══════════════ RIGHT ══════════════ */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex-1"
        >
          {/* glass panel wrapper */}
          <div
            className="rounded-2xl p-5 sm:p-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset",
            }}
          >
            {/* ── TABS ── */}
            <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1 mb-5">
              {aboutData.map((item, i) => {
                const TabIcon = item.icon;
                return (
                  <motion.button
                    key={i}
                    onClick={() => setIndex(i)}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-1.5 whitespace-nowrap capitalize text-xs sm:text-sm px-3 py-2 rounded-xl transition-all duration-300 font-medium ${index === i
                      ? "text-primary"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                      }`}
                    style={
                      index === i
                        ? {
                          background:
                            "linear-gradient(135deg, #F13024, #c72019)",
                          boxShadow: "0 4px 20px rgba(241,48,36,0.4)",
                        }
                        : {}
                    }
                  >
                    <TabIcon className="text-base flex-shrink-0" />
                    {item.title}
                  </motion.button>
                );
              })}
            </div>

            {/* ── CONTENT ── */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* SKILLS special layout */}
                  {aboutData[index].title === "skills" ? (
                    <div className="flex flex-col gap-6">
                      {aboutData[index].info.map((group, gi) => (
                        <div key={gi}>
                          <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold mb-3">
                            {group.title}
                          </p>
                          <div className="flex flex-wrap gap-4">
                            {group.icons.map(({ Icon, color, label }, j) => (
                              <SkillIcon
                                key={j}
                                Icon={Icon}
                                color={color}
                                label={label}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* TIMELINE layout for all other tabs */
                    <div className="flex flex-col">
                      {aboutData[index].info.map((item, i) => (
                        <TimelineItem
                          key={i}
                          item={item}
                          index={i}
                          isLast={i === aboutData[index].info.length - 1}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* bottom stat row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-4 pt-4 flex items-center gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-white/30 font-medium">
                Open to opportunities
              </span>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
