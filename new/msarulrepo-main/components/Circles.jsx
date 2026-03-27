import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Circles = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const memory = navigator.deviceMemory || 4;
    if (cores <= 4 || memory <= 4) setIsLowEnd(true);
  }, []);

  /* On low-end: static, no continuous animation */
  if (isLowEnd) {
    return (
      <div className="w-[200px] xl:w-[300px] absolute -right-16 -bottom-2 mix-blend-color-dodge z-10 opacity-50 pointer-events-none select-none">
        <Image
          src="/circles.png"
          alt="circles"
          width={260}
          height={200}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1, 0.95], rotate: [0, 5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="w-[200px] xl:w-[300px] absolute -right-16 -bottom-2 mix-blend-color-dodge z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] pointer-events-none select-none"
    >
      <Image
        src="/circles.png"
        alt="circles"
        width={260}
        height={200}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default Circles;
