import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Globe, ShieldCheck , Zap, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
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
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    
    // Password strength calculation
    if (e.target.name === 'password') {
      const password = e.target.value;
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      setPasswordStrength(strength);
    }
  };

  const registerUser = async () => {
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    
    setLoading(true);
    try {
      const response = await api
        .post("/users/register", {
          username: form.username,
          fullName: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone
        })
        .then((response) => {
          console.log(response);
          
          Swal.fire({
                          title: 'Registered Successfully.',
                          text: `You are now our Community Member`,
                          icon: 'success',
                          confirmButtonText: 'Ok',
                          timer: 2000,
                          showConfirmButton: false,
                          position: 'top-end',
                          toast: true
                      });

          navigate("/login");
        })
        .catch((response) => {
          console.log(response.response.data);
          alert(response.response.data.split("Error:")[1].split("</pre>")[0]);
        });
    } finally {
      setLoading(false);
    }
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
    registerUser();
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-yellow-500';
    if (passwordStrength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>


         <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
    style={{
      backgroundImage: 'url(https://i.pinimg.com/736x/d0/b7/6d/d0b76d22c5929d06a1880d092bd395ce.jpg)'
    }}
  ></div>

  {/* Mirror Reflection */}
  <div 
    className="absolute inset-x-0 bottom-[-100%] h-full bg-cover bg-center bg-no-repeat opacity-20 scale-y-[-1] blur-sm"
    style={{
      backgroundImage: 'url(https://i.pinimg.com/736x/d0/b7/6d/d0b76d22c5929d06a1880d092bd395ce.jpg)'
    }}
  ></div>

  {/* Optional fade overlay on reflection to make it more realistic */}
  <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white/30 via-white/10 to-transparent"></div>

        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
             <div className="w-12 h-12  rounded-xl flex items-center justify-center  bg-teal-500">
                <Globe className="w-6 h-6 " />
              </div>
              <span className="text-2xl text-white font-bold flex">Xplore<p className="text-teal-500">Now</p></span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight text-[#2aa89d]">
              Start your adventure journey today
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of explorers who trust XploreNow for their travel experiences across India.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white/80">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Verified travel experiences</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span>100% secure payments</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <Zap className="w-5 h-5 text-orange-300" />
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
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

          {/* Register Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Create your account</h2>
              <p className="text-slate-600">Join the adventure community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === 'name' ? 'text-[#00A99D]' : 'text-slate-400'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm
                      ${errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#00A99D] focus:ring-[#00A99D]/20'
                      } focus:outline-none focus:ring-4`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Username</label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === 'username' ? 'text-[#00A99D]' : 'text-slate-400'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm
                      ${errors.username 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#00A99D] focus:ring-[#00A99D]/20'
                      } focus:outline-none focus:ring-4`}
                    placeholder="Choose a username"
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.username}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === 'phone' ? 'text-[#00A99D]' : 'text-slate-400'
                  }`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm
                      ${errors.phone 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#00A99D] focus:ring-[#00A99D]/20'
                      } focus:outline-none focus:ring-4`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Email Address</label>
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

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Password</label>
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
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600">{getPasswordStrengthText()}</span>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === 'confirm' ? 'text-[#00A99D]' : 'text-slate-400'
                  }`}>
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirm')}
                    // ... continued from your code
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm
                      ${errors.confirm 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#00A99D] focus:ring-[#00A99D]/20'
                      } focus:outline-none focus:ring-4`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirm && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.confirm}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-gradient-to-r from-[#00A99D] to-[#00C4B8] hover:from-[#00C4B8] hover:to-[#00A99D] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">Registering...</span>
                  ) : (
                    <>
                      Sign Up
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm text-center text-slate-600 mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-[#00A99D] font-semibold hover:underline cursor-pointer"
                >
                  Sign In
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
