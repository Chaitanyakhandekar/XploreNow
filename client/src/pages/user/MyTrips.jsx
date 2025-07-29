import { motion, AnimatePresence } from "framer-motion";
import { 
  LoaderIcon, SearchIcon, FilterIcon, XIcon, SparklesIcon, GlobeIcon, 
  TrendingUpIcon, BellIcon, UserIcon, MapIcon, HeartIcon, CalendarIcon, 
  SettingsIcon, HelpCircleIcon, LogOutIcon, MenuIcon, HomeIcon, CompassIcon, 
  BookmarkIcon, CreditCardIcon, MessageSquareIcon, ShieldCheckIcon, AwardIcon,
  PlusIcon, EditIcon, TrashIcon, EyeIcon, ShareIcon, DownloadIcon, 
  MapPinIcon, ClockIcon, UsersIcon, StarIcon, CheckCircleIcon, 
  AlertCircleIcon, PlayIcon, PauseIcon, DollarSignIcon, CameraIcon,ListIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { TripCard } from "../../components/TripCard";

export default function MyTripsPage() {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  
  // Navigation states (same as explore page)
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "Trip Reminder", message: "Your trip to Paris starts in 2 days!", time: "2 hours ago", unread: true },
    { id: 2, title: "Booking Confirmed", message: "Your hotel booking has been confirmed", time: "1 day ago", unread: true },
    { id: 3, title: "New Destination", message: "Check out our new exotic locations", time: "3 days ago", unread: false },
  ]);
  const [unreadCount, setUnreadCount] = useState(2);

  const statusFilters = [
    { key: "all", label: "All Trips", count: 0 },
    { key: "upcoming", label: "Upcoming", count: 0 },
    { key: "ongoing", label: "Ongoing", count: 0 },
    { key: "completed", label: "Completed", count: 0 },
    { key: "cancelled", label: "Cancelled", count: 0 },
  ];

  const sortOptions = [
    { key: "date", label: "By Date" },
    { key: "alphabetical", label: "Alphabetical" },
    { key: "price", label: "By Price" },
    { key: "rating", label: "By Rating" },
  ];

  // Fetch user trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips/user-trips/");
        console.log(response.data)
        setTrips(response.data.data.userTrips);
        setFilteredTrips(response.data.data.userTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // Update filter counts
  useEffect(() => {
    statusFilters.forEach(filter => {
      if (filter.key === "all") {
        filter.count = trips.length;
      } else {
        filter.count = trips.filter(trip => trip.status === filter.key).length;
      }
    });
  }, [trips]);


  // Filter and sort trips
  useEffect(() => {
    let filtered = trips;

    // Apply status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(trip => trip.status === activeFilter);
    }

    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(trip => 
        trip.title.toLowerCase().includes(search.toLowerCase()) ||
        trip.destination.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "alphabetical":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "date":
      default:
        filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        break;
    }

    setFilteredTrips(filtered);
  }, [trips, activeFilter, search, sortBy]);

  const handleNotificationClick = (notificationId) => {
    // Same as explore page
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "ongoing":
        return "bg-green-100 text-green-700 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <ClockIcon className="h-3 w-3" />;
      case "ongoing":
        return <PlayIcon className="h-3 w-3" />;
      case "completed":
        return <CheckCircleIcon className="h-3 w-3" />;
      case "cancelled":
        return <AlertCircleIcon className="h-3 w-3" />;
      default:
        return <ClockIcon className="h-3 w-3" />;
    }
  };

  const navigationItems = [
    { icon: HomeIcon, label: "Home", href: "/", active: false },
    { icon: CompassIcon, label: "Explore", href: "/explore", active: false },
    { icon: MapIcon, label: "My Trips", href: "/my-trips", active: true },
    { icon: BookmarkIcon, label: "Wishlist", href: "/wishlist", active: false },
    { icon: CreditCardIcon, label: "Bookings", href: "/bookings", active: false },
  ];

  const profileMenuItems = [
    { icon: UserIcon, label: "Profile", href: "/profile" },
    { icon: MapIcon, label: "My Trips", href: "/my-trips" },
    { icon: HeartIcon, label: "Wishlist", href: "/wishlist" },
    { icon: CalendarIcon, label: "Bookings", href: "/bookings" },
    { icon: CreditCardIcon, label: "Payment Methods", href: "/payment" },
    { icon: MessageSquareIcon, label: "Messages", href: "/messages" },
    { icon: AwardIcon, label: "Rewards", href: "/rewards" },
    { icon: SettingsIcon, label: "Settings", href: "/settings" },
    { icon: HelpCircleIcon, label: "Help & Support", href: "/help" },
    { icon: ShieldCheckIcon, label: "Privacy", href: "/privacy" },
  ];

  // const TripCard = ({ trip, index }) => (
  //   <motion.div
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     transition={{ delay: index * 0.1 }}
  //     className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg shadow-slate-900/5 overflow-hidden hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 group"
  //   >
  //     <div className="relative">
  //       <img 
  //         src={trip.images[0].imageUrl} 
  //         alt={trip.title}
  //         className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
  //       />
  //       <div className="absolute top-4 left-4">
  //         <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(trip.status)}`}>
  //           {getStatusIcon(trip.status)}
  //           {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
  //         </div>
  //       </div>
  //       <div className="absolute top-4 right-4">
  //         <div className="flex gap-2">
  //           <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
  //             <ShareIcon className="h-4 w-4 text-slate-600" />
  //           </button>
  //           <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
  //             <DownloadIcon className="h-4 w-4 text-slate-600" />
  //           </button>
  //         </div>
  //       </div>
  //       {trip.status === "completed" && trip.rating > 0 && (
  //         <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
  //           <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
  //           <span className="text-sm font-semibold text-slate-700">{trip.rating}</span>
  //         </div>
  //       )}
  //     </div>
      
  //     <div className="p-6">
  //       <div className="flex items-start justify-between mb-3">
  //         <div className="flex-1">
  //           <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1">{trip.title}</h3>
  //           <div className="flex items-center gap-1 text-slate-600 mb-2">
  //             <MapPinIcon className="h-4 w-4" />
  //             <span className="text-sm">{trip.destination}</span>
  //           </div>
  //         </div>
  //         <div className="text-right">
  //           <div className="text-2xl font-bold text-emerald-600">${trip.price}</div>
  //           <div className="text-xs text-slate-500">per person</div>
  //         </div>
  //       </div>
        
  //       <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
  //         <div className="flex items-center gap-1 text-slate-600">
  //           <CalendarIcon className="h-4 w-4" />
  //           <span>{trip.duration}</span>
  //         </div>
  //         <div className="flex items-center gap-1 text-slate-600">
  //           <UsersIcon className="h-4 w-4" />
  //           <span>{trip.participants} people</span>
  //         </div>
  //         <div className="flex items-center gap-1 text-slate-600">
  //           <ClockIcon className="h-4 w-4" />
  //           <span>{new Date(trip.startDate).toLocaleDateString()}</span>
  //         </div>
  //       </div>
        
  //       <p className="text-slate-600 text-sm mb-4 line-clamp-2">{trip.description}</p>
        
  //       {/* <div className="flex flex-wrap gap-2 mb-4">
  //         {trip.activities.slice(0, 3).map((activity, idx) => (
  //           <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
  //             {activity}
  //           </span>
  //         ))}
  //         {trip.activities.length > 3 && (
  //           <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
  //             +{trip.activities.length - 3} more
  //           </span>
  //         )}
  //       </div> */}
        
  //       <div className="flex gap-2">
  //         <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30">
  //           <EyeIcon className="h-4 w-4 inline mr-2" />
  //           View Details
  //         </button>
  //         <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
  //           <EditIcon className="h-4 w-4 text-slate-600" />
  //         </button>
  //         {trip.status === "upcoming" && (
  //           <button className="p-2 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
  //             <TrashIcon className="h-4 w-4 text-red-600" />
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   </motion.div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col text-slate-900 font-[Inter]">
      {/* Enhanced Header - Same as explore page */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-lg shadow-slate-900/5">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <MenuIcon className="h-6 w-6 text-slate-600" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <GlobeIcon className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                XploreNow
              </div>
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
                <SparklesIcon className="h-3 w-3 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">PRO</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                    item.active
                      ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex w-full max-w-md">
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-sm"></div>
                <input
                  type="text"
                  placeholder="Search your trips..."
                  className="relative w-full bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl py-3 px-4 pl-12 text-slate-700 placeholder-slate-500 shadow-lg shadow-slate-900/5 focus:shadow-xl focus:shadow-emerald-500/20 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all duration-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Right side actions - Same as explore page */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 bg-white/90 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-slate-50 rounded-xl shadow-lg shadow-slate-900/5 hover:shadow-xl transition-all duration-300"
                >
                  <BellIcon className="h-5 w-5 text-red-500 font-bold" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{unreadCount}</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 bg-white/90 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-slate-50 rounded-xl shadow-lg shadow-slate-900/5 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden sm:inline text-gray-400 font-bold">Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-sm"></div>
              <input
                type="text"
                placeholder="Search your trips..."
                className="relative w-full bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl py-3 px-4 pl-12 text-slate-700 placeholder-slate-500 shadow-lg shadow-slate-900/5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">My Trips</h1>
              <p className="text-slate-600">Manage and track all your travel adventures</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/explore"
                className="flex items-center lg:text-md  gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
              >
                <PlusIcon className="lg:h-5 lg:w-5 sm:h-10 sm:w-10" />
                <p className="lg:block hidden">Book New Trip</p>
              </Link>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {statusFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200'
                    : 'bg-white/80 text-slate-600 hover:bg-slate-50 border border-slate-200/50'
                }`}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    activeFilter === filter.key 
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl px-4 py-2 text-slate-700 shadow-lg shadow-slate-900/5 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300"
              >
                {sortOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                {filteredTrips.length} trips found
                           </span>
              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="p-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-lg hover:bg-slate-100 transition-all duration-300"
              >
                {viewMode === "grid" ? (
                  <ListIcon className="h-4 w-4 text-slate-600" />
                ) : (
                  <GridIcon className="h-4 w-4 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Trip List */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoaderIcon className="animate-spin w-8 h-8 text-emerald-600" />
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-lg">
            No trips found matching your filters.
          </div>
        ) : (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                : "grid-cols-1 gap-4"
            }`}
          >
            <AnimatePresence>
              {filteredTrips.map((trip, index) => (
                <TripCard key={index} trip={trip} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
