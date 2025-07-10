import { useState } from "react";
import { Mail, Lock, User, Phone } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.name) err.name = "Full name is required";
    if (!form.username) err.username = "Username is required";
    if (!form.phone) err.phone = "Phone number is required";
    if (!form.email) err.email = "Email is required";
    if (!form.password) err.password = "Password is required";
    if (form.password !== form.confirm) err.confirm = "Passwords do not match";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) return setErrors(validation);
    setLoading(true);
    // submit logic here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-white">
      <header className="text-2xl font-bold text-center text-[#00A99D] mb-4">
        XploreNow
      </header>

      <div className="max-w-md w-full mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
              />
            </div>
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
              />
            </div>
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
              />
            </div>
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
              />
            </div>
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
              />
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
              />
            </div>
            {errors.confirm && <p className="text-sm text-red-500">{errors.confirm}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#00A99D] text-white rounded-xl hover:bg-opacity-90 transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-[#00A99D] font-medium">
            Login
          </a>
        </div>
      </div>

      <footer className="mt-6 text-center text-xs text-gray-400">© 2025 XploreNow</footer>
    </div>
  );
}
