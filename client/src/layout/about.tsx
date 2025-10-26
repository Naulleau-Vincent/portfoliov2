import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col justify-center items-center 
                 px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 
                 py-20 sm:py-28 md:py-32 
                 bg-gradient-to-b from-white via-[#fdfbf9] to-[#f7f4f2]"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 
                      w-[250px] sm:w-[400px] md:w-[550px] 
                      h-[250px] sm:h-[400px] md:h-[500px] 
                      bg-[#A67665]/10 blur-[120px] sm:blur-[160px] rounded-full 
                      pointer-events-none">
      </div>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative bg-white/80 backdrop-blur-xl border border-[#e5e5e5]/70 
                   shadow-[0_8px_35px_rgba(0,0,0,0.08)] rounded-3xl 
                   p-6 sm:p-10 md:p-14 lg:p-16 w-full max-w-4xl"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 mb-10 sm:mb-12">
          <motion.img
            src="/vincent-avatar.webp"
            alt="Vincent Naulleau"
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 
                       rounded-full border-2 border-[#A67665]/40 shadow-md object-cover 
                       flex-shrink-0"
          />
          <div className="text-center sm:text-left">
            <p className="uppercase text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-500 tracking-[0.25em]">
              About Me
            </p>
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug mt-2">
              A developer driven by curiosity{" "}
              <br className="hidden sm:block" /> & creativity
            </h2>
            <div className="mt-3 h-[2px] w-10 sm:w-12 bg-[#A67665] mx-auto sm:mx-0"></div>
          </div>
        </div>
        <div className="text-gray-700 text-[13px] xs:text-sm sm:text-base md:text-lg leading-relaxed space-y-5 text-center sm:text-left">
          <p>
            I’m Vincent, a full-stack developer who found his way into tech a bit unexpectedly but once I started, I never looked back. After a non-traditional path,
            I joined the <strong>Web@cadémie by Epitech</strong>, a project-based coding school
            that taught me how to build, debug, and think like a real developer.
          </p>
          <p>
            I’m currently working at <strong>Sidetrade</strong>, where I contribute to
            full-stack features within a fast-paced SaaS environment collaborating with experienced engineers, delivering production-ready code,
            and continuously learning about scalability, performance, and clean design.
          </p>
          <p>
            Beyond the code, I’m passionate about building{" "}
            <em>meaningful, human-centered</em> products interfaces that feel clear,
            intuitive, and alive. My goal is to bridge logic and emotion, crafting tools
            that empower people while keeping the joy of creation intact.
          </p>
        </div>
        <div className="mt-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A67665]/30 to-transparent" />
        </div>
      </motion.article>
    </section>
  );
};

export default About;
