import React from "react";
import type { IArrow } from "../../shared/models/arrow-models";

const ArrowIcon: React.FC<IArrow> = ({ className = "", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 lg:w-6 lg:h-6 ${className}`}
    {...props}
    aria-label="Arrow icon"
  >
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;
