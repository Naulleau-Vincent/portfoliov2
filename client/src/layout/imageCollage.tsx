import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-center 
                 min-h-screen bg-gradient-to-b from-[#fdfbf9] to-[#f7f4f2] 
                 text-gray-900 px-6 sm:px-10 md:px-20 pt-[72px] md:pt-[80px] pb-16 overflow-visible"
    >
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] 
                      bg-[#A67665]/15 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center 
                      gap-12 md:gap-20 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 mb-10 md:mb-0"
        >
          <img
            src="/vincent.png"
            alt="Vincent Naulleau portrait"
            className="w-48 sm:w-64 md:w-80 lg:w-96 rounded-2xl border border-white/70 
                       shadow-[0_10px_35px_rgba(0,0,0,0.25)] hover:scale-[1.03] 
                       transition-transform duration-500"
          />
          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-center md:text-left text-[#A67665] text-sm sm:text-base md:text-lg italic font-medium px-4"
          >
            “Patience, perseverance and positivity, that’s the key to success.”
          </motion.blockquote>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="text-center md:text-left w-full md:w-1/2 space-y-5 sm:space-y-6"
        >
          <p className="uppercase text-xs sm:text-sm font-semibold text-gray-500 tracking-[0.25em]">
            Hello, I'm Vincent Naulleau
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-snug">
            Full-Stack Developer <br />
            <span className="text-[#A67665] font-extrabold">
              Driven by Curiosity & Creativity
            </span>
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed 
                        max-w-md sm:max-w-lg mx-auto md:mx-0">
            I design and build digital experiences where clarity meets emotion with clean interfaces, solid architecture, and a touch of soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8">
            <a
              href="#projects"
              className="px-6 py-3 bg-[#1a1a1a] text-white rounded-lg text-sm sm:text-base font-medium
                         shadow-md hover:opacity-85 transition"
            >
              See My Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a]
                         rounded-lg text-sm sm:text-base font-medium hover:bg-[#1a1a1a]/10 transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
