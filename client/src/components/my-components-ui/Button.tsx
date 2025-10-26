import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  text: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 sm:px-6 sm:py-3 font-medium 
                  transition-all duration-200 ease-in-out shadow-sm
                  ${disabled
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-[#A67665]/10 text-[#A67665] hover:bg-[#A67665]/20"
                  } ${className}`}
    >
      {text}
    </motion.button>
  );
};

export default Button;
