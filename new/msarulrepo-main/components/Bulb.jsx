import Image from "next/image";
import { motion } from "framer-motion";

const Bulb = () => {
  return (
    <motion.div
      animate={{
        opacity: [0.6, 1, 0.6],
        rotate: [12, 14, 12]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute -left-36 -bottom-12 mix-blend-color-dodge z-10 w-[200px] xl:w-[260px] select-none pointer-events-none filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
    >
      <Image
        src="/bulb.png"
        alt="bulb"
        width={260}
        height={200}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default Bulb;
