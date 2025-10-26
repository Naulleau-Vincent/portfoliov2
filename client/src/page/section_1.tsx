import Header from "../layout/header";
import HeroSection from "../layout/imageCollage";
import About from "../layout/about";
import Stack from "../layout/stack";
import Projects from "../layout/projects";
import Journey from "../layout/journey";
import Contact from "../layout/contact";
import Footer from "../layout/footer";
const HomePage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#fdfbf9] text-gray-900">
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <div className="h-20 sm:h-32 bg-gradient-to-b from-[#f7f4f2] to-white"></div>
        <About />
        <Stack />
        <Projects />
        <Journey />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
