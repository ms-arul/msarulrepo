import Link from "next/link";
import { useState } from "react";
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

export const socialData = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/ms_arul_?igsh=MXc4cTc4Z3UyMmZxeQ==",
    Icon: RiInstagramLine,
  },
  {
    name: "Email",
    link: "mailto:msarul7686@gmail.com",
    Icon: RiMailLine,
  },
  {
    name: "LinkedIn",
    link: "https://in.linkedin.com/in/arul-prakash-a3694a2ba",
    Icon: RiLinkedinFill,
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/919962349659",
    Icon: RiWhatsappLine,
  },
  {
    name: "Github",
    link: "https://github.com/ms-arul",
    Icon: RiGithubLine,
  },
  {
    name: "Download CV",
    link: "/ARULPRAKASH_RESUME.pdf",
    Icon: RiDownloadLine,
    isButton: true,
  },
];

const Socials = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-end z-[60]">
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-xl text-white hover:bg-accent/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle socials"
      >
        {isOpen ? <RiCloseLine /> : <RiMenu4Line />}
      </button>

      {/* Social Icons Container */}
      <div
        className={`
          absolute sm:relative top-[55px] sm:top-0 right-0 sm:right-auto
          flex-col sm:flex-row items-center gap-4 sm:gap-5
          bg-black/80 sm:bg-transparent p-5 sm:p-0 rounded-2xl sm:rounded-none
          border border-white/10 sm:border-transparent backdrop-blur-xl sm:backdrop-blur-none
          transition-all duration-400 origin-top-right shadow-[0_8px_32px_rgba(0,0,0,0.7)] sm:shadow-none
          z-40
          ${
            isOpen
              ? "flex opacity-100 scale-100 pointer-events-auto translate-y-0"
              : "hidden sm:flex opacity-0 sm:opacity-100 scale-95 sm:scale-100 pointer-events-none sm:pointer-events-auto -translate-y-2 sm:translate-y-0"
          }
        `}
      >
        {socialData.map((social, i) =>
          social.isButton ? (
            /* ✅ Download CV – Premium Glass Button */
            <Link
              key={i}
              href={social.link}
              download
              className="
                group relative overflow-hidden
                flex items-center justify-center gap-2
                h-11 px-5 sm:px-6 rounded-xl w-full sm:w-auto
                bg-accent/20 border border-accent/50
                text-sm font-semibold text-white tracking-wide
                shadow-[0_0_15px_rgba(241,48,36,0.2)]
                hover:bg-accent hover:border-accent hover:shadow-[0_0_25px_rgba(241,48,36,0.6)] hover:scale-105
                transition-all duration-300
                mt-2 sm:mt-0
              "
              aria-label="Download CV"
            >
              <span
                className="
                  absolute inset-0 bg-white/20
                  translate-x-[-100%]
                  group-hover:translate-x-[100%]
                  transition-transform duration-700
                "
              />
              <social.Icon className="text-[18px] relative z-10" />
              <span className="relative z-10 sm:inline inline">
                Download CV
              </span>
            </Link>
          ) : (
            /* ✅ Social Icons – Sleek Circle Icons */
            <Link
              key={i}
              title={social.name}
              href={social.link}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.name}
              className="
                flex items-center justify-center
                w-[42px] h-[42px] rounded-full
                text-[20px] text-white/80
                bg-white/5 sm:bg-transparent
                border border-white/5 sm:border-transparent
                hover:text-accent hover:bg-accent/10 hover:border-accent/40
                transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(241,48,36,0.3)]
              "
            >
              <social.Icon />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Socials;
