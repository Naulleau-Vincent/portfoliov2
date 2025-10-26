import { ArrowRight } from "lucide-react";
import Button from "../components/my-components-ui/Button";
import { motion } from "framer-motion";

export default function LegalNotice() {
  return (
    <section className="relative px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-24 bg-gradient-to-b from-white to-[#fdfbf9] min-h-screen">
      {/* halo décoratif */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#A67665]/10 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-[#e5e5e5]/70 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-3xl p-6 sm:p-10"
      >
        <div className="mb-8">
          <Button
            className="flex justify-start items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#A67665]/10 text-[#A67665] hover:bg-[#A67665]/20 font-semibold rounded-full shadow-sm cursor-pointer text-sm sm:text-base transition-all"
            text={
              <>
                <ArrowRight className="text-[#A67665] rotate-180" />
                <span>Back to portfolio</span>
              </>
            }
            onClick={() => (window.location.href = "/")}
          />
        </div>

        <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#A67665] mb-8">
          Legal Notice
        </h1>

        <div className="space-y-10 text-gray-700 leading-relaxed sm:text-lg">
          <section>
            <h2 className="text-[#A67665] font-semibold text-lg sm:text-xl border-b border-[#A67665]/20 pb-1">
              Publisher
            </h2>
            <p className="mt-3">
              This website is published by <strong>Vincent Naulleau</strong>.<br />
              Email: vincent.naulleau@epitech.eu
            </p>
          </section>

          <section>
            <h2 className="text-[#A67665] font-semibold text-lg sm:text-xl border-b border-[#A67665]/20 pb-1">
              Hosting
            </h2>
            <p className="mt-3">OVH</p>
          </section>

          <section>
            <h2 className="text-[#A67665] font-semibold text-lg sm:text-xl border-b border-[#A67665]/20 pb-1">
              Cookies & Notifications
            </h2>
            <p className="mt-3">
              This website uses cookies to enhance your browsing experience and provide features such as saving preferences and enabling Google reCAPTCHA. By continuing to use this site, you consent to the use of cookies.
            </p>
            <p className="mt-3">
              Certain features may trigger small browser notifications confirming success or failure of an action. These notifications do not collect personal data.
            </p>
          </section>

          <section>
            <h2 className="text-[#A67665] font-semibold text-lg sm:text-xl border-b border-[#A67665]/20 pb-1">
              Liability
            </h2>
            <p className="mt-3">
              The publisher cannot be held responsible for any damages resulting from the use of this website or the information it contains.
            </p>
          </section>
        </div>
      </motion.div>
    </section>
  );
}