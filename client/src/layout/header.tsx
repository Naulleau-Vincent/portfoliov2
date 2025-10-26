import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { Menu, X } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import AuthModal from "../components/auth/AuthModal";
import Linkedin from "../components/my-components-ui/Linkedin";
import Github from "../components/my-components-ui/Github";

type AuthMode = "login" | "signup" | "forgot" | "reset";

const Header = () => {
  const { user, logout } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showAuth, setShowAuth] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentY - lastScrollY > 10 && currentY > 100) setHidden(true);
          else if (lastScrollY - currentY > 10) setHidden(false);
          setScrolled(currentY > 10);
          lastScrollY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const navLinks = [
    { label: "About me", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Journey", href: "#journey" },
    { label: "Projects", href: "#projects" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full h-[64px] sm:h-[72px] z-50 
                    flex items-center justify-between
                    px-4 sm:px-6 md:px-10 transition-all duration-300
                    backdrop-blur-lg border
                    ${
                      scrolled
                        ? "bg-white/90 border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.08)]"
                        : "bg-white/85 border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.05)]"
                    }`}
      >
        <a
          href="#home"
          className="font-bold text-lg sm:text-xl tracking-tight text-gray-900"
        >
          Vincent<span className="text-[#a67665]">.</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12 ml-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-700 text-sm xl:text-base font-medium hover:text-[#a67665] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 text-lg xl:text-xl text-gray-800 ml-4">
            <a
              href="https://www.linkedin.com/in/naulleau-vincent/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#a67665] transition"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/Naulleau-Vincent"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#a67665] transition"
            >
              <Github />
            </a>
          </div>
          {!user ? (
            <div className="flex gap-3 ml-4">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                }}
                className="px-4 py-2 text-sm rounded-lg font-medium border border-gray-400 hover:bg-gray-100 transition"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuth(true);
                }}
                className="px-4 py-2 text-sm rounded-lg font-medium bg-[#1a1a1a] text-white hover:opacity-85 transition"
              >
                Sign up
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 text-sm rounded-lg font-medium border border-gray-400 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}
        </nav>
        <button
          className="lg:hidden text-gray-800 p-2 hover:bg-gray-100 rounded-md transition"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-30 lg:hidden"
              onClick={() => setMobileMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="fixed top-[64px] left-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-40 
                         flex flex-col items-center gap-6 py-6 md:py-8 lg:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className="text-gray-800 text-lg font-medium hover:text-[#a67665] transition"
                >
                  {link.label}
                </a>
              ))}
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuth(true);
                      setMobileMenu(false);
                    }}
                    className="px-4 py-2 border border-gray-400 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setShowAuth(true);
                      setMobileMenu(false);
                    }}
                    className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenu(false);
                  }}
                  className="px-4 py-2 border border-gray-400 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              )}
              <div className="flex gap-6 text-2xl text-gray-800 mt-4">
                <a
                  href="https://www.linkedin.com/in/naulleau-vincent/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#a67665] transition"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/Naulleau-Vincent"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#a67665] transition"
                >
                  <Github />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AuthModal
        open={showAuth}
        mode={authMode}
        onClose={() => setShowAuth(false)}
        onSwitchMode={(m) => setAuthMode(m)}
      />
    </>
  );
};

export default Header;
