import { motion } from "framer-motion";
import { useState, type JSX } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiSharp,
  SiPhp,
  SiHtml5,
  SiCss3,
  SiDotnet,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiSwagger,
  SiPostman,
  SiNodedotjs,
  SiExpress,
  SiJirasoftware,
  SiGithubactions,
} from "react-icons/si";

interface Tech {
  name: string;
  icon: JSX.Element;
  description: string;
}

const technologies: Tech[] = [
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
    description: "Dynamic scripting language for interactive UIs and APIs.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-500" />,
    description: "Strongly typed superset of JavaScript for scalable code.",
  },
  {
    name: "C# / .NET",
    icon: (
      <div className="flex items-center justify-center gap-1 text-purple-600">
        <SiSharp />
        <SiDotnet />
      </div>
    ),
    description: "Backend framework for web apps, APIs and enterprise systems.",
  },
  {
    name: "Python",
    icon: <SiPython className="text-yellow-500" />,
    description: "Versatile language for automation, scripts, and APIs.",
  },
  {
    name: "PHP",
    icon: <SiPhp className="text-indigo-400" />,
    description: "Server-side scripting for classic web applications.",
  },
  {
    name: "SQL",
    icon: <SiMysql className="text-[#00618A]" />,
    description: "Relational database querying and optimization.",
  },
  {
    name: "React",
    icon: <SiReact className="text-sky-400" />,
    description: "Component-based library for building modern frontends.",
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="text-cyan-400" />,
    description: "Utility-first CSS framework for rapid UI design.",
  },
  {
    name: "HTML5",
    icon: <SiHtml5 className="text-orange-500" />,
    description: "Markup language structuring modern web interfaces.",
  },
  {
    name: "CSS3",
    icon: <SiCss3 className="text-blue-400" />,
    description: "Styling language for responsive, creative layouts.",
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="text-green-600" />,
    description: "Runtime environment for scalable backend services.",
  },
  {
    name: "Express",
    icon: <SiExpress className="text-gray-700" />,
    description: "Minimal Node.js framework for REST APIs.",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="text-[#336791]" />,
    description: "Advanced open-source SQL database with JSON support.",
  },
  {
    name: "GitHub Actions",
    icon: <SiGithubactions className="text-gray-700" />,
    description: "Automated workflows for build, test, and deploy.",
  },
  {
    name: "Docker",
    icon: <SiDocker className="text-sky-600" />,
    description: "Containerization and isolated development environments.",
  },
  {
    name: "Postman",
    icon: <SiPostman className="text-orange-500" />,
    description: "API testing and documentation tool.",
  },
  {
    name: "Swagger",
    icon: <SiSwagger className="text-green-500" />,
    description: "Interactive documentation for RESTful APIs.",
  },
  {
    name: "Git",
    icon: <SiGit className="text-orange-600" />,
    description: "Version control for collaborative development.",
  },
  {
    name: "Jira",
    icon: <SiJirasoftware className="text-[#2684FF]" />,
    description: "Agile project management and sprint planning tool.",
  },
];

const Stack = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center 
                 px-6 sm:px-10 md:px-20 lg:px-28 py-24 sm:py-28 md:py-32 
                 bg-gradient-to-b from-[#f7f4f2] to-white"
    >
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[500px] bg-[#A67665]/10 blur-[160px] rounded-full pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="uppercase text-xs sm:text-sm font-semibold text-gray-500 tracking-[0.25em] mb-2">
          My Stack
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Technologies I Work With
        </h2>
        <div className="mx-auto mt-4 h-[2px] w-12 bg-[#A67665]"></div>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 max-w-6xl">
        {technologies.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            onMouseEnter={() => setHovered(tech.name)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex flex-col items-center justify-center p-5 sm:p-6 md:p-8 
                       bg-white/80 border border-[#e5e5e5]/70 rounded-2xl 
                       shadow-[0_6px_25px_rgba(0,0,0,0.05)] 
                       hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] 
                       hover:scale-[1.04] transition-all duration-300 cursor-default group"
          >
            <div className="text-4xl sm:text-5xl mb-3">{tech.icon}</div>
            <p className="text-sm sm:text-base font-semibold text-gray-900">
              {tech.name}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: hovered === tech.name ? 1 : 0,
                y: hovered === tech.name ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] 
                         text-center text-xs sm:text-sm text-gray-600 
                         bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-md
                         pointer-events-none"
            >
              {tech.description}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="mt-20 w-full max-w-5xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A67665]/30 to-transparent" />
      </div>
    </section>
  );
};

export default Stack;
