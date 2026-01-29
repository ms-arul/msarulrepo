import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

import { fadeIn } from "../variants";

const DESKTOP_BREAKPOINT = 1024;

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [forceDesktop, setForceDesktop] = useState(false);
  const [dialogShownOnce, setDialogShownOnce] = useState(false);

  // Detect screen size safely
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < DESKTOP_BREAKPOINT;
      setIsMobile(mobile);

      if (mobile && !dialogShownOnce) {
        setShowDialog(true);
        setDialogShownOnce(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dialogShownOnce]);

  // Force desktop mode
  useEffect(() => {
    document.body.classList.toggle("force-desktop", forceDesktop);
  }, [forceDesktop]);

  return (
    <div className="bg-primary/60 h-full relative overflow-hidden">
      {/* Mobile → Desktop Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full text-center shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-3">
                Switch to Desktop Version?
              </h2>
              <p className="text-sm opacity-80 mb-6">
                This site is optimized for desktop viewing.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setForceDesktop(true);
                    setShowDialog(false);
                  }}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Yes
                </button>

                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:opacity-80 transition"
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="container mx-auto h-full flex flex-col justify-center px-4 pt-28 xl:pt-40 xl:px-0 text-center xl:text-left">
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

          {/* Projects Button */}
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className={`flex justify-center xl:justify-start ${
              isMobile && !forceDesktop ? "xl:hidden" : ""
            }`}
          >
            <ProjectsBtn />
          </motion.div>
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
            absolute bottom-0 left-1/2 -translate-x-1/2
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
