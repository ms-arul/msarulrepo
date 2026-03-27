import { motion } from "framer-motion";

const Transition = () => {
  const transitionVariants = {
    initial: {
      x: "100%",
      width: "100%",
    },
    animate: {
      x: "0%",
      width: "0%",
    },
    exit: {
      x: ["0%", "100%"],
      width: ["0%", "100%"],
    },
  };

  return (
    <>
      {/* ── Layer 1 (Deepest / Foundation) ── */}
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[60] bg-[#0b0c15]"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
      />

      {/* ── Layer 2 (Primary Theme Accent) ── */}
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[50] bg-[#f13024]"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.25, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
      />

      {/* ── Layer 3 (Elegant Purple Undertone) ── */}
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-[40] bg-[#3b2d71]"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.4, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
      />

      {/* ── Central Branding Reveal ── */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.95, 1, 1, 1.05],
          filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]
        }}
        transition={{
          delay: 0.15,
          duration: 0.75,
          times: [0, 0.2, 0.8, 1],
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-3xl md:text-5xl font-black tracking-[0.4em] uppercase drop-shadow-2xl">
            Arul
          </span>
          <motion.div
            className="h-[1px] mt-3"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)" }}
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Transition;
