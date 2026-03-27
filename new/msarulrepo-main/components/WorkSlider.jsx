import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsArrowUpRight,
  BsGlobe,
  BsCode,
  BsBrush,
  BsLayers,
} from "react-icons/bs";
import { RiExternalLinkLine } from "react-icons/ri";

/* ═══════════════════════════════════
   PROJECT DATA
═══════════════════════════════════ */
export const projects = [
  {
    id: "01",
    title: "SJCE Webinar",
    category: "Web Dev",
    description: "Official college webinar landing page with registration, schedule, and speaker highlights.",
    tags: ["HTML", "CSS", "JS"],
    path: "/thumb1.png",
    link: "https://ms-arul.github.io/sjcewebinar/",
    color: "#61DAFB",
  },
  {
    id: "02",
    title: "Astranova",
    category: "UI/UX",
    description: "Modern astronomy event site built with React and Next.js featuring immersive scroll animations.",
    tags: ["Next.js", "Framer", "UI/UX"],
    path: "/thumb2.png",
    link: "https://astranova26.vercel.app/",
    color: "#A78BFA",
  },
  {
    id: "03",
    title: "Todo App",
    category: "Web Dev",
    description: "Clean, minimal todo manager with local storage persistence and smooth task interactions.",
    tags: ["HTML", "CSS", "Vanilla JS"],
    path: "/thumb3.png",
    link: "https://ms-arul.github.io/todo-intern/main.html",
    color: "#34D399",
  },
  {
    id: "04",
    title: "Design Concept",
    category: "Design",
    description: "UI/UX exploration and design prototype showcasing modern layout and colour systems.",
    tags: ["Figma", "Branding", "Design"],
    path: "/thumb4.jpg",
    link: "#",
    color: "#FBBF24",
  },
];

const CATEGORIES = ["All", "Web Dev", "UI/UX", "Design"];

/* ═══════════════════════════════════
   PROJECT CARD
═══════════════════════════════════ */
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative"
    >
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── image ── */}
        <div className="relative w-full aspect-video overflow-hidden bg-primary/60">
          <Image
            src={project.path}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover w-full h-full transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />

          {/* colour overlay on hover */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.color}cc, #131424dd)`,
              opacity: hovered ? 0.85 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* hover content */}
          <div
            className="absolute inset-0 flex flex-col justify-between p-5"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          >
            {/* top: category chip */}
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {project.category}
              </span>
              <span
                className="text-[10px] font-mono font-bold"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {project.id}
              </span>
            </div>

            {/* bottom: title + link */}
            <div>
              <h3 className="text-white font-black text-lg leading-tight mb-1">
                {project.title}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-[3px] rounded-full text-white/80"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.link !== "#" && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white px-4 py-2 rounded-xl transition-all duration-200 hover:brightness-110"
                  style={{
                    background: project.color,
                    boxShadow: `0 4px 16px ${project.color}60`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <BsGlobe className="text-sm" />
                  Live Project
                  <RiExternalLinkLine className="text-sm" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ── card footer ── */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: project.color }}
            />
            <span className="text-white/80 font-semibold text-sm">{project.title}</span>
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-[2px] rounded-full"
            style={{
              background: project.color + "18",
              border: `1px solid ${project.color}35`,
              color: project.color,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;