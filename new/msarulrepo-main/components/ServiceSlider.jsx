import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData = [
  {
    Icon: RxCrop,
    title: "Branding",
    description: "Building distinctive brand identities that communicate clarity, trust, and long-term value.",
  },
  {
    Icon: RxPencil2,
    title: "Design",
    description: "Creating modern and user-focused visual designs that enhance clarity, appeal, and experience.",
  },
  {
    Icon: RxDesktop,
    title: "Development",
    description: "Developing fast, scalable, and responsive digital products tailored to your exact business needs.",
  },
  {
    Icon: RxReader,
    title: "Copywriting",
    description: "Writing clear, engaging, and goal-driven content that strengthens your message and brand impact.",
  },
  {
    Icon: RxRocket,
    title: "SEO",
    description: "Improving search visibility with strategic SEO methods that boost ranking, traffic, and reach.",
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 15 },
        640: { slidesPerView: 3, spaceBetween: 15 },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-[280px] sm:h-[380px] pb-14"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="relative group cursor-pointer h-full transition-all duration-500">
            {/* Card Content with Glassmorphism */}
            <div className="bg-[rgba(65,47,123,0.15)] h-full rounded-2xl px-6 py-8 flex flex-col gap-x-6 sm:gap-x-0 border border-white/5 backdrop-blur-md transition-all duration-300 group-hover:bg-[rgba(89,65,169,0.25)] group-hover:border-accent/40 group-hover:shadow-[0_8px_32px_rgba(241,48,36,0.15)] z-10 relative overflow-hidden">
              
              {/* Animated Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="text-4xl text-accent mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 relative z-20">
                <item.Icon aria-hidden />
              </div>

              {/* Title & Description */}
              <div className="mb-8 flex-1 relative z-20">
                <div className="mb-2 text-lg font-bold tracking-wide group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </div>
                <p className="max-w-[350px] leading-relaxed text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {item.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="text-3xl relative z-20 flex justify-end">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-accent transition-colors duration-300">
                  <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-white text-white/50 transition-all duration-300" aria-hidden />
                </div>
              </div>
            </div>
            
            {/* Outline Glow behind card */}
            <div className="absolute inset-0 bg-accent/20 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
