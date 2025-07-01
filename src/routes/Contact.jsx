import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    setSubmitSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSubmitSuccess(null);

    try {
      // Simulate sending message
      await new Promise((res) => setTimeout(res, 1500));
      setSubmitSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitSuccess("Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-500 py-20 px-6 flex items-center justify-center">
      <div className="max-w-7xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-lg dark:shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-gradient-to-tr from-[#ff6347]/30 to-[#ffa500]/20 flex items-center justify-center p-10">
          <img
            src="https://i.ibb.co/Mk7BGM0v/contact.png"
            alt="Contact Illustration"
            className="max-w-full max-h-[400px] drop-shadow-xl rounded-lg"
            loading="lazy"
          />
        </div>


        {/* Right Form Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-[#ff6347] dark:text-[#ffa500] mb-8 tracking-wide text-center md:text-left">
            Contact Us
          </h1>

          {submitSuccess && (
            <div
              className={`mb-6 text-center md:text-left py-3 rounded-md ${
                submitSuccess.includes("success")
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {submitSuccess}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-[#111827] dark:text-[#d1d5db] font-medium"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-md border px-4 py-3 text-[#111827] dark:text-[#d1d5db] bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
                } transition`}
                placeholder="Your name"
                disabled={submitting}
              />
              {errors.name && (
                <p className="mt-1 text-red-600 text-sm font-medium">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-[#111827] dark:text-[#d1d5db] font-medium"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-md border px-4 py-3 text-[#111827] dark:text-[#d1d5db] bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
                } transition`}
                placeholder="your.email@example.com"
                disabled={submitting}
              />
              {errors.email && (
                <p className="mt-1 text-red-600 text-sm font-medium">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-[#111827] dark:text-[#d1d5db] font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full rounded-md border px-4 py-3 text-[#111827] dark:text-[#d1d5db] bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#ff6347] dark:focus:ring-[#ffa500]"
                } transition resize-none`}
                placeholder="Write your message here..."
                disabled={submitting}
              />
              {errors.message && (
                <p className="mt-1 text-red-600 text-sm font-medium">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#ff6347] hover:bg-[#e5533d] dark:bg-[#ffa500] dark:hover:bg-[#cc8400] text-white rounded-md font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
