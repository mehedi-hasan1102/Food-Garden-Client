
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiFoodTruck } from "react-icons/gi";

const Footer = () => {
  return (
    <footer
      className="px-6 md:px-12 py-16 text-[#333] bg-[#fffaf5] dark:bg-[#1f1f1f] dark:text-[#f5f5f5] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-3 text-3xl font-extrabold text-[#ff6347] dark:text-[#ffa500] mb-5"
          >
            <GiFoodTruck className="text-4xl" />
            FoodTracker
          </Link>
          <p className="text-sm md:text-base leading-relaxed text-[#444] dark:text-[#ccc]">
            Your go-to guide for healthy eating, providing personalized tracking
            of food health conditions to support your well-being and nutrition goals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#111] dark:text-[#f0f0f0]">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
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
                to="/faq"
                className="hover:text-[#ff6347] dark:hover:text-[#ffa500] transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#ff6347] dark:hover:text-[#ffa500] transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#ff6347] dark:hover:text-[#ffa500] transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#111] dark:text-[#f0f0f0]">
            Contact
          </h3>
          <p className="text-sm md:text-base text-[#555] dark:text-[#ccc]">
            Email: <a href="mailto:support@foodtracker.app" className="underline hover:text-[#ff6347] dark:hover:text-[#ffa500]">support@foodtracker.app</a>
          </p>
          <p className="text-sm md:text-base text-[#555] dark:text-[#ccc] mb-4">
            Phone: +880 123-456-789
          </p>

          <div className="flex gap-5 mt-3 text-xl md:text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6347] dark:text-[#ffa500] hover:text-[#cc5039] dark:hover:text-[#e6a233] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6347] dark:text-[#ffa500] hover:text-[#cc5039] dark:hover:text-[#e6a233] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6347] dark:text-[#ffa500] hover:text-[#cc5039] dark:hover:text-[#e6a233] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6347] dark:text-[#ffa500] hover:text-[#cc5039] dark:hover:text-[#e6a233] transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t mt-12 pt-6 text-center text-sm md:text-base text-[#888] dark:text-[#bbb]">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[#ff6347] dark:text-[#ffa500]">
          Food Tracker
        </span>{" "}
        — All rights reserved.
        <br />
  Developed by{" "}
  <a
    href="https://mehedi-h.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-[#ff6347] dark:text-[#ffa500] hover:underline"
  >
    Mehedi Hasan
  </a>
      </div>
    </footer>
  );
};

export default Footer;
