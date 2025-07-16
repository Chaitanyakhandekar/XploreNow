import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe, Shield, Zap } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { api } from "../../api/api";
import toast from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

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
    await loginUser();
  };

  const loginUser = async () => {
    try {
      const response = await axios
        .post("/api/v1/users/login", form)
        .then((response) => {
          navigate("/home");
        })
        .catch((response) => {
          alert(response.response.data.split("Error:")[1].split("</pre>")[0]);
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A99D] via-[#00C4B8] to-[#00D4C7]"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">XploreNow</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Welcome back to your next adventure
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Discover breathtaking destinations, book unforgettable experiences, and create memories that last a lifetime.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white/80">
              <Shield className="w-5 h-5" />
              <span>Secure & trusted platform</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <Zap className="w-5 h-5" />
              <span>Instant booking confirmation</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <Globe className="w-5 h-5" />
              <span>500+ destinations across India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00A99D] to-[#00C4B8] rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#00A99D]">XploreNow</span>
            </div>
            <p className="text-slate-600">Explore. Experience. Evolve.</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back</h2>
              <p className="text-slate-600">Sign in to continue your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-[#00A99D]' : 'text-slate-400'
                  }`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm
                      ${errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#00A99D] focus:ring-[#00A99D]/20'
                      } focus:outline-none focus:ring-4`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === 'password' ? 'text-[#00A99D]' : 'text-slate-400'
                  }`}>
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm
                      ${errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#00A99D] focus:ring-[#00A99D]/20'
                      } focus:outline-none focus:ring-4`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-[#00A99D] hover:text-[#00948A] transition-colors duration-200">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00A99D] to-[#00C4B8] text-white py-3 rounded-xl font-semibold 
                  hover:from-[#00948A] hover:to-[#00A99D] transition-all duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg hover:shadow-xl hover:shadow-[#00A99D]/25
                  flex items-center justify-center space-x-2 group"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Don't have an account?{" "}
                <a 
                  href="/register" 
                  className="text-[#00A99D] hover:text-[#00948A] font-semibold transition-colors duration-200"
                >
                  Create account
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              © 2025 XploreNow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}