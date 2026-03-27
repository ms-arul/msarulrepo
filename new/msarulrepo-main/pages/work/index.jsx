import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { projects, default as ProjectCard } from "../../components/WorkSlider";
import { fadeIn } from "../../variants";

import {
  BsCode,
  BsBrush,
  BsLayers,
  BsGrid,
} from "react-icons/bs";
import { HiOutlineFolder } from "react-icons/hi";

const CATEGORIES = [
  { label: "All", Icon: BsGrid },
  { label: "Web Dev", Icon: BsCode },
  { label: "UI/UX", Icon: BsBrush },
  { label: "Design", Icon: BsLayers },
];

/* ═══════════════════════════════════
   PAGE
═══════════════════════════════════ */
const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen lg:h-screen flex items-center justify-center bg-primary/30 pb-40 pt-36 lg:pt-[120px] lg:pb-0 overflow-y-auto lg:overflow-hidden overflow-x-hidden relative">
      <Circles />

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-[-100px] w-[400px] h-[400px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #F13024 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-[-80px] w-[300px] h-[300px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full mt-8 lg:mt-12">
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-14 xl:items-center">

          {/* ══════ LEFT PANEL ══════ */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="xl:w-[300px] flex-shrink-0 flex flex-col text-center xl:text-left"
          >
            {/* label badge */}
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
                Portfolio
              </div>
            </motion.div>

            {/* heading */}
            <h2 className="h2 xl:mt-2 leading-tight mb-4">
              My{" "}
              <span
                className="text-accent relative inline-block"
                style={{ textShadow: "0 0 40px rgba(241,48,36,0.4)" }}
              >
                work
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full overflow-visible"
                  viewBox="0 0 80 6"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <motion.path
                    d="M2 4 C20 1, 45 5, 65 2 C72 1, 76 3, 78 2"
                    stroke="#F13024"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </span>{" "}
              <span className="text-accent">.</span>
            </h2>

            <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-[320px] mx-auto xl:mx-0">
              Crafting innovative digital experiences through full‑stack
              development, UI/UX design, and creative brand solutions.
            </p>

            {/* ── FILTER TABS ── */}
            <div className="flex flex-col gap-2 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 text-center xl:text-left">
                Filter by
              </p>
              {CATEGORIES.map(({ label, Icon }) => {
                const isActive = activeCategory === label;
                const count =
                  label === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === label).length;
                return (
                  <motion.button
                    key={label}
                    onClick={() => setActiveCategory(label)}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-300"
                    style={{
                      background: isActive
                        ? "rgba(241,48,36,0.12)"
                        : "rgba(255,255,255,0.02)",
                      border: isActive
                        ? "1px solid rgba(241,48,36,0.3)"
                        : "1px solid rgba(255,255,255,0.05)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    <Icon
                      className="text-base flex-shrink-0"
                      style={{ color: isActive ? "#F13024" : "rgba(255,255,255,0.3)" }}
                    />
                    <span className="flex-1">{label}</span>
                    <span
                      className="text-[10px] font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center"
                      style={{
                        background: isActive ? "rgba(241,48,36,0.2)" : "rgba(255,255,255,0.06)",
                        color: isActive ? "#F13024" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* ── project counter ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="hidden xl:flex items-center gap-3"
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
              <span className="text-white/30 text-xs font-mono">
                {filtered.length} project{filtered.length !== 1 ? "s" : ""}
              </span>
            </motion.div>

            {/* ── stat pills ── */}
            <div className="hidden xl:flex flex-col gap-3 mt-6">
              {[
                { label: "Total Projects", value: projects.length + "+" },
                { label: "Live Deployments", value: "3" },
                { label: "Happy Clients", value: "19+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-white/40 text-xs">{s.label}</span>
                  <span
                    className="font-black text-sm"
                    style={{
                      background: "linear-gradient(135deg, #F13024, #ff6b5b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ══════ RIGHT: GRID ══════ */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1"
          >
            {/* grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}

                {/* empty state */}
                {filtered.length === 0 && (
                  <div className="col-span-2 flex flex-col items-center justify-center py-24 gap-3 text-white/30">
                    <HiOutlineFolder className="text-5xl" />
                    <p className="text-sm font-medium">No projects in this category yet</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* mobile stats row */}
            <div className="xl:hidden flex gap-4 mt-6 flex-wrap justify-center">
              {[
                { label: "Projects", value: projects.length + "+" },
                { label: "Live", value: "3" },
                { label: "Clients", value: "19+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center px-5 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    className="font-black text-xl"
                    style={{
                      background: "linear-gradient(135deg, #F13024, #ff6b5b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <Bulb />
    </div>
  );
};

export default Work;
