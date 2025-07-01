import React from "react";

const About = () => {
  return (
    <section className="min-h-screen bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-500 py-20 px-6 flex items-center justify-center">
      <div className="max-w-7xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-lg dark:shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Image */}
        <div className="md:w-1/2 bg-gradient-to-tr from-[#ff6347]/30 to-[#ffa500]/20 flex items-center justify-center p-10">
          <img
            src="https://i.ibb.co/rRstDXJj/about.png"
            alt="About Illustration"
            className="max-w-full max-h-[400px] drop-shadow-xl rounded-lg"
            loading="lazy"
          />
        </div>



        {/* Right Text Content */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-[#ff6347] dark:text-[#ffa500] mb-8 tracking-wide text-center md:text-left">
            About Us
          </h1>

          <p className="text-[#111827] dark:text-[#d1d5db] text-lg leading-relaxed mb-6">
            Welcome to our Food Management app — a modern, responsive web application
            designed to help you easily track and manage your food items, including
            expiry dates, quantities, and categories.
          </p>

          {/* <p className="text-[#111827] dark:text-[#d1d5db] text-lg leading-relaxed mb-6">
            This project is built using React, Tailwind CSS, and integrates with a
            MongoDB backend for data persistence. It features authentication, note
            taking for each food item, sorting and filtering capabilities, and more,
            all wrapped in a beautiful UI with dark mode support.
          </p> */}

          <p className="text-[#111827] dark:text-[#d1d5db] text-lg leading-relaxed">
            Our goal is to reduce food waste by helping you keep track of your items’
            expiry and usage. We hope you find it useful and enjoyable!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
