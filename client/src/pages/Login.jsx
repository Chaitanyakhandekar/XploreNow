import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#00A99D] text-white rounded-xl hover:bg-opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account? <a href="/register" className="text-[#00A99D] font-medium">Register</a>
        </div>
      </div>

      <footer className="mt-6 text-center text-xs text-gray-400">© 2025 XploreNow</footer>
    </div>
  );
}
