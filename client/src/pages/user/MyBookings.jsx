import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, CreditCard, Filter, Search, Download, MoreVertical, CheckCircle } from 'lucide-react';
import { api } from '../../api/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock API response data
  

  useEffect(() => {
        const response = api
                        .get("/bookings/user-bookings/")
                        .then((response)=>{
                            console.log(response.data)
                            setBookings(response.data.data.userBookings);
                            setFilteredBookings(response.data.data.userBookings);
                        })
                        .catch((err)=>console.log(error.message))    
                        .finally(()=>{
                            setLoading(false)
                        })
   
  }, []);

  useEffect(() => {
    let filtered = bookings?.filter(booking => 
      booking.tripTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location[0].toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Sort bookings
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.bookingDate) - new Date(a.bookingDate);
        case 'oldest':
          return new Date(a.bookingDate) - new Date(b.bookingDate);
        case 'travel-date':
          return new Date(a.travelDate) - new Date(b.travelDate);
        case 'amount-high':
          return b.totalAmount - a.totalAmount;
        case 'amount-low':
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, sortBy]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTripImage = (title) => {
    const images = {
      'matheran trek': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      'kalsubai trek': 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=400&h=250&fit=crop',
      'switzerland': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop'
    };
    return images[title.toLowerCase()] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex space-x-4">
                    <div className="w-32 h-24 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 z-1">
      <div className="container mx-auto max-w-7xl ">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-br from-slate-50 to-blue-50">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage and track all your travel bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="container mx-auto px-4 py-8 max-w-7xl sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 ">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{bookings?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Trips</p>
                <p className="text-3xl font-bold text-emerald-600">{filteredBookings?.filter(b => b.status === 'booked').length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(bookings?.reduce((sum, booking) => sum + booking.totalAmount, 0) || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Next Trip</p>
                <p className="text-lg font-bold text-orange-600">Aug 11</p>
                <p className="text-sm text-gray-500">Kalsubai trek</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="booked">Booked</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="travel-date">Travel Date</option>
                <option value="amount-high">Amount (High to Low)</option>
                <option value="amount-low">Amount (Low to High)</option>
              </select>

              {/* Export Button */}
              <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings?.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Trip Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={getTripImage(booking.tripTitle)}
                      alt={booking.tripTitle}
                      className="w-full lg:w-32 h-32 lg:h-24 object-cover rounded-xl"
                    />
                  </div>

                  {/* Trip Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 capitalize">
                          {booking.tripTitle}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{booking.location[0]}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{booking.duration} day{booking.duration > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{booking.numPeople} {booking.numPeople > 1 ? 'people' : 'person'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Booked:</span> {formatDate(booking.bookingDate)}
                        </div>
                        <div>
                          <span className="font-medium">Travel Date:</span> {formatDate(booking.travelDate)}
                        </div>
                        <div>
                          <span className="font-medium">Booking ID:</span> #{booking.bookingId.slice(-8)}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{formatCurrency(booking.totalAmount)}</p>
                          <p className="text-sm text-emerald-600 font-medium">Payment Successful</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 mt-6 pt-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors">
                        Download Ticket
                      </button>
                      {booking.status === 'booked' && new Date(booking.travelDate) > new Date() && (
                        <button className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg font-medium transition-colors">
                          Cancel Booking
                        </button>
                      )}
                    </div>
                    
                    {booking.status === 'booked' && new Date(booking.travelDate) > new Date() && (
                      <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                        Modify Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(filteredBookings?.length  === 0 || bookings?.length === 0) && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Load More */}
        {bookings?.hasMore && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
              Load More Bookings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;