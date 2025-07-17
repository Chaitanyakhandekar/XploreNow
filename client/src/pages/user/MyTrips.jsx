import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Filter,
  Search,
  ChevronDown,
  MoreHorizontal,
  Download,
  Share2,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronRight,
  Heart,
  Camera,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  Bell,
  User
} from 'lucide-react';

const MyTripsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.6s ease-out'
  };

  const staggerDelay = (index) => ({
    ...fadeInUp,
    transitionDelay: `${index * 0.1}s`
  });

  // Sample trip data
  const trips = [
    {
      id: 1,
      title: "Himalayan Base Camp Trek",
      location: "Himachal Pradesh",
      agency: "Mountain Explorers",
      dates: "Dec 15-22, 2024",
      duration: "7 Days",
      participants: 12,
      maxParticipants: 15,
      price: "₹18,500",
      status: "confirmed",
      difficulty: "Moderate",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "upcoming",
      bookingDate: "Nov 20, 2024",
      highlights: ["Professional Guide", "Equipment Included", "Group Medical Insurance"]
    },
    {
      id: 2,
      title: "Goa Beach Retreat",
      location: "Goa",
      agency: "Coastal Adventures",
      dates: "Nov 10-14, 2024",
      duration: "4 Days",
      participants: 8,
      maxParticipants: 10,
      price: "₹12,000",
      status: "completed",
      difficulty: "Easy",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      category: "past",
      bookingDate: "Oct 15, 2024",
      highlights: ["Beachfront Stay", "Water Sports", "Sunset Cruise"]
    },
    {
      id: 3,
      title: "Sahyadri Monsoon Trek",
      location: "Maharashtra",
      agency: "Western Ghats Trekkers",
      dates: "Aug 25-27, 2024",
      duration: "3 Days",
      participants: 6,
      maxParticipants: 8,
      price: "₹8,500",
      status: "completed",
      difficulty: "Moderate",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "past",
      bookingDate: "Aug 10, 2024",
      highlights: ["Monsoon Special", "Local Cuisine", "Photography Workshop"]
    },
    {
      id: 4,
      title: "Rajasthan Desert Safari",
      location: "Rajasthan",
      agency: "Desert Wanderers",
      dates: "Jan 15-20, 2025",
      duration: "5 Days",
      participants: 2,
      maxParticipants: 12,
      price: "₹22,000",
      status: "pending",
      difficulty: "Easy",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
      category: "upcoming",
      bookingDate: "Dec 01, 2024",
      highlights: ["Camel Safari", "Desert Camping", "Cultural Shows"]
    },
    {
      id: 5,
      title: "Kerala Backwaters",
      location: "Kerala",
      agency: "South India Tours",
      dates: "Mar 10-15, 2025",
      duration: "5 Days",
      participants: 4,
      maxParticipants: 6,
      price: "₹15,000",
      status: "waitlisted",
      difficulty: "Easy",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop",
      category: "upcoming",
      bookingDate: "Dec 05, 2024",
      highlights: ["Houseboat Stay", "Ayurvedic Spa", "Traditional Cuisine"]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'waitlisted': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle size={16} className="text-green-600" />;
      case 'pending': return <Clock size={16} className="text-yellow-600" />;
      case 'waitlisted': return <AlertCircle size={16} className="text-orange-600" />;
      case 'completed': return <CheckCircle size={16} className="text-blue-600" />;
      case 'cancelled': return <XCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Moderate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredTrips = trips.filter(trip => {
    const matchesTab = activeTab === 'all' || trip.category === activeTab;
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs = [
    { id: 'all', label: 'All Trips', count: trips.length },
    { id: 'upcoming', label: 'Upcoming', count: trips.filter(t => t.category === 'upcoming').length },
    { id: 'past', label: 'Past Trips', count: trips.filter(t => t.category === 'past').length }
  ];

  if (selectedTrip) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedTrip(null)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{selectedTrip.title}</h1>
                  <p className="text-sm text-gray-500">{selectedTrip.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trip Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={selectedTrip.image} 
                  alt={selectedTrip.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTrip.status)}`}>
                    {selectedTrip.status.charAt(0).toUpperCase() + selectedTrip.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Trip Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="text-gray-400 mr-3" size={16} />
                        <span className="text-gray-600">{selectedTrip.dates}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-gray-400 mr-3" size={16} />
                        <span className="text-gray-600">{selectedTrip.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="text-gray-400 mr-3" size={16} />
                        <span className="text-gray-600">{selectedTrip.participants}/{selectedTrip.maxParticipants} participants</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="text-gray-400 mr-3" size={16} />
                        <span className="text-gray-600">{selectedTrip.location}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h3>
                    <div className="space-y-2">
                      {selectedTrip.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="text-teal-500 mr-2" size={16} />
                          <span className="text-gray-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Agency Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Agency</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                      <Globe className="text-teal-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedTrip.agency}</p>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current mr-1" size={14} />
                        <span className="text-sm text-gray-600">{selectedTrip.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      <Phone size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      <Mail size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      <MessageCircle size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per person</span>
                    <span className="font-medium">{selectedTrip.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-medium">{selectedTrip.participants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Date</span>
                    <span className="font-medium">{selectedTrip.bookingDate}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="font-semibold text-teal-600">
                        ₹{parseInt(selectedTrip.price.replace('₹', '').replace(',', '')) * selectedTrip.participants}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors">
                    Contact Agency
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Download className="mr-2" size={16} />
                    Download Voucher
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Camera className="mr-2" size={16} />
                    Trip Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
              <span className="ml-3 bg-teal-100 text-teal-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {trips.length}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div style={fadeInUp} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setFilterDropdown(!filterDropdown)}
                className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="mr-2" size={16} />
                Filter
                <ChevronDown className="ml-2" size={16} />
              </button>
              {filterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Filter by Status</h4>
                    <div className="space-y-2">
                      {['confirmed', 'pending', 'completed', 'waitlisted'].map(status => (
                        <label key={status} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-700 capitalize">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={staggerDelay(1)} className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip, index) => (
            <div 
              key={trip.id}
              style={staggerDelay(index + 2)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => setSelectedTrip(trip)}
            >
              <div className="relative">
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {trip.title}
                  </h3>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current mr-1" size={14} />
                    <span className="text-sm text-gray-600">{trip.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2" size={14} />
                    {trip.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2" size={14} />
                    {trip.dates}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-2" size={14} />
                    {trip.participants}/{trip.maxParticipants} participants
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(trip.difficulty)}`}>
                      {trip.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{trip.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-900">{trip.price}</span>
                    <ChevronRight className="ml-2 text-gray-400 group-hover:text-teal-500 transition-colors" size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
              Explore New Trips
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTripsPage;