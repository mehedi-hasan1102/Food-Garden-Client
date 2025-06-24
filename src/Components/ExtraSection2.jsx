import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  LeafyGreen,
  Wallet,
  Lightbulb,
  Trash2
} from 'lucide-react';

const MotionDiv = motion.div;

const foodWasteFacts = [
  {
    title: '1/3 of Food Wasted Globally',
    description:
      'Roughly one-third of food produced for humans — approx. 1.3 billion tonnes — gets lost or wasted yearly.',
    icon: Globe,
    color: 'text-red-500 dark:text-red-400',
  },
  {
    title: '$1 Trillion Economic Loss',
    description:
      'Food waste costs the global economy around $1 trillion each year.',
    icon: Wallet,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Huge Environmental Impact',
    description:
      'If food waste were a country, it’d rank third in greenhouse gas emissions — after China and the U.S.',
    icon: LeafyGreen,
    color: 'text-orange-500 dark:text-orange-400',
  },
  {
    title: 'Water & Land Resources Wasted',
    description:
      'Food waste wastes water equivalent to the annual flow of Russia’s Volga River.',
    icon: Trash2,
    color: 'text-purple-500 dark:text-purple-400',
  },
  {
    title: 'Help End Hunger',
    description:
      'Cutting food loss could feed 2 billion people. Small actions have global impact.',
    icon: Lightbulb,
    color: 'text-blue-500 dark:text-blue-400',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.85 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.6
    }
  }
};

const ExtraSection2 = () => {
  return (
    <section className="rounded-2xl mt-8 max-w-8xl mx-auto px-4 py-14 bg-gradient-to-b from-yellow-50 to-white dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-300">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 dark:text-orange-400">
          Understanding Food Waste: Facts & Statistics
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-base max-w-xl mx-auto">
          Every action to reduce food waste contributes to a healthier planet and future.
        </p>
      </div>

      <MotionDiv
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {foodWasteFacts.map((fact, index) => (
          <MotionDiv
            key={index}
            className="text-center bg-gradient-to-br from-yellow-100 to-white dark:from-zinc-800 dark:to-zinc-900 p-6 rounded-xl shadow hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-between"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.2 } }}
          >
            <div className={`text-6xl mb-4 ${fact.color}`}>
              {React.createElement(fact.icon, { size: 64 })}
            </div>
            <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300 mb-2">
              {fact.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {fact.description}
            </p>
          </MotionDiv>
        ))}
      </MotionDiv>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-2 rounded-md btn
          bg-[#ff6347] text-white font-semibold
          hover:bg-[#e5533c] dark:bg-[#ffa500] dark:text-gray-900 dark:hover:bg-[#cc8400]
          transition-colors duration-200"
        >
          Back to Top
        </button>
      </div>
    </section>
  );
};

export default ExtraSection2;
