import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { InputField } from "../../components/InputField";
import axios from "axios";
import { useNavigate } from "react-router";
import { api } from "../../api/api";


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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const registerUser = async ()=>{
    validate();
    const response = await api
                        .post("/api/v1/users/register" , {
                            username:form.username,
                            fullName:form.name,
                            email:form.email,
                            password:form.password,
                            phone:form.phone
                        })
                        .then((response)=>{
                          console.log(response)
                          alert("User Registered Successfully")
                          navigate("/login")
                        })
                        .catch((response)=>{
                          console.log(response.response.data)
                          alert(response.response.data.split("Error:")[1].split("</pre>")[0])
                        })
  }

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
    setTimeout(() => setLoading(false), 1500); // Replace with actual logic
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white font-[Inter]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-50 p-6 rounded-2xl shadow-xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#00A99D]">XploreNow</h1>
          <p className="text-gray-600 mt-1 text-sm">Explore. Experience. Evolve.</p>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            name="name"
            icon={User}
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
          <InputField
            label="Username"
            name="username"
            icon={User}
            value={form.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputField
            label="Phone Number"
            name="phone"
            icon={Phone}
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <InputField
            label="Email"
            name="email"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D] transition"
              />
            </div>
            {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={registerUser}
            className="w-full py-2 mt-2 bg-[#00A99D] text-white rounded-xl hover:bg-opacity-90 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-[#00A99D] font-medium hover:underline">
            Login
          </a>
        </div>
      </motion.div>

      <footer className="mt-8 text-xs text-gray-400 text-center">© 2025 XploreNow • Built with ❤️</footer>
    </div>
  );
}
