import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";

const API_URL = "https://api.vincentnaulleau.ovh/api/auth/verify";

const Verify: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "already">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Missing token in URL.");
      return;
    }

    fetch(`${API_URL}?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Your account has been verified successfully!");
        } else if (res.status === 400 && data === "Account is already verified") {
          setStatus("already");
          setMessage("Your account is already verified.");
        } else {
          setStatus("error");
          setMessage(data.error || "Invalid or expired verification link.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Unable to reach the server.");
      });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fdfbf9] to-white px-4">
      {/* halo effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#A67665]/10 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/90 backdrop-blur-xl border border-[#e5e5e5]/70 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 max-w-md w-full text-center"
      >
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-[#A67665]/20" />
              <div className="absolute inset-0 rounded-full border-4 border-t-[#A67665] animate-spin" />
              <div className="absolute -inset-3 bg-[#A67665]/10 blur-[40px] rounded-full"></div>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 animate-pulse">
              Verifying your account...
            </h2>
          </div>
        )}
        {status === "success" && (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
            <h1 className="text-2xl font-bold text-[#A67665] mb-2">Account Verified</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#A67665] text-white text-sm sm:text-base font-medium shadow-md hover:bg-[#8a5e55] transition"
            >
              Go to Portfolio
            </a>
          </div>
        )}
        {status === "already" && (
          <div className="flex flex-col items-center">
            <Info className="w-12 h-12 text-blue-500 mb-3" />
            <h1 className="text-2xl font-bold text-[#A67665] mb-2">Already Verified</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#A67665] text-white text-sm sm:text-base font-medium shadow-md hover:bg-[#8a5e55] transition"
            >
              Go to Portfolio
            </a>
          </div>
        )}
        {status === "error" && (
          <div className="flex flex-col items-center">
            <XCircle className="w-12 h-12 text-red-500 mb-3" />
            <h1 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#A67665] text-white text-sm sm:text-base font-medium shadow-md hover:bg-[#8a5e55] transition"
            >
              Back to Home
            </a>
          </div>
        )}
      </motion.div>
      <div className="mt-16 w-full max-w-5xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A67665]/30 to-transparent" />
      </div>
    </section>
  );
};

export default Verify;
