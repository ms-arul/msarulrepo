import Link from "next/link";
import Socials from "./Socials";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="fixed lg:absolute top-0 z-50 w-full transition-all duration-300">
      {/* Background layer: Seamless black fade for all devices */}
      <div 
        className="absolute top-0 left-0 w-full h-[120px] lg:h-[150px] bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none -z-10"
      />
      
      <div className="container mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-row justify-between items-center h-[70px] lg:h-[100px] transition-all duration-300">
          
          {/* Logo Section */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="flex items-center cursor-pointer group relative"
            >
              <h1 className="text-lg min-[375px]:text-xl sm:text-[26px] lg:text-[34px] font-black tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] text-white font-poppins relative z-10 whitespace-nowrap">
                ARUL
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#ff8c7a] ml-2 lg:ml-3 transition-all duration-500">
                  PRAKASH
                </span>
                <span className="text-accent ml-1 font-black transition-all duration-300 group-hover:text-[#ff8c7a] group-hover:scale-125 inline-block origin-bottom">.</span>
                
                {/* Interactive underline */}
                <span className="absolute -bottom-1 lg:-bottom-2 left-0 w-0 h-[2px] lg:h-[3px] bg-gradient-to-r from-accent to-[#ff8c7a] transition-all duration-500 ease-out group-hover:w-full rounded-full shadow-[0_0_10px_rgba(241,48,36,0.6)]" />
              </h1>
              
              {/* Subtle ambient glow behind logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-accent/10 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
            </motion.div>
          </Link>

          {/* Social Icons Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex items-center relative"
          >
            {/* Ambient glow for socials */}
            <div className="absolute inset-0 bg-accent/10 blur-2xl rounded-full scale-[2] pointer-events-none z-0 hidden lg:block" />
            
            <div className="relative z-10">
              <Socials />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
