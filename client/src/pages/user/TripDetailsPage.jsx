// src/pages/user/TripDetailsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../api/api";          // ← your Axios instance
import { LoaderIcon, XIcon } from "lucide-react";
import TicketModal from "../../components/TicketModel";
import { useSelector, useDispatch } from "react-redux";



export default function TripDetailsPage() {
  // If you store tripId in the URL, use:  const { tripId } = useParams();
  const tripData = useSelector((state)=>state.trip);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [trip, setTrip]     = useState(null);
  const [isOpen , setIsOpen] = useState(false)
  const [tripId,setTripId] = useState(localStorage.getItem("tripId"))


  /* Fetch trip details ----------------------------------------------------- */
  useEffect(() => {
    async function fetchTripDetails() {
      try {
        if (!tripId) throw new Error("No tripId found");
        const { data } = await api.get(`/trips/get-user/${tripId}`);
        setTrip(data.data);                    // adjust if your API shape differs
      } catch (err) {
        console.error("Error fetching trip details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTripDetails();
  }, [tripId]);

  

  const handleBooking = async ()=>{
       setIsOpen(true)
  }

  /* Loading / Error states ------------------------------------------------- */
  if (loading) {
    return (
      <div className="grid place-items-center h-screen">
        <LoaderIcon className="h-8 w-8 animate-spin text-[#00A99D]" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center text-gray-500 py-16">
        Trip details not found.
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-800">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm p-3 md:p-4 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-bold text-[#00A99D]">
          Trip Details
        </div>
        <a href="/home" className="text-[#334155]">
          <XIcon className="h-6 w-6" />
        </a>
      </header>

      <TicketModal isOpen={isOpen} setIsOpen={setIsOpen}/>

      {/* ── Trip Card ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <motion.div
          layout
          className="border rounded-xl overflow-hidden shadow-lg bg-white"
        >
          <img
            src={trip.images[0]?.imageUrl}
            alt={trip.title}
            className="w-full h-56 sm:h-64 md:h-80 lg:h-[28rem] object-cover"
          />

          <div className="p-4 md:p-6">
            {/* Title & basic info */}
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              {trip.title}
            </h1>
            <p className="text-sm text-slate-600 mb-1 md:mb-2">
              {trip.region}
            </p>
            <p className="text-sm md:text-base text-slate-500 mb-4">
              {trip.description}
            </p>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 text-xs md:text-sm text-white mb-4">
              <span className="bg-[#334155] px-2 py-1 rounded">
                {trip.difficulty}
              </span>
              <span className="bg-[#334155] px-2 py-1 rounded">
                {trip.durationInDays} Days
              </span>
              <span className="bg-[#334155] px-2 py-1 rounded">
                ₹{trip.price}
              </span>
              <span className="bg-[#334155] px-2 py-1 rounded">{trip.type}</span>
            </div>

            {/* Itinerary */}
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Itinerary
            </h2>
            <ul className="list-disc list-inside space-y-1 mb-6">
              {trip.itinerary.map((item) => (
                <li
                  key={item._id}
                  className="text-sm md:text-base text-slate-600"
                >
                  <span className="font-medium">{item.day}</span> – {item.time}:{" "}
                  {item.description}
                </li>
              ))}
            </ul>

            {/* Included */}
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Included
            </h2>
            <ul className="list-disc list-inside space-y-1 mb-6">
              {trip.included.map((inc, i) => (
                <li key={i} className="text-sm md:text-base text-slate-600">
                  {inc}
                </li>
              ))}
            </ul>

            {/* Excluded */}
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Excluded
            </h2>
            <ul className="list-disc list-inside space-y-1 mb-6">
              {trip.excluded.map((exc, i) => (
                <li key={i} className="text-sm md:text-base text-slate-600">
                  {exc}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {trip.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#979999] text-white px-2 py-1 rounded text-xs md:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* ── Book Trip Button ───────────────────────────────────────── */}
            <button
              onClick={handleBooking}
              className="w-full md:w-auto font-bold px-6 py-3 rounded bg-[#31d6cb] text-white text-sm md:text-base hover:bg-opacity-90 transition"
            >
              Book Trip
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-slate-100 border-t text-xs md:text-sm py-6 px-4 text-center text-slate-500">
        © 2025 XploreNow. All rights reserved. | Follow us on{" "}
        <a href="#" className="text-[#00A99D] underline">
          Instagram
        </a>
      </footer>
    </div>
  );
}
