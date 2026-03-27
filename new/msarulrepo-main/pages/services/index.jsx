import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";
import {
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlinePhotograph,
} from "react-icons/hi";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

/* ═══════════════════════════════════
   SERVICE DATA
═══════════════════════════════════ */
const services = [
  {
    id: "01",
    Icon: RxDesktop,
    Accent: HiOutlineLightningBolt,
    title: "Full Stack Development",
    tagline: "End-to-end web engineering",
    description:
      "Developing fast, scalable, and responsive digital products — from pixel-perfect frontends in React & Next.js to robust backends, APIs, and databases.",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
    color: "#61DAFB",
  },
  {
    id: "02",
    Icon: RxPencil2,
    Accent: HiOutlineSparkles,
    title: "UI / UX Design",
    tagline: "Experiences that delight",
    description:
      "Crafting modern, user-focused visual designs using Figma, Adobe XD & Photoshop — clean layouts, intuitive flows, and on-brand aesthetics.",
    tags: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
    color: "#F24E1E",
  },
  {
    id: "03",
    Icon: RxCrop,
    Accent: HiOutlineShieldCheck,
    title: "Branding & Logo Design",
    tagline: "Identity that speaks volumes",
    description:
      "Building distinctive brand identities — logos, colour systems, and brand guidelines that communicate clarity, trust, and long-term value.",
    tags: ["Logo Design", "Brand Identity", "Typography", "Color Systems"],
    color: "#FBBF24",
  },
  {
    id: "04",
    Icon: HiOutlineChartBar,
    Accent: HiOutlineChartBar,
    title: "Data Analysis",
    tagline: "Insights that drive decisions",
    description:
      "Transforming raw data into actionable insights with Python, pandas, and visualisation tools — dashboards, reports, and predictive models.",
    tags: ["Python", "Pandas", "Matplotlib", "ML"],
    color: "#34D399",
  },
  {
    id: "05",
    Icon: HiOutlinePhotograph,
    Accent: HiOutlinePhotograph,
    title: "Photo / Video Editing",
    tagline: "Visual storytelling refined",
    description:
      "Professional editing and post-production — photo retouching, colour grading, reel creation, and polished video content.",
    tags: ["Photoshop", "Lightroom", "Premiere Pro", "Colour Grading"],
    color: "#A78BFA",
  },
  {
    id: "06",
    Icon: RxRocket,
    Accent: RxRocket,
    title: "SEO & Performance",
    tagline: "Rank. Convert. Grow.",
    description:
      "Improving search visibility with strategic on-page SEO, Core Web Vitals optimisation, and content structuring that boosts rankings and organic traffic.",
    tags: ["On-Page SEO", "Core Web Vitals", "Analytics", "Content"],
    color: "#F13024",
  },
];

/* ═══════════════════════════════════
   SERVICE CARD
═══════════════════════════════════ */
const ServiceCard = ({ svc, isActive, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* card — CSS transitions for gradients, Framer Motion only for y */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="relative h-full rounded-2xl p-5 overflow-hidden"
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${svc.color}12, rgba(255,255,255,0.02))`
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${isActive ? svc.color + "50" : "rgba(255,255,255,0.06)"}`,
          backdropFilter: "blur(10px)",
          boxShadow: isActive
            ? `0 8px 32px ${svc.color}20, 0 0 0 1px ${svc.color}18`
            : "0 4px 20px rgba(0,0,0,0.25)",
          transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        {/* glow orb top-right */}
        <div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: svc.color,
            opacity: isActive ? 0.12 : 0,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* number + icon row */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-[11px] font-black tracking-[3px] font-mono"
            style={{ color: svc.color + "80" }}
          >
            {svc.id}
          </span>
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl text-xl"
            style={{
              background: isActive ? svc.color + "22" : "rgba(255,255,255,0.05)",
              color: isActive ? svc.color : "rgba(255,255,255,0.5)",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
          >
            <svc.Icon />
          </div>
        </div>

        {/* title */}
        <h3
          className="font-bold text-base mb-1 leading-snug"
          style={{
            color: isActive ? "#fff" : "rgba(255,255,255,0.85)",
            transition: "color 0.3s ease",
          }}
        >
          {svc.title}
        </h3>

        {/* tagline */}
        <p
          className="text-[11px] font-medium mb-3 tracking-wide"
          style={{ color: svc.color + "cc" }}
        >
          {svc.tagline}
        </p>

        {/* description — only visible when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="text-white/55 text-xs leading-relaxed mb-3">
                {svc.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-[3px] rounded-full"
                    style={{
                      background: svc.color + "18",
                      border: `1px solid ${svc.color}40`,
                      color: svc.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* bottom arrow */}
        <motion.div
          className="absolute bottom-4 right-4 text-lg"
          animate={{
            rotate: isActive ? 45 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            color: isActive ? svc.color : "rgba(255,255,255,0.2)",
            transition: "color 0.3s ease",
          }}
        >
          <RxArrowTopRight />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


/* ═══════════════════════════════════
   PAGE
═══════════════════════════════════ */
const Services = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = services[activeIdx];

  return (
    <div className="min-h-screen lg:h-screen flex items-center justify-center bg-primary/30 pb-40 pt-36 lg:pt-[120px] lg:pb-0 overflow-y-auto lg:overflow-hidden overflow-x-hidden relative">
      <Circles />

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-[-80px] w-[350px] h-[350px] rounded-full opacity-[0.1] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${active.color} 0%, transparent 70%)`,
          filter: "blur(70px)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full mt-8 lg:mt-12">
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 xl:items-center">

          {/* ══ LEFT: HEADLINE ══ */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="xl:w-[320px] flex-shrink-0 flex flex-col justify-center text-center xl:text-left"
          >
            {/* label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-4 self-center xl:self-start"
            >
              <div
                className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(241,48,36,0.1)",
                  border: "1px solid rgba(241,48,36,0.25)",
                  color: "#F13024",
                }}
              >
                What I Do
              </div>
            </motion.div>

            <h2 className="h2 xl:mt-2 leading-tight mb-4">
              My{" "}
              <span
                className="text-accent relative inline-block"
                style={{ textShadow: "0 0 40px rgba(241,48,36,0.4)" }}
              >
                services
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full overflow-visible"
                  viewBox="0 0 140 6"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <motion.path
                    d="M2 4 C30 1, 70 5, 110 2 C125 1, 135 3, 138 2"
                    stroke="#F13024"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </span>{" "}
              <span className="text-accent">.</span>
            </h2>

            <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-[360px] mx-auto xl:mx-0">
              I deliver high-quality digital solutions — from full stack development
              and UI/UX design to branding, data analysis, and creative media.
            </p>

            {/* active service highlight panel */}
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden xl:block rounded-2xl p-5"
              style={{
                background: `linear-gradient(135deg, ${active.color}12, rgba(255,255,255,0.02))`,
                border: `1px solid ${active.color}30`,
                boxShadow: `0 8px 32px ${active.color}12`,
              }}
            >
              <div
                className="flex items-center gap-3 mb-3"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: active.color + "25", color: active.color }}
                >
                  <active.Icon />
                </div>
                <div>
                  <div className="text-white/90 font-bold text-sm">{active.title}</div>
                  <div className="text-[11px]" style={{ color: active.color + "cc" }}>
                    {active.tagline}
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                {active.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-[3px] rounded-full"
                    style={{
                      background: active.color + "18",
                      border: `1px solid ${active.color}40`,
                      color: active.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* service count */}
            <div className="hidden xl:flex items-center gap-3 mt-6">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
              <span className="text-white/30 text-xs font-mono">
                {String(activeIdx + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>

          {/* ══ RIGHT: CARD GRID ══ */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((svc, i) => (
                <ServiceCard
                  key={svc.id}
                  svc={svc}
                  index={i}
                  isActive={activeIdx === i}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>

            {/* mobile detail panel */}
            <motion.div
              key={`mobile-${activeIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="xl:hidden mt-6 rounded-2xl p-5"
              style={{
                background: `linear-gradient(135deg, ${active.color}12, rgba(255,255,255,0.02))`,
                border: `1px solid ${active.color}30`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: active.color + "25", color: active.color }}
                >
                  <active.Icon />
                </div>
                <div>
                  <div className="text-white/90 font-bold text-sm">{active.title}</div>
                  <div className="text-[11px]" style={{ color: active.color + "cc" }}>
                    {active.tagline}
                  </div>
                </div>
              </div>
              <p className="text-white/55 text-xs leading-relaxed">{active.description}</p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <Bulb />
    </div>
  );
};

export default Services;
