import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCallback } from "react";

const projects = [
  {
    title: "E-Commerce",
    image: "/project/e-commerce/e-commerce-admin.svg",
    description:
      "A complete e-commerce platform with authentication, product management, and Stripe payments. Built in a Dockerized team environment.",
    tech: ["React", "Symfony", "MySQL", "Stripe", "Docker"],
    link: "https://github.com/Naulleau-Vincent",
  },
  {
    title: "My Battleship",
    image: "/project/my-battleship/my-battleship-aligns.svg",
    description:
      "Debugged and enhanced a Battleship game in vanilla JS. Implemented collision rules, visual placement, and AI difficulty.",
    tech: ["JavaScript", "HTML", "CSS", "Gulp"],
    link: "https://github.com/Naulleau-Vincent/My_Battleship",
  },
  {
    title: "My IRC",
    image: "/project/my-irc/my-irc-login.svg",
    description:
      "A real-time chat app using WebSockets with multi-room support, user list, and timestamps. Built in Node.js.",
    tech: ["Node.js", "WebSockets", "JavaScript"],
    link: "https://github.com/Naulleau-Vincent/My_IRC",
  },
  {
    title: "My Netflix",
    image: "/project/my-netflix/my-netflix-home.min.svg",
    description:
      "React + PHP app integrating a public movie API, authentication via Google OAuth, and personalized lists.",
    tech: ["React", "PHP", "Axios", "OAuth"],
    link: "",
  },
  {
    title: "My Spotify",
    image: "/project/my-spotify/my-spotify-home.svg",
    description:
      "A Spotify-like app built during a mini hackathon using React and Node.js. Integrates a public API to browse and manage favorite tracks within a Dockerized environment.",
    tech: ["React", "Node.js", "Express", "Docker", "Music API"],
    link: "",
  },
];

const Projects = () => {
  const handleOpenGitHub = useCallback(() => {
    window.open("https://github.com/Naulleau-Vincent", "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-center 
                 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 
                 py-20 sm:py-24 md:py-28 lg:py-32 
                 bg-gradient-to-b from-white to-[#fdfbf9]"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[500px] bg-[#A67665]/10 blur-[160px] rounded-full pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="uppercase text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 tracking-[0.25em] mb-2">
          My Work
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Featured Projects
        </h2>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-[#A67665]" />
      </motion.div>
      <div className="w-full max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          centeredSlides
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 1, centeredSlides: true },
            1024: { slidesPerView: 2, centeredSlides: false },
          }}
          className="pb-14"
        >
          {projects.map((proj, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-[#e5e5e5]/70 
                           shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-3xl 
                           flex flex-col overflow-hidden transition-all duration-300 
                           hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
              >
                <div className="overflow-hidden relative bg-[#fdfbf9]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-56 sm:h-60 md:h-64 lg:h-72 
                               object-cover object-top 
                               hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6 sm:p-7 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#A67665] mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 flex-grow">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] sm:text-xs md:text-sm px-2.5 py-1 rounded-full bg-[#f8f6f4] border border-[#A67665]/30 text-[#A67665]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {proj.link ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-auto px-5 py-2 bg-[#A67665] text-white text-xs sm:text-sm md:text-base font-medium rounded-lg shadow-md hover:opacity-90 transition"
                    >
                      View on GitHub
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-block mt-auto px-5 py-2 bg-gray-200 text-gray-500 text-xs sm:text-sm md:text-base font-medium rounded-lg cursor-not-allowed"
                    >
                      Coming soon
                    </button>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <motion.button
        onClick={handleOpenGitHub}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-12 px-6 py-3 rounded-full bg-[#1a1a1a] text-white font-medium text-sm sm:text-base shadow-md hover:opacity-85 transition"
      >
        See more on GitHub →
      </motion.button>
      <div className="mt-20 w-full max-w-5xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A67665]/30 to-transparent" />
      </div>
    </section>
  );
};

export default Projects;
