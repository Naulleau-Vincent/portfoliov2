import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="px-4 lg:px-8 bg-gray-50 flex justify-center">
      <div className="flex flex-col items-center bg-white px-4 pb-4 lg:py-4 w-full xl:w-2/3">
        <p className="mb-2 text-[11px] text-gray-500 mt-2 lg:text-sm">
          © {new Date().getFullYear()} Vincent Naulleau. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 font-medium">
          <Link
            to="/legal-notice"
            className="cursor-pointer hover:underline transition-colors text-[11px] text-gray-500 text-center lg:text-sm"
          >
            Legal Notice
          </Link>
          <Link
            to="/privacy-policy"
            className="cursor-pointer hover:underline transition-colors text-[11px] text-gray-500 text-center lg:text-sm"
          >
            Privacy Policy
          </Link>
        </div>
        <p className="mt-2 text-[10px] text-gray-400 lg:text-xs">v1.0.3</p>
      </div>
    </footer>
  );
}

export default Footer;
