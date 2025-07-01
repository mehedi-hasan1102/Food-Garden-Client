import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
  {
    question: "What is the purpose of this Food Management App?",
    answer:
      "This app helps you keep track of your food items, monitor their expiry dates, and manage notes related to each item. It supports adding, updating, and deleting food entries, so you never waste food or forget important details.",
  },
  {
    question: "How do I add a new food item?",
    answer:
      "Currently, food items are added via the backend or a dedicated form page. Each food entry includes title, category, quantity, expiry date, description, and an optional image.",
  },
  {
    question: "How can I update or delete my food items?",
    answer:
      "You can update or delete food items you’ve added by navigating to the My Food Items section. Click the Update button to edit details or the Delete button to remove an item permanently. Changes reflect immediately without needing to refresh.",
  },
  {
    question: "Can I add notes to my food items?",
    answer:
      "Yes! You can add personal notes to each food item you own from the food details page. This is useful for reminders, storage tips, or any other relevant info.",
  },
  {
    question: "Who can add notes to a food item?",
    answer:
      "Only the user who added the food item can add notes to it. Other users can view the notes but cannot edit or add new ones.",
  },
  {
    question: "What happens if a food item has expired?",
    answer:
      "The app automatically detects expired items based on the expiry date. Expired items are marked clearly in the UI with a red 'Expired' badge. The countdown timer shows remaining time until expiry for valid items.",
  },
  {
    question: "How does the app handle user authentication?",
    answer:
      "The app uses Firebase Authentication to manage user login. You need to sign in to add, update, or delete your food items and add notes.",
  },
  {
    question: "Is the app responsive?",
    answer:
      "Yes! The app is designed to be fully responsive, showing a table layout on desktop and a card-based layout on mobile devices for better usability.",
  },
  {
    question: "Are my food item details private?",
    answer:
      "Food items are associated with the user who created them. Only you can update or delete your items and add notes to them. Others cannot modify your data.",
  },
  {
    question: "What if the food image fails to load?",
    answer:
      "If the image URL is broken or missing, a default placeholder image will be shown instead to maintain a clean UI.",
  },
  {
    question: "How often does the app check for expired food?",
    answer:
      "Expiry status is checked in real-time each time you load or refresh the food details. The countdown timer continuously updates to show accurate remaining time.",
  },
  {
    question: "Can I filter or sort the food list?",
    answer:
      "Yes, the food list can be filtered by category and searched by title. Sorting options include expiry date (newest or oldest first) and alphabetical order by title.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="w-full min-h-screen bg-[#fffaf5] dark:bg-[#121212] transition-colors duration-500 py-16 px-6 flex justify-center"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-extrabold mb-12 text-center text-[#ff6347] dark:text-[#ffa500] tracking-wide">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqData.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className={`group bg-white dark:bg-[#1e1e1e] rounded-xl shadow-lg dark:shadow-xl border border-transparent hover:border-[#ff6347] dark:hover:border-[#ffa500] transition-all duration-300 overflow-hidden`}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isActive}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-header-${index}`}
                  className="w-full flex justify-between items-center p-6 focus:outline-none"
                >
                  <span
                    className={`text-xl font-semibold text-[#111827] dark:text-[#ddd] transition-colors duration-300`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full border border-[#ff6347] dark:border-[#ffa500] text-[#ff6347] dark:text-[#ffa500] group-hover:bg-[#ff6347] group-hover:text-white dark:group-hover:bg-[#ffa500] dark:group-hover:text-black transition-transform duration-300 ${
                      isActive ? "rotate-45" : ""
                    }`}
                  >
                    {isActive ? <FiMinus size={20} /> : <FiPlus size={20} />}
                  </span>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  className={`px-6 pb-6 text-[#444] dark:text-[#ccc] max-h-0 overflow-hidden transition-all duration-500 ${
                    isActive ? "max-h-[500px] mt-0" : "mt-0"
                  }`}
                  style={{ transitionProperty: "max-height, margin-top" }}
                >
                  <p className="leading-relaxed">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
