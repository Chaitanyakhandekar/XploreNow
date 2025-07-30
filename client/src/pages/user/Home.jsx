import { motion, AnimatePresence } from "framer-motion";
import { LoaderIcon, SearchIcon, FilterIcon, XIcon, SparklesIcon, GlobeIcon, TrendingUpIcon, BellIcon, UserIcon, MapIcon, HeartIcon, CalendarIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, MenuIcon, HomeIcon, CompassIcon, BookmarkIcon, CreditCardIcon, MessageSquareIcon, ShieldCheckIcon, AwardIcon } from "lucide-react";
import { api } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { TripCard } from "../../components/TripCard";
import { FilterSidebar } from "../../components/FilterSidebar";
import { useState,useEffect } from "react";

export default function ExplorePage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [serachToggle , setSearchToogle] = useState(false)
  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    type: "",
    difficulty: "",
    region: "",
    search:""
  });

  // mobile drawer toggle
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Navigation states
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "Trip Reminder", message: "Your trip to Paris starts in 2 days!", time: "2 hours ago", unread: true },
    { id: 2, title: "Booking Confirmed", message: "Your hotel booking has been confirmed", time: "1 day ago", unread: true },
    { id: 3, title: "New Destination", message: "Check out our new exotic locations", time: "3 days ago", unread: false },
  ]);
  const [unreadCount, setUnreadCount] = useState(2);

  /* Fetch trips from backend */
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api
                                .get("/trips/all")
                                .then((res)=>{
                                    console.log(res.data.data.allTrips)
                                    setTrips(res.data.data.allTrips);
                                     setFilteredTrips(res.data.data.allTrips);
                                })
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  /* Apply filters */
  const applyFilters = () => {
    const ft = trips.filter((t) => {
      const typeOk = !filters.type || t.type === filters.type;
      const diffOk = !filters.difficulty || t.difficulty === filters.difficulty;
      const regionOk = !filters.region || t.region === filters.region;
      return typeOk && diffOk && regionOk;
    });
    setFilteredTrips(ft);
    setDrawerOpen(false); // close on mobile
  };

  const searchByText = () =>{
      if(!(!search || search.trim() === "")){
          setFilters({...filters , search:search.trim()})
          setSearchToogle(!serachToggle)
      }
  }

  const handleSearchChange = (e)=>{
    setSearch(e.target.value)
    
    if(e.target.value.trim()===""){
      setFilters({...filters , search:null})
    }
  }

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, unread: false } : notif
      )
    );
    setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
  };

  const navigationItems = [
    { icon: HomeIcon, label: "Home", href: "/", active: true },
    { icon: CompassIcon, label: "Explore", href: "/explore", active: false },
    { icon: MapIcon, label: "My Trips", href: "/my-trips", active: false },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col text-slate-900 font-[Inter]">
      {/* Enhanced Header with glassmorphism effect */}
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

            {/* Logo with premium styling */}
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

            {/* Enhanced Search Bar - Hidden on mobile */}
            <div className="hidden md:flex w-full max-w-md gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-sm"></div>
                <Input
                  placeholder="Search destinations..."
                  className="relative bg-white/90 backdrop-blur-sm border-slate-200/50 rounded-2xl py-3 px-4 text-slate-700 placeholder-slate-500 shadow-lg shadow-slate-900/5 focus:shadow-xl focus:shadow-emerald-500/20 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all duration-300"
                  value={search}
                  onChange={(e)=>handleSearchChange(e)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <SearchIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>
              <Button 
                onClick={searchByText}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-3 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
              >
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <Button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 bg-white/90 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-slate-50 rounded-xl shadow-lg shadow-slate-900/5 hover:shadow-xl transition-all duration-300"
                >
                  <BellIcon className="h-5 w-5 text-red-500 font-bold" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{unreadCount}</span>
                    </div>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-2xl shadow-slate-900/10 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-slate-200/50">
                        <h3 className="font-semibold text-slate-800">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                              notification.unread ? 'bg-emerald-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.unread ? 'bg-emerald-500' : 'bg-slate-300'
                              }`} />
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-800">{notification.title}</h4>
                                <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-slate-50/50">
                        <Link 
                          to="/notifications"
                          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <Button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 bg-white/90 backdrop-blur-sm border border-slate-200/50 text-slate-700 hover:bg-slate-50 rounded-xl shadow-lg shadow-slate-900/5 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden sm:inline  text-gray-400 font-bold">Profile</span>
                </Button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-2xl shadow-slate-900/10 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-slate-200/50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">John Doe</h3>
                            <p className="text-sm text-slate-600">john@example.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        {profileMenuItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                          >
                            <item.icon className="h-4 w-4 text-slate-500" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-slate-200/50 py-2">
                        <button
                          onClick={async ()=> await api.get("/users/logout").then(()=>{navigate("/login")})}
                          className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOutIcon className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-4 flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-sm"></div>
              <Input
                placeholder="Search destinations..."
                className="relative bg-white/90 backdrop-blur-sm border-slate-200/50 rounded-2xl py-3 px-4 text-slate-700 placeholder-slate-500 shadow-lg shadow-slate-900/5"
                value={search}
                onChange={(e)=>handleSearchChange(e)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <SearchIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
            <Button 
              onClick={searchByText}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-2xl shadow-lg shadow-emerald-500/25"
            >
              <SearchIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6 border-b border-slate-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <GlobeIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      XploreNow
                    </div>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <XIcon className="h-6 w-6 text-slate-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        item.active
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-200/50">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Account</h3>
                  <div className="space-y-2">
                    {profileMenuItems.slice(0, 6).map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                      >
                        <item.icon className="h-5 w-5 text-slate-500" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Filter Button */}
      <div className="lg:hidden px-4 pt-6">
        <div className="flex gap-3">
          <Button
            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white py-4 rounded-2xl shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-300 font-semibold"
            onClick={() => setDrawerOpen(true)}
          >
            <FilterIcon className="h-5 w-5" />
            Advanced Filters
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold">
            <Link to="/register" className="flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4" />
              Sign Up
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Container with full width */}
      <div className="flex-1 w-full px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Desktop Sidebar - Full width layout */}
          <aside className="hidden lg:block lg:w-80 xl:w-96 lg:flex-shrink-0">
            <div className="sticky top-32">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-xl shadow-slate-900/5 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                    <FilterIcon className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Smart Filters</h2>
                </div>
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  setTrips={setTrips}
                  setFilteredTrips={setFilteredTrips}
                  serachToggle={serachToggle}
                  setSearchToogle={setSearchToogle}
                />
              </div>
            </div>
          </aside>

          {/* Enhanced Trip Cards Section - Full width */}
          <section className="flex-1 min-w-0">
            {loading ? (
              <div className="grid place-items-center h-96">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/25">
                    <LoaderIcon className="h-10 w-10 animate-spin text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-2xl blur-xl animate-pulse"></div>
                </div>
                <p className="mt-6 text-slate-600 font-medium">Loading amazing destinations...</p>
              </div>
            ) : filteredTrips.length === 0 ? (
              <div className="text-center py-24">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <SearchIcon className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">No trips found</h3>
                  <p className="text-slate-600">Try adjusting your filters or search terms to discover amazing destinations.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-slate-800">
                      Discover Amazing Trips
                    </h1>
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700  px-1 py-2 text-center w-[40%] rounded-full text-sm font-semibold border border-emerald-200">
                      {filteredTrips.length} results
                    </div>
                  </div>
                </div>

                {/* Enhanced Trip Grid - Responsive to full width */}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
                >
                  {filteredTrips.map((trip, index) => (
                    <motion.div
                      key={trip._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg shadow-slate-900/5 transition-all duration-300 transform overflow-hidden">
                        <TripCard trip={trip} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Enhanced Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white/95 backdrop-blur-xl border-l border-slate-200/50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                    <FilterIcon className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Smart Filters</h2>
                </div>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <XIcon className="h-6 w-6 text-slate-600" />
                </button>
              </div>
              <div className="p-6">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  setTrips={setTrips}
                  setFilteredTrips={setFilteredTrips}
                  serachToggle={serachToggle}
                  setSearchToogle={setSearchToogle}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
            {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-slate-200/50 shadow-inner shadow-slate-900/5 text-center py-6 px-4 text-sm text-slate-500 mt-auto">
        © 2025 <span className="font-semibold text-emerald-600">XploreNow</span>. All rights reserved.
        <span className="hidden sm:inline"> | Built with ❤️ for explorers</span>
      </footer>
    </div>
  );
}
