// src/pages/user/TripDetailsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../api/api";
import { LoaderIcon, XIcon, MapPinIcon, CalendarIcon, IndianRupeeIcon, StarIcon } from "lucide-react";
import TicketModal from "../../components/TicketModel";
import { useSelector, useDispatch } from "react-redux";

export default function TripDetailsPage() {
  // If you store tripId in the URL, use: const { tripId } = useParams();
  const tripData = useSelector((state) => state.trip);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tripId, setTripId] = useState(localStorage.getItem("tripId"));
  const [error, setError] = useState(null);

  /* Fetch trip details ----------------------------------------------------- */
  useEffect(() => {
    async function fetchTripDetails() {
      try {
        if (!tripId) throw new Error("No tripId found");
        const { data } = await api.get(`/trips/get-user/${tripId}`);
        setTrip(data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching trip details:", err);
        setError("Failed to load trip details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchTripDetails();
  }, [tripId]);

  const handleBooking = async () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    navigate("/home");
  };

  /* Loading / Error states ------------------------------------------------- */
  if (loading) {
    return (
      <div className="grid place-items-center h-screen bg-gradient-to-br from-[#00A99D]/5 to-[#31d6cb]/5">
        <div className="text-center">
          <LoaderIcon className="h-12 w-12 animate-spin text-[#00A99D] mx-auto mb-4" />
          <p className="text-slate-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 z-10 bg-white border-b shadow-sm p-3 md:p-4 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold text-[#00A99D]">
            Trip Details
          </div>
          <button onClick={handleClose} className="text-[#334155] hover:text-[#00A99D] transition-colors">
            <XIcon className="h-6 w-6" />
          </button>
        </header>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {error || "Trip details not found"}
            </h2>
            <p className="text-slate-600 mb-6">
              We couldn't load the trip information. Please try again or go back to browse other trips.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="bg-[#00A99D] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00A99D]/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex flex-col text-slate-800">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b shadow-sm p-3 md:p-4 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-bold text-[#00A99D]">
          Trip Details
        </div>
        <button onClick={handleClose} className="text-[#334155] hover:text-[#00A99D] transition-colors">
          <XIcon className="h-6 w-6" />
        </button>
      </header>

      <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ── Trip Card ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border rounded-2xl overflow-hidden shadow-xl bg-white"
        >
          {/* Hero Image */}
          <div className="relative">
            <img
              src={trip.images[0]?.imageUrl}
              alt={trip.title}
              className="w-full h-56 sm:h-64 md:h-80 lg:h-[28rem] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-6 md:p-8">
            {/* Title & Location */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                {trip.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-600 mb-3">
                <MapPinIcon className="h-4 w-4" />
                <span className="text-sm md:text-base">{trip.region}</span>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {trip.description}
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-r from-[#00A99D] to-[#31d6cb] text-white p-4 rounded-xl text-center">
                <CalendarIcon className="h-5 w-5 mx-auto mb-2" />
                <div className="text-lg font-bold">{trip.durationInDays}</div>
                <div className="text-xs opacity-90">Days</div>
              </div>
              <div className="bg-gradient-to-r from-[#334155] to-[#475569] text-white p-4 rounded-xl text-center">
                <StarIcon className="h-5 w-5 mx-auto mb-2" />
                <div className="text-lg font-bold">{trip.difficulty}</div>
                <div className="text-xs opacity-90">Level</div>
              </div>
              <div className="bg-gradient-to-r from-[#059669] to-[#10b981] text-white p-4 rounded-xl text-center">
                <IndianRupeeIcon className="h-5 w-5 mx-auto mb-2" />
                <div className="text-lg font-bold">{trip.price}</div>
                <div className="text-xs opacity-90">Per Person</div>
              </div>
              <div className="bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white p-4 rounded-xl text-center">
                <div className="text-lg font-bold">{trip.type}</div>
                <div className="text-xs opacity-90">Type</div>
              </div>
            </div>

            {/* Itinerary */}
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-[#00A99D]" />
                Itinerary
              </h2>
              <div className="space-y-4">
                {trip.itinerary.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 rounded-lg p-4 border-l-4 border-[#00A99D]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-[#00A99D] text-white text-xs font-bold px-2 py-1 rounded-full min-w-fit">
                        {item.day}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800 mb-1">{item.time}</div>
                        <div className="text-slate-600">{item.description}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Included & Excluded */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 text-green-700">
                  ✓ What's Included
                </h2>
                <div className="space-y-2">
                  {trip.included.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="text-green-600 font-bold text-sm mt-1">✓</div>
                      <span className="text-sm md:text-base text-slate-600">{inc}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 text-red-700">
                  ✗ What's Not Included
                </h2>
                <div className="space-y-2">
                  {trip.excluded.map((exc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="text-red-600 font-bold text-sm mt-1">✗</div>
                      <span className="text-sm md:text-base text-slate-600">{exc}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Tags */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {trip.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-[#475569] to-[#64748b] text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* ── Book Trip Button ───────────────────────────────────────── */}
            <div className="sticky bottom-4 z-10">
              <motion.button
                onClick={handleBooking}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full font-bold px-8 py-4 rounded-xl bg-gradient-to-r from-[#00A99D] to-[#31d6cb] text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book This Amazing Trip
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-slate-100 border-t text-xs md:text-sm py-6 px-4 text-center text-slate-500">
        © 2025 XploreNow. All rights reserved. | Follow us on{" "}
        <a href="#" className="text-[#00A99D] underline hover:text-[#31d6cb] transition-colors">
          Instagram
        </a>
      </footer>
    </div>
  );
}