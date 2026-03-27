import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0 relative z-10 flex p-4 items-center justify-center">
      {/* Decorative ambient background pulse behind button */}
      <div className="absolute inset-0 bg-accent/20 blur-[50px] rounded-full w-full h-full mix-blend-screen -z-10 animate-pulse"></div>
      
      <Link
        href="/work"
        className="relative w-[185px] h-[185px] flex justify-center items-center bg-circleStar bg-cover bg-center bg-no-repeat group transition-all duration-500 hover:scale-105"
      >
        {/* Glow behind the actual circle star image */}
        <div className="absolute inset-0 rounded-full group-hover:bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
        
        <Image
          src="/rounded-text.png"
          alt="rounded text"
          width={141}
          height={148}
          className="animate-spin-slow w-full h-full max-w-[141px] max-h-[148px] pointer-events-none select-none group-hover:drop-shadow-[0_0_15px_rgba(241,48,36,0.5)] transition-all duration-300"
        />
        
        <div className="absolute flex items-center justify-center text-4xl group-hover:scale-110 group-hover:text-accent transition-all duration-300 ease-out z-20">
          <HiArrowRight className="group-hover:translate-x-2 transition-all duration-300" aria-hidden />
        </div>
      </Link>
    </div>
  );
};

export default ProjectsBtn;
