import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TopLeftImg = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const memory = navigator.deviceMemory || 4;
    if (cores <= 4 || memory <= 4) setIsLowEnd(true);
  }, []);

  /* Low-end: static image, no pulsing animation, no drop-shadow */
  if (isLowEnd) {
    return (
      <div className="absolute left-0 top-0 mix-blend-color-dodge z-10 w-[200px] xl:w-[400px] pointer-events-none select-none opacity-50">
        <Image
          src="/top-left-img.png"
          alt="left cover bg"
          width={400}
          height={400}
        />
      </div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-0 top-0 mix-blend-color-dodge z-10 w-[200px] xl:w-[400px] pointer-events-none select-none filter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
    >
      <Image
        src="/top-left-img.png"
        alt="left cover bg"
        width={400}
        height={400}
      />
    </motion.div>
  );
};

export default TopLeftImg;
