import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const foodTips = [
  {
    category: 'Fruits & Vegetables',
    title: 'Store Leafy Greens Properly',
    tip: 'Wash greens, pat them thoroughly dry, then wrap them in a paper towel and place them in an airtight container or bag in the crisper drawer. This absorbs moisture and prevents wilting.',
    icon: '🥬'
  },
  {
    category: 'Fruits & Vegetables',
    title: 'Keep Bananas Separate',
    tip: 'Bananas release ethylene gas, which ripens other fruits quickly. Store them away from other produce to prevent premature spoiling of sensitive fruits like apples, avocados, and tomatoes.',
    icon: '🍌'
  },
  {
    category: 'Fruits & Vegetables',
    title: 'Refrigerate Tomatoes (Sometimes)',
    tip: 'For optimal flavor, store ripe tomatoes at room temperature. However, if they are getting too ripe and you want to extend their life by a few days, refrigerate them, but be aware it might slightly reduce their flavor.',
    icon: '🍅'
  },
  {
    category: 'Dairy & Eggs',
    title: 'Store Milk on the Coldest Shelf',
    tip: 'Avoid storing milk in the refrigerator door, as it\'s the warmest part. Keep it on an inside shelf, where temperatures are more consistent and colder, to prolong its freshness.',
    icon: '🥛'
  },
  {
    category: 'Dairy & Eggs',
    title: 'Keep Eggs in Original Carton',
    tip: 'The carton protects eggs from absorbing odors from other foods and maintains their moisture, helping them last longer. Plus, it indicates the expiry date.',
    icon: '🥚'
  },
  {
    category: 'Meat & Poultry',
    title: 'Freeze Meat for Longer Storage',
    tip: 'If you won\'t use fresh meat or poultry within a few days, freeze it immediately. Wrap it tightly in plastic wrap or freezer bags to prevent freezer burn.',
    icon: '🥩'
  },
  {
    category: 'Meat & Poultry',
    title: 'Defrost Safely in the Fridge',
    tip: 'Always defrost frozen meat in the refrigerator, not on the counter. This slow, cool defrosting prevents bacteria from growing rapidly.',
    icon: '❄️'
  },
  {
    category: 'Pantry Items',
    title: 'Store Dry Goods in Airtight Containers',
    tip: 'Flour, sugar, pasta, and cereals should be stored in airtight containers to protect them from moisture, pests, and staleness, extending their shelf life significantly.',
    icon: '🍚'
  },
  {
    category: 'Pantry Items',
    title: 'Keep Potatoes & Onions Cool & Dark',
    tip: 'Store potatoes and onions in a cool, dark, and well-ventilated place, but keep them separate. Onions release gases that can cause potatoes to spoil faster.',
    icon: '🥔'
  },
  {
    category: 'Baked Goods',
    title: 'Freeze Bread for Freshness',
    tip: 'To keep bread fresh for weeks, slice it and freeze it. You can then toast slices directly from the freezer as needed, preventing waste.',
    icon: '🍞'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const ExtraSections = () => {
  return (
    <section className="max-w-8xl mx-auto px-4 py-14 bg-gradient-to-b from-yellow-50 to-white dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-300 rounded-2xl mt-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 dark:text-orange-400">
          Food Preservation & Storage Tips
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-base max-w-xl mx-auto">
          Learn how to store your food properly to extend its freshness, reduce waste, and save money!
        </p>
      </div>

      <MotionDiv
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {foodTips.map((tip, index) => (
          <MotionDiv
            key={index}
            className="bg-gradient-to-br from-yellow-100 to-white dark:from-zinc-800 dark:to-zinc-900 p-5 rounded-xl shadow hover:shadow-xl transition-shadow duration-300 text-center border border-yellow-200 dark:border-zinc-700"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
          >
            <div className="text-5xl mb-3" role="img" aria-label={tip.category}>
              {tip.icon}
            </div>
            <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300 mb-1">
              {tip.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Category: {tip.category}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {tip.tip}
            </p>
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  );
};

export default ExtraSections;
