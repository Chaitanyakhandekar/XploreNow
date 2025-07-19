import React, { useState, useEffect } from 'react';
import Hero3D from '../../components/Hero3D';
import { 
  ChevronRight, 
  Search, 
  Shield, 
  Users, 
  MapPin, 
  Star, 
  CheckCircle, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Globe,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router';

const XploreNowLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.8s ease-out'
  };

  const staggerDelay = (index) => ({
    ...fadeInUp,
    transitionDelay: `${index * 0.1}s`
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-slate-700">Xplore</span>
                <span className="text-2xl font-bold text-teal-500">Now</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#how-it-works" className="text-slate-600 hover:text-teal-500 transition-colors">How it Works</a>
                <a href="#features" className="text-slate-600 hover:text-teal-500 transition-colors">Features</a>
                <a href="#agencies" className="text-slate-600 hover:text-teal-500 transition-colors">For Agencies</a>
                <button 
                onClick={()=>navigate("/register")}
                className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-teal-500"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#how-it-works" className="block px-3 py-2 text-slate-600 hover:text-teal-500">How it Works</a>
              <a href="#features" className="block px-3 py-2 text-slate-600 hover:text-teal-500">Features</a>
              <a href="#agencies" className="block px-3 py-2 text-slate-600 hover:text-teal-500">For Agencies</a>
              <button 
              onClick={()=>navigate("/register")}
              className="w-full text-left bg-teal-500 text-white px-3 py-2 rounded-md hover:bg-teal-600">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-slate-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div style={fadeInUp}>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                  Discover India's
                  <span className="text-teal-500 block">Hidden Adventures</span>
                </h1>
                <p className="text-xl text-slate-600 mt-6 leading-relaxed">
                  Connect with verified travel agencies and embark on curated treks and trips across India. 
                  From Sahyadri peaks to Northeast valleys – your next adventure awaits.
                </p>
              </div>
              
              <div style={staggerDelay(1)} className="flex flex-col sm:flex-row gap-4">
                <button 
                onClick={()=>navigate("/register")}
                className="bg-teal-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-600 transition-all transform hover:scale-105 flex items-center justify-center">
                  Explore Adventures
                  <ChevronRight className="ml-2" size={20} />
                </button>
                <button
                onClick={()=>navigate("/register-agency")}
                className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full font-semibold hover:border-teal-500 hover:text-teal-500 transition-all">
                  List Your Agency
                </button>
              </div>
              
              <div style={staggerDelay(2)} className="flex items-center space-x-8 text-sm text-slate-600">
                <div className="flex items-center">
                  <Shield className="text-teal-500 mr-2" size={16} />
                  Verified Agencies
                </div>
                <div className="flex items-center">
                  <Users className="text-teal-500 mr-2" size={16} />
                  10k+ Adventurers
                </div>
                <div className="flex items-center"> 
                  <MapPin className="text-teal-500 mr-2" size={16} />
                  All India Coverage
                </div>
              </div>
            </div>
            
            <div style={staggerDelay(3)} className="relative">
              <div className="bg-gradient-to-br from-teal-100 to-slate-100 rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-white" size={48} />
                  </div>
                  {/* <p className="text-slate-600 font-medium"><Hero3D/></p> */}
                  <p className="text-slate-500 text-sm mt-2">Interactive adventure showcase</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-slate-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How XploreNow Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to your next adventure
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="text-teal-500" size={32} />,
                title: "Discover",
                description: "Browse curated treks and trips from verified agencies across India"
              },
              {
                icon: <Shield className="text-teal-500" size={32} />,
                title: "Book Safely",
                description: "Secure one-click booking with transparent pricing and trusted partners"
              },
              {
                icon: <MapPin className="text-teal-500" size={32} />,
                title: "Adventure Awaits",
                description: "Track your booking and embark on unforgettable experiences"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-100 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features for Users */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Built for Adventurers</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to discover and book your perfect adventure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="text-teal-500" size={24} />,
                title: "AI-Powered Suggestions",
                description: "Get personalized trip recommendations based on your interests and preferences"
              },
              {
                icon: <CreditCard className="text-teal-500" size={24} />,
                title: "One-Click Booking",
                description: "Secure Razorpay integration for seamless payments and instant confirmations"
              },
              {
                icon: <Users className="text-teal-500" size={24} />,
                title: "Multi-Ticket Booking",
                description: "Book solo or with friends in a single checkout experience"
              },
              {
                icon: <Calendar className="text-teal-500" size={24} />,
                title: "Trip Dashboard",
                description: "Track bookings, view trip history, and manage payment status"
              },
              {
                icon: <Shield className="text-teal-500" size={24} />,
                title: "Verified Listings",
                description: "Only trusted agencies with verified credentials can list trips"
              },
              {
                icon: <Star className="text-teal-500" size={24} />,
                title: "Smart Filters",
                description: "Filter by region, difficulty, duration, price, and more"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features for Agencies */}
      <section id="agencies" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Empower Your Agency</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Grow your business with our comprehensive agency dashboard
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: <TrendingUp className="text-teal-500" size={20} />,
                  title: "Zero Upfront Fees",
                  description: "We earn only when you do - commission-based model with no hidden costs"
                },
                {
                  icon: <Users className="text-teal-500" size={20} />,
                  title: "Participant Management",
                  description: "Track participants, manage bookings, and handle payments effortlessly"
                },
                {
                  icon: <CheckCircle className="text-teal-500" size={20} />,
                  title: "Automated Alerts",
                  description: "SMS and WhatsApp notifications for booking confirmations and updates"
                },
                {
                  icon: <TrendingUp className="text-teal-500" size={20} />,
                  title: "Analytics Dashboard",
                  description: "View detailed participant data and booking insights per trip"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-800">Agency Dashboard</h4>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Total Bookings</span>
                    <span className="font-semibold text-teal-600">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Revenue</span>
                    <span className="font-semibold text-teal-600">₹4,89,320</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Active Trips</span>
                    <span className="font-semibold text-teal-600">12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Trusted by Adventurers</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See what our community has to say about their XploreNow experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Adventure Enthusiast",
                content: "XploreNow made booking my Himalayan trek so easy! The agencies are verified and the payment process was seamless.",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                role: "Travel Agency Owner",
                content: "Since joining XploreNow, our bookings have increased by 200%. The platform is user-friendly and the support is excellent.",
                rating: 5
              },
              {
                name: "Anita Patel",
                role: "Solo Traveler",
                content: "I love how the AI suggestions match my interests perfectly. Found amazing hidden gems in the Western Ghats!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Trusted Partner Agencies</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-slate-100 rounded-lg p-4 h-16 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Partner {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers discovering incredible experiences across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
            onClick={()=>navigate("/register")}
            className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors">
              Explore Adventures Now
            </button>
            <button 
            onClick={()=>navigate("/register-agency")}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              List Your Agency
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold">Xplore</span>
                <span className="text-2xl font-bold text-teal-400">Now</span>
              </div>
              <p className="text-slate-400">
                Connecting adventurers with trusted travel experiences across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Travelers</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-teal-400">Explore Trips</a></li>
                <li><a href="#" className="hover:text-teal-400">How it Works</a></li>
                <li><a href="#" className="hover:text-teal-400">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Agencies</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-teal-400">List Your Trips</a></li>
                <li><a href="#" className="hover:text-teal-400">Agency Dashboard</a></li>
                <li><a href="#" className="hover:text-teal-400">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-teal-400">Help Center</a></li>
                <li><a href="#" className="hover:text-teal-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 XploreNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default XploreNowLanding;