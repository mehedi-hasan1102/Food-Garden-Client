import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

import { GiFoodTruck } from "react-icons/gi";

const Footer = () => {
  return (
    <footer
      className="px-6 md:px-12 py-12 bg-[#fff1e6] text-[#333]
      dark:bg-[#1a1a1a] dark:text-[#f5f5f5] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-[#ff6347] dark:text-[#ffa500] mb-4"
          >
            <GiFoodTruck />
            FoodGarden
          </Link>
          <p className="text-sm leading-relaxed text-[#444] dark:text-[#ccc]">
            Your go-to guide for healthy eating, providing personalized tracking
            of food health conditions to support your well-being.{" "}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#111] dark:text-[#f0f0f0]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-[#ff6347] dark:hover:text-[#ffa500] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/fridge"
                className="hover:text-[#ff6347] dark:hover:text-[#ffa500] transition-colors"
              >
                Fridge
              </Link>
            </li>
            <li>
              <Link
                to="//faq"
                className="hover:text-[#ff6347] dark:hover:text-[#ffa500] transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#111] dark:text-[#f0f0f0]">
            Contact
          </h3>
          <p className="text-sm text-[#555] dark:text-[#ccc]">
            Email: support@foodgarden.app
          </p>
          <p className="text-sm text-[#555] dark:text-[#ccc] mb-3">
            Phone: +880 123-456-789
          </p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6347] dark:text-[#ffa500] hover:text-[#cc5039] dark:hover:text-[#e6a233] transition text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6347] dark:text-[#ffa500] hover:text-[#cc5039] dark:hover:text-[#e6a233] transition text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6347] dark:text-[#ffa500] hover:text-[#cc5039] dark:hover:text-[#e6a233] transition text-xl"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t mt-10 pt-5 text-center text-sm text-[#888] dark:text-[#bbb]">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-medium text-[#ff6347] dark:text-[#ffa500]">
          Food Garden
        </span>{" "}
        — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
