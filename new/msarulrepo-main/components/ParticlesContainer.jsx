import { useCallback, useState, useEffect } from "react";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

/**
 * Performance-aware particles:
 * - Uses `loadSlim` instead of `loadFull` (smaller bundle, fewer features loaded).
 * - Detects low-end devices via `navigator.hardwareConcurrency` and `navigator.deviceMemory`.
 * - Reduces particle count, disables links, collisions, and hover on low-end.
 * - Caps FPS to 30 on low-end to reduce GPU load.
 */
const ParticlesContainer = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const memory = navigator.deviceMemory || 4; // deviceMemory API (Chrome)
    if (cores <= 4 || memory <= 4) {
      setIsLowEnd(true);
    }
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <Particles
      className="w-full h-full absolute translate-z-0"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "" } },
        fpsLimit: isLowEnd ? 30 : 60,
        interactivity: {
          events: {
            onClick: { enable: false, mode: "push" },
            onHover: {
              enable: !isLowEnd,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: { quantity: 4 },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: { value: "#e68e2e" },
          links: {
            color: "#f5d393",
            distance: isLowEnd ? 120 : 150,
            enable: !isLowEnd,
            opacity: 0.4,
            width: 1,
          },
          collisions: { enable: false },
          move: {
            direction: "none",
            enable: true,
            outMode: { default: "bounce" },
            random: false,
            speed: isLowEnd ? 0.5 : 0.8,
            straight: false,
          },
          number: {
            density: { enable: true, area: isLowEnd ? 1200 : 800 },
            value: isLowEnd ? 25 : 50,
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: isLowEnd ? 3 : 4 },
          },
        },
        detectRetina: !isLowEnd,
      }}
    />
  );
};

export default ParticlesContainer;
