import { motion } from "framer-motion";
import { useState } from "react";
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

import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

/* ================= DATA ================= */
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Web Development",
        icons: [
          FaHtml5,
          FaCss3,
          FaJs,
          FaReact,
          SiNextdotjs,
          SiFramer,
          FaWordpress,
        ],
      },
      {
        title: "UI / UX Design",
        icons: [FaFigma, SiAdobexd, SiAdobephotoshop],
      },
    ],
  },
  {
    title: "awards",
    info: [
      { title: "Winner – Webinar Project", stage: "2024" },
      { title: "Logo Designer", stage: "2025" },
      { title: "Editor PRO-OAK (Photography)", stage: "2019" },
    ],
  },
  {
    title: "internships",
    info: [
      { title: "Full Stack Intern – Blend Vidya (Wipro)", stage: "2025" },
      { title: "Cyber Security Intern – Corizo", stage: "2024" },
    ],
  },
  {
    title: "experience",
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
    info: [
      { title: "Artificial Intelligence – Kaashiv Infotech", stage: "2025" },
      { title: "Immersive Tech Workshop – Monolith", stage: "2025" },
      { title: "Machine Learning – Great Learning", stage: "2024" },
      { title: "Full Stack – Navitech", stage: "2024" },
      { title: "Computer Networks – NetworkGeek", stage: "2025" },
    ],
  },
];

/* ================= COMPONENT ================= */
const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <section className="relative min-h-screen lg:h-full bg-primary/30 pt-32 pb-40 lg:pt-24 lg:pb-16 overflow-y-auto lg:overflow-hidden overflow-x-hidden">
      <Circles />

      <div className="container mx-auto px-4 flex flex-col xl:flex-row gap-12">

        {/* ================= LEFT ================= */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 text-center xl:text-left"
        >
          <h2 className="h2 mb-4 leading-tight">
            Crafting <span className="text-accent">digital</span>
            <br className="hidden xl:block" /> experiences that inspire.
          </h2>

          <p className="text-white/70 max-w-full xl:max-w-[90%] mx-auto xl:mx-0 mb-8 text-sm sm:text-base leading-relaxed">
            I’m a student at St. Joseph’s College of Engineering (CGPA 8.39).
            Currently working as a{" "}
            <span className="text-accent font-medium">
              Full Stack Developer at XPOOL
            </span>
            , passionate about scalable web apps, UI/UX, and modern tech.
          </p>

          {/* ===== COUNTERS (STACKED ON MOBILE) ===== */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-md mx-auto xl:mx-0"
          >
            {[
              { value: 3, label: "Experience" },
              { value: 19, label: "Clients" },
              { value: 23, label: "Projects" },
              { value: 8, label: "Awards" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-extrabold text-accent">
                  <CountUp start={0} end={item.value} duration={4} />
                </div>
                <div className="text-[11px] uppercase tracking-wide text-white/60">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1"
        >
          {/* ===== TABS (SCROLLABLE ON MOBILE) ===== */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-3 mb-6">
            {aboutData.map((item, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`relative whitespace-nowrap capitalize text-sm transition
                  ${
                    index === i
                      ? "text-accent after:w-full"
                      : "text-white/60"
                  }
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:bg-accent after:w-0 after:transition-all`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* ===== CONTENT (SCROLL ANIMATED LIST) ===== */}
          <div className="flex flex-col gap-4">
            {aboutData[index].info.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex flex-col sm:flex-row gap-2 sm:gap-3 items-center sm:items-start text-center sm:text-left
                  ${
                    item.current
                      ? "text-accent font-semibold"
                      : "text-white/70"
                  }`}
              >
                <span>{item.title}</span>

                {item.stage && (
                  <span className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="hidden sm:inline">-</span>
                    {item.stage}
                    {item.current && (
                      <span className="px-2 py-[2px] text-[10px] rounded-full bg-accent text-primary">
                        CURRENT
                      </span>
                    )}
                  </span>
                )}

                {item.icons && (
                  <div className="flex gap-3 mt-2 sm:mt-0 text-xl text-white">
                    {item.icons.map((Icon, j) => (
                      <Icon key={j} />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
