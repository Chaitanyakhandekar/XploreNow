import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Eye, 
  Plus, 
  Edit3, 
  Trash2,
  Filter,
  Bell,
  Settings,
  LogOut,
  Search,
  TrendingUp,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  Sun,
  Moon
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTripFilter, setSelectedTripFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock data - replace with actual API calls
  const agencyData = {
    totalTrips: { upcoming: 15, ongoing: 8, completed: 142, cancelled: 3 },
    monthlyEarnings: 45780,
    totalParticipants: 1247,
    activeBookings: 23
  };

  const trips = [
    { id: 1, title: "Bali Adventure Package", destination: "Bali, Indonesia", price: 1299, status: "upcoming", participants: 12, startDate: "2025-08-15", image: "🏝️" },
    { id: 2, title: "European Capitals Tour", destination: "Europe", price: 2499, status: "ongoing", participants: 18, startDate: "2025-07-20", image: "🏰" },
    { id: 3, title: "Tokyo Cultural Experience", destination: "Tokyo, Japan", price: 1899, status: "upcoming", participants: 8, startDate: "2025-09-10", image: "🗾" },
    { id: 4, title: "Maldives Honeymoon", destination: "Maldives", price: 3299, status: "completed", participants: 4, startDate: "2025-06-01", image: "🏖️" },
    { id: 5, title: "Safari Kenya Adventure", destination: "Kenya", price: 2199, status: "cancelled", participants: 0, startDate: "2025-07-30", image: "🦁" }
  ];

  const bookings = [
    { id: 1, name: "Sarah Johnson", phone: "+1-555-0123", email: "sarah@email.com", tickets: 2, bookingDate: "2025-07-15", status: "confirmed" },
    { id: 2, name: "Mike Chen", phone: "+1-555-0456", email: "mike@email.com", tickets: 1, bookingDate: "2025-07-16", status: "pending" },
    { id: 3, name: "Emma Wilson", phone: "+1-555-0789", email: "emma@email.com", tickets: 3, bookingDate: "2025-07-17", status: "confirmed" },
    { id: 4, name: "David Brown", phone: "+1-555-0321", email: "david@email.com", tickets: 2, bookingDate: "2025-07-18", status: "confirmed" }
  ];

  const notifications = [
    { id: 1, message: "New booking for Bali Adventure Package", time: "2 min ago", type: "booking" },
    { id: 2, message: "Payment confirmed for Tokyo Cultural Experience", time: "15 min ago", type: "payment" },
    { id: 3, message: "Trip European Capitals Tour started", time: "2 hours ago", type: "trip" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      light: {
        'upcoming': 'bg-blue-100 text-blue-800',
        'ongoing': 'bg-green-100 text-green-800',
        'completed': 'bg-gray-100 text-gray-800',
        'cancelled': 'bg-red-100 text-red-800',
        'confirmed': 'bg-green-100 text-green-800',
        'pending': 'bg-yellow-100 text-yellow-800'
      },
      dark: {
        'upcoming': 'bg-blue-900/50 text-blue-300',
        'ongoing': 'bg-green-900/50 text-green-300',
        'completed': 'bg-gray-700/50 text-gray-300',
        'cancelled': 'bg-red-900/50 text-red-300',
        'confirmed': 'bg-green-900/50 text-green-300',
        'pending': 'bg-yellow-900/50 text-yellow-300'
      }
    };
    
    const mode = isDarkMode ? 'dark' : 'light';
    return colors[mode][status] || colors[mode]['completed'];
  };

  const filteredTrips = trips.filter(trip => {
    const matchesFilter = selectedTripFilter === 'all' || trip.status === selectedTripFilter;
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Theme classes
  const themeClasses = {
    background: isDarkMode 
      ? 'min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900'
      : 'min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50',
    header: isDarkMode 
      ? 'bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/60'
      : 'bg-white/80 backdrop-blur-lg border-b border-slate-200/60',
    text: isDarkMode ? 'text-gray-100' : 'text-[#334155]',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-[#334155]',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-slate-600',
    card: isDarkMode 
      ? 'bg-gray-800/60 backdrop-blur-lg border border-gray-700/60 hover:shadow-xl hover:shadow-gray-900/50'
      : 'bg-white/60 backdrop-blur-lg border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50',
    nav: isDarkMode 
      ? 'bg-gray-800/60 backdrop-blur-lg border border-gray-700/60'
      : 'bg-white/60 backdrop-blur-lg border border-slate-200/60',
    navActive: isDarkMode 
      ? 'bg-[#00A99D] text-white shadow-lg shadow-[#00A99D]/25'
      : 'bg-[#00A99D] text-white shadow-lg shadow-[#00A99D]/25',
    navInactive: isDarkMode 
      ? 'text-gray-300 hover:bg-gray-700/80 hover:text-[#00A99D]'
      : 'text-[#334155] hover:bg-white/80 hover:text-[#00A99D]',
    input: isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#00A99D] focus:border-transparent'
      : 'border-slate-200 focus:ring-2 focus:ring-[#00A99D] focus:border-transparent',
    button: isDarkMode 
      ? 'bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600'
      : 'bg-white border-slate-200 text-[#334155] hover:bg-slate-50',
    tableRow: isDarkMode 
      ? 'border-b border-gray-700 hover:bg-gray-700/50'
      : 'border-b border-slate-100 hover:bg-slate-50/50',
    tableHeader: isDarkMode 
      ? 'border-b border-gray-700'
      : 'border-b border-slate-200',
    notificationCard: isDarkMode 
      ? 'bg-gray-700/80 border border-gray-600'
      : 'bg-white/80 border border-slate-100'
  };

  return (
    <div className={themeClasses.background}>
      {/* Header */}
      <header className={`${themeClasses.header} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00A99D] to-cyan-500 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00A99D] to-cyan-600 bg-clip-text text-transparent">
                  XploreNow
                </h1>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Agency Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${themeClasses.button}`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              <div className="relative">
                <Bell className={`h-6 w-6 ${themeClasses.textSecondary} cursor-pointer hover:text-[#00A99D] transition-colors`} />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00A99D] to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className={`${themeClasses.textSecondary} font-medium`}>Travel Agency</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className={`flex space-x-1 ${themeClasses.nav} p-1 rounded-xl`}>
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'trips', label: 'Trip Management', icon: MapPin },
              { id: 'bookings', label: 'Booking Insights', icon: Calendar },
              { id: 'participants', label: 'Participants', icon: Users },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? themeClasses.navActive
                      : themeClasses.navInactive
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`${themeClasses.card} rounded-2xl p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${themeClasses.textMuted} text-sm font-medium`}>Total Trips</p>
                    <p className={`text-3xl font-bold ${themeClasses.text} mt-2`}>
                      {agencyData.totalTrips.upcoming + agencyData.totalTrips.ongoing + agencyData.totalTrips.completed}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center mt-4 space-x-4 text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {agencyData.totalTrips.upcoming} Upcoming
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {agencyData.totalTrips.ongoing} Ongoing
                  </span>
                </div>
              </div>

              <div className={`${themeClasses.card} rounded-2xl p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${themeClasses.textMuted} text-sm font-medium`}>Monthly Earnings</p>
                    <p className={`text-3xl font-bold ${themeClasses.text} mt-2`}>
                      ${agencyData.monthlyEarnings.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00A99D] to-emerald-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+12.5% from last month</span>
                </div>
              </div>

              <div className={`${themeClasses.card} rounded-2xl p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${themeClasses.textMuted} text-sm font-medium`}>Total Participants</p>
                    <p className={`text-3xl font-bold ${themeClasses.text} mt-2`}>
                      {agencyData.totalParticipants.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-purple-600 text-sm font-medium">Across all trips</span>
                </div>
              </div>

              <div className={`${themeClasses.card} rounded-2xl p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${themeClasses.textMuted} text-sm font-medium`}>Live Bookings</p>
                    <p className={`text-3xl font-bold ${themeClasses.text} mt-2`}>
                      {agencyData.activeBookings}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-600 text-sm font-medium">Active now</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${themeClasses.card} rounded-2xl p-6`}>
              <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#00A99D] to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-[#00A99D]/25 transition-all duration-300">
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Create New Trip</span>
                </button>
                <button className={`flex items-center space-x-3 p-4 ${themeClasses.button} rounded-xl transition-all duration-300`}>
                  <Eye className="h-5 w-5" />
                  <span className="font-medium">View All Bookings</span>
                </button>
                <button className={`flex items-center space-x-3 p-4 ${themeClasses.button} rounded-xl transition-all duration-300`}>
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Manage Participants</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trip Management Tab */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            {/* Header with Search and Filters */}
            <div className={`${themeClasses.card} rounded-2xl p-6`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Trip Management</h2>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      placeholder="Search trips..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 rounded-lg ${themeClasses.input}`}
                    />
                  </div>
                  <select
                    value={selectedTripFilter}
                    onChange={(e) => setSelectedTripFilter(e.target.value)}
                    className={`px-4 py-2 rounded-lg ${themeClasses.input}`}
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="px-6 py-2 bg-[#00A99D] text-white rounded-lg hover:bg-[#008a80] transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add New Trip</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trips Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className={`${themeClasses.card} rounded-2xl p-6 transition-all duration-300`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{trip.image}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>{trip.title}</h3>
                  <p className={`${themeClasses.textMuted} text-sm mb-4 flex items-center`}>
                    <MapPin className="h-4 w-4 mr-1 text-[#00A99D]" />
                    {trip.destination}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#00A99D]">${trip.price}</span>
                    <div className={`flex items-center text-sm ${themeClasses.textMuted}`}>
                      <Users className="h-4 w-4 mr-1" />
                      {trip.participants} participants
                    </div>
                  </div>
                  
                  <div className={`flex items-center text-sm ${themeClasses.textMuted} mb-4`}>
                    <Calendar className="h-4 w-4 mr-1" />
                    Starts: {new Date(trip.startDate).toLocaleDateString()}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-[#00A99D] text-white rounded-lg hover:bg-[#008a80] transition-colors flex items-center justify-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-slate-100 text-[#334155] hover:bg-slate-200'}`}>
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-red-900/50 text-red-300 hover:bg-red-800/50' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Participants Tab */}
        {activeTab === 'participants' && (
          <div className="space-y-6">
            <div className={`${themeClasses.card} rounded-2xl p-6`}>
              <h2 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>Participants Management</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={themeClasses.tableHeader}>
                      <th className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}>Name</th>
                      <th className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}>Contact</th>
                      <th className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}>Tickets</th>
                      <th className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}>Booking Date</th>
                      <th className={`text-left py-3 px-4 font-semibold ${themeClasses.text}`}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className={themeClasses.tableRow}>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#00A99D] to-cyan-500 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <span className={`font-medium ${themeClasses.text}`}>{booking.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className={`flex items-center text-sm ${themeClasses.textMuted}`}>
                              <Phone className="h-3 w-3 mr-2" />
                              {booking.phone}
                            </div>
                            <div className={`flex items-center text-sm ${themeClasses.textMuted}`}>
                              <Mail className="h-3 w-3 mr-2" />
                              {booking.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`font-semibold ${themeClasses.text}`}>{booking.tickets}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={themeClasses.textMuted}>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className={`${themeClasses.card} rounded-2xl p-6`}>
              <h2 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>Notifications</h2>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`flex items-start space-x-4 p-4 ${themeClasses.notificationCard} rounded-xl`}>
                    <div className="w-10 h-10 bg-gradient-to-r from-[#00A99D] to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {notification.type === 'booking' && <Calendar className="h-5 w-5 text-white" />}
                      {notification.type === 'payment' && <DollarSign className="h-5 w-5 text-white" />}
                      {notification.type === 'trip' && <MapPin className="h-5 w-5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`${themeClasses.text} font-medium`}>{notification.message}</p>
                      <p className={`${themeClasses.textMuted} text-sm mt-1`}>{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className={`${themeClasses.card} rounded-2xl p-6`}>
              <h2 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>Agency Settings</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Agency Name</label>
                    <input
                      type="text"
                      defaultValue="Travel Agency"
                      className={`w-full px-4 py-2 rounded-lg ${themeClasses.input}`}
                    />
                  </div>
                  <div
                    className={`w-full px-4 py-2 rounded-lg ${themeClasses.input}`}
                    >
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+1-555-0000"
                      className={`w-full px-4 py-2 rounded-lg ${themeClasses.input}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Support Email</label>
                    <input
                      type="email"
                      defaultValue="support@xplorenow.com"
                      className={`w-full px-4 py-2 rounded-lg ${themeClasses.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Agency Bio</label>
                  <textarea
                    rows="4"
                    defaultValue="We organize high-quality adventure and cultural trips around the world."
                    className={`w-full px-4 py-2 rounded-lg resize-none ${themeClasses.input}`}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button className="flex items-center space-x-2 px-6 py-2 bg-[#00A99D] text-white rounded-lg hover:bg-[#008a80] transition-colors">
                    <CheckCircle className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className={`${themeClasses.card} rounded-2xl p-6 border border-red-500`}>
              <h3 className={`text-lg font-semibold text-red-500 mb-4`}>Danger Zone</h3>
              <p className={`${themeClasses.textMuted} mb-4`}>
                If you no longer want to use this dashboard, you can logout or delete your agency account. This action is irreversible.
              </p>
              <div className="flex items-center space-x-4">
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2">
                  <XCircle className="h-4 w-4" />
                  <span>Delete Account</span>
                </button>
                <button className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${themeClasses.button}`}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
