import Image from "next/image";

const Avatar = () => {
  return (
    <div
      className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Decorative ambient glow behind avatar */}
      <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] bg-accent/20 blur-[80px] rounded-full mix-blend-screen -z-10"></div>

      <Image
        src="/avatar.png"
        alt="Arul Prakash"
        width={780}
        height={678}
        className="translate-z-0 w-full h-full drop-shadow-[0_0_20px_rgba(241,48,36,0.15)]"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
      />
    </div>
  );
};

export default Avatar;
