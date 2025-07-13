import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

export const TripCard = ({ trip }) => (
  <motion.div
    layout
    className="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition cursor-pointer"
  >
    <img
      src={trip.images[0].imageUrl}
      alt={trip.title}
      className="w-full aspect-[3/2] object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-slate-800">{trip.title}</h3>
      <p className="text-sm text-slate-600 mb-1">{trip.region}</p>
      <p className="text-sm text-slate-500 line-clamp-2">{trip.description}</p>

      <div className="mt-2 flex flex-wrap gap-2 text-xs text-white">
        <span className="bg-[#334155] px-2 py-1 rounded">
          {trip.difficulty}
        </span>
        <span className="bg-[#334155] px-2 py-1 rounded">
          {trip.durationInDays} Days
        </span>
        <span className="bg-[#334155] px-2 py-1 rounded">₹{trip.price}</span>
        <span className="bg-[#334155] px-2 py-1 rounded">{trip.type}</span>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        {trip.currentParticipants} / {trip.maxParticipants} Participants
      </div>
      <Link
            to={`/view-details/${trip._id}`}
            className="block mt-3 w-full text-sm px-4 py-2 rounded bg-[#00A99D] text-white text-center hover:bg-opacity-90"
            >
            View Details
        </Link>
    </div>
  </motion.div>
);