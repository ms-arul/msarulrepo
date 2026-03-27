import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

import ParticlesContainer from "../components/ParticlesContainer";
import Avatar from "../components/Avatar";

import { fadeIn } from "../variants";

const DESKTOP_BREAKPOINT = 1024;

const Home = () => {
  // No more forced desktop stuff.
  // The layout will be responsive naturally.

  return (
    <div className="bg-primary/60 min-h-screen lg:h-full relative overflow-y-auto lg:overflow-hidden overflow-x-hidden">

      {/* Content */}
      <div className="w-full min-h-screen lg:h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="container mx-auto min-h-screen lg:h-full flex flex-col justify-center px-4 pt-32 pb-32 xl:pt-40 xl:pb-0 xl:px-0 text-center xl:text-left">
          {/* Mobile Profile Photo (Above Title) */}
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex justify-center xl:hidden mb-6"
          >
            <div className="w-[130px] h-[130px] rounded-full border-[3px] border-accent overflow-hidden bg-black flex items-center justify-center">
              <Image 
                src="/avatar.png"
                alt="Arul Prakash"
                width={130}
                height={130}
                className="object-cover object-top w-full h-full scale-[1.2] translate-y-2 translate-x-1" 
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 text-[32px] sm:text-[40px] md:text-[50px] xl:text-[60px]"
          >
            Transforming Ideas <br />
            Into <span className="text-accent">Digital Reality</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-md mx-auto xl:mx-0 xl:max-w-xl mb-10 xl:mb-16 text-sm sm:text-base md:text-lg"
          >
            I’m Arul Prakash, a student at St. Joseph’s College of Engineering, with a CGPA of 8.39, skilled in Full Stack Development, UI/UX Design, Logo Designing, and Data Analysis. I’m passionate about creating intuitive digital solutions and continuously exploring new technologies to grow as a developer and designer.


          </motion.p>

        </div>
      </div>

      {/* Visuals */}
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
