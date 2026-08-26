import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="rounded-2xl px-4 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#ff6347] to-[#ffa500] rounded-2xl p-10 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to track expiry dates?
              </h2>
              <p className="text-sm mt-3 max-w-2xl">
                Add your first food item and start reducing waste today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg bg-white text-[#ff6347] font-semibold hover:bg-[#fff1e9] transition-colors"
              >
                Create Account
              </Link>
              <Link
                to="/add-food"
                className="px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Add Food
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
