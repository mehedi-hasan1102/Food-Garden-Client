import { useAuth } from "../context/Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddFoodPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form));

    // Add userEmail and addedDate automatically
    formData.userEmail = user.email;
    formData.addedDate = new Date().toISOString();

    try {
      const res = await fetch("https://project-web-b11-a11-food-garden-ser.vercel.app/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add food");

      Swal.fire({
        title: "Food item added!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
      navigate("/my-foods"); // Redirect after success
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add food item. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8
        bg-[#fffaf5] dark:bg-[#1f1f1f] transition-colors duration-300"
    >
      <section
        className="mt-20 max-w-3xl w-full p-8
          bg-white dark:bg-[#1f1f1f]
          rounded-2xl
          shadow-lg dark:shadow-[0_0_15px_#ffa500aa]"
      >
        <h2
          className="text-4xl font-bold
            text-[#ff6347] dark:text-[#ffa500]
            text-center mb-8"
        >
          Add a New Food Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput label="Food Image URL" name="image" type="text" required />

          <FormInput label="Food Title" name="title" type="text" required />

          <FormSelect
            label="Category"
            name="category"
            options={["Dairy", "Meat", "Vegetables", "Snacks"]}
          />

          <FormInput label="Quantity" name="quantity" type="number" min="1" required />

          <FormInput label="Expiry Date" name="expiryDate" type="date" required />

          <FormTextarea label="Description" name="description" />

          {/* Hidden fields (auto filled) */}
          <FormInput
            label="User Email"
            name="userEmail"
            type="email"
            value={user.email}
            readOnly
            hidden
          />
          <FormInput
            label="Added Date"
            name="addedDate"
            type="text"
            value={new Date().toISOString()}
            readOnly
            hidden
          />

          <button
            type="submit"
            className="w-full rounded-md
              bg-[#ff6347] hover:bg-[#e5533d]
              dark:bg-[#ffa500] dark:hover:bg-[#cc8400]
              text-white text-lg font-semibold
              transition-colors duration-300
              py-3"
          >
            🍽️ Add Food
          </button>
        </form>
      </section>
    </div>
  );
};

// Reusable form components

const FormInput = ({ label, ...props }) => (
  <div className={props.hidden ? "hidden" : ""}>
    <label
      htmlFor={props.name}
      className="block mb-1 font-medium
        text-[#111827] dark:text-[#d1d5db]"
    >
      {label}
    </label>
    <input
      {...props}
      id={props.name}
      className="input input-bordered w-full rounded-md
        dark:bg-[#1f1f1f] dark:border-[#ffa500] dark:text-[#d1d5db]
        border border-[#ff6347] text-[#111827]
        focus:outline-none focus:ring-2 focus:ring-[#ff6347]
        dark:focus:ring-[#ffa500]"
    />
  </div>
);

const FormTextarea = ({ label, ...props }) => (
  <div>
    <label
      htmlFor={props.name}
      className="block mb-1 font-medium
        text-[#111827] dark:text-[#d1d5db]"
    >
      {label}
    </label>
    <textarea
      {...props}
      id={props.name}
      className="textarea textarea-bordered w-full rounded-md
        dark:bg-[#1f1f1f] dark:border-[#ffa500] dark:text-[#d1d5db]
        border border-[#ff6347] text-[#111827]
        focus:outline-none focus:ring-2 focus:ring-[#ff6347]
        dark:focus:ring-[#ffa500]"
    />
  </div>
);

const FormSelect = ({ label, name, options, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-1 font-medium
        text-[#111827] dark:text-[#d1d5db]"
    >
      {label}
    </label>
    <select
      name={name}
      id={name}
      className="select select-bordered w-full rounded-md
        dark:bg-[#1f1f1f] dark:border-[#ffa500] dark:text-[#d1d5db]
        border border-[#ff6347] text-[#111827]
        focus:outline-none focus:ring-2 focus:ring-[#ff6347]
        dark:focus:ring-[#ffa500]"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default AddFoodPage;
