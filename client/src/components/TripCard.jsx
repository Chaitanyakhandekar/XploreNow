import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTripData } from "../store/slices/tripSlice";
import { api } from "../api/api";

export const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tripData = useSelector(state => state.trip);

  const viewDetails = async (tripId) => {
    console.log(tripId);
    const response = await api
      .get(`/trips/get-user/${tripId}`)
      .then((res) => {
        console.log({
          tripId: res.data.data._id,
          tripAmount: res.data.data.price,
          totalBookings: 0
        });
        dispatch(setTripData({
          tripId: res.data.data._id,
          tripAmount: res.data.data.price,
          totalBookings: 0
        }));
      });

    localStorage.setItem("tripId", trip._id);
    localStorage.setItem("tripAmount", trip.price);
    localStorage.setItem("totalBookings", 0);

    navigate(`/view-details/${tripId}`);
  };

  const participantProgress = (trip.currentParticipants / trip.maxParticipants) * 100;
  const isAlmostFull = participantProgress >= 80;
  const isFull = trip.currentParticipants >= trip.maxParticipants;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-slate-200"
    >
      {/* Premium Badge */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-lg"
        >
          Featured
        </motion.div>
      </div>

      {/* Status Badge */}
      {(isAlmostFull || isFull) && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`${
              isFull 
                ? 'bg-red-500' 
                : 'bg-orange-500'
            } text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-lg`}
          >
            {isFull ? 'Full' : 'Almost Full'}
          </motion.div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={trip.images[0].imageUrl}
          alt={trip.title}
          className="w-full aspect-[3/2] object-cover transition-transform duration-300"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price Tag */}
        <div className="absolute bottom-4 right-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm text-slate-800 font-bold text-lg px-3 py-2 rounded-xl shadow-lg border border-white/20"
          >
            ₹{trip.price.toLocaleString()}
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#00A99D] transition-colors duration-300 line-clamp-2">
            {trip.title}
          </h3>
          <div className="flex items-center space-x-2 text-slate-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">{trip.region}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {trip.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: trip.difficulty, icon: '⚡' },
            { label: `${trip.durationInDays} Days`, icon: '📅' },
            { label: trip.type, icon: '🎯' }
          ].map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="inline-flex items-center space-x-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full hover:from-slate-200 hover:to-slate-300 transition-all duration-300"
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </motion.span>
          ))}
        </div>

        {/* Participants Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 font-medium">Participants</span>
            <span className={`font-semibold ${
              isFull ? 'text-red-600' : 
              isAlmostFull ? 'text-orange-600' : 
              'text-slate-700'
            }`}>
              {trip.currentParticipants} / {trip.maxParticipants}
            </span>
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${participantProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full rounded-full transition-all duration-300 ${
                isFull ? 'bg-red-500' :
                isAlmostFull ? 'bg-orange-500' :
                'bg-gradient-to-r from-[#00A99D] to-[#00D4AA]'
              }`}
            />
          </div>
        </div>

        {/* Action Button */}
        <div
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl text-center ${
            isFull 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#00A99D] to-[#00D4AA] hover:from-[#00D4AA] hover:to-[#00A99D] text-white hover:shadow-[#00A99D]/25'
          }`}
          >
         <Button
          onClick={() => viewDetails(trip._id)}
          disabled={isFull}
          className={`w-full  rounded-xl font-semibold text-sm transition-all duration-300 ${
            isFull 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#00A99D] to-[#00D4AA] hover:from-[#00D4AA] hover:to-[#00A99D] text-white hover:shadow-[#00A99D]/25'
          }`}
        >
          {isFull ? 'Trip Full' : 'View Details'}
        </Button>

        </div>
      </div>

      {/* Removed hover effect border */}
    </motion.div>
  );
};