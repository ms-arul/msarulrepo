import Link from "next/link";
import {
  RiInstagramLine,
  RiGithubLine,
  RiMailLine,
  RiWhatsappLine,
  RiLinkedinLine,
  RiDownloadLine,
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
    Icon: RiLinkedinLine,
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
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {socialData.map((social, i) =>
        social.isButton ? (
          /* ✅ Download CV – Responsive */
          <Link
            key={i}
            href={social.link}
            download
            className="
              group relative overflow-hidden
              flex items-center justify-center gap-2
              h-10 px-4 sm:px-6 rounded-xl
              bg-gradient-to-r from-accent to-purple-500
              text-sm font-semibold text-white
              shadow-lg shadow-accent/30
              hover:shadow-accent/60 hover:scale-105
              transition-all duration-300
            "
            aria-label="Download CV"
          >
            {/* Shine */}
            <span
              className="
                absolute inset-0 bg-white/20
                translate-x-[-100%]
                group-hover:translate-x-[100%]
                transition-transform duration-700
              "
            />

            <social.Icon className="text-lg relative z-10" />

            {/* Hide text on small screens */}
            <span className="relative z-10 hidden sm:inline">
              Download CV
            </span>
          </Link>
        ) : (
          /* ✅ Social Icons – Mobile Friendly */
          <Link
            key={i}
            title={social.name}
            href={social.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={social.name}
            className="
              flex items-center justify-center
              w-10 h-10 rounded-full
              text-lg text-white/80
              hover:text-accent hover:bg-white/10
              transition-all duration-300
            "
          >
            <social.Icon />
          </Link>
        )
      )}
    </div>
  );
};

export default Socials;
