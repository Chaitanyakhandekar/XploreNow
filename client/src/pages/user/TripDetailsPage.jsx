import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../api/api";
import { LoaderIcon, XIcon } from "lucide-react";
import axios from "axios";

/* ---------- Main Page ---------- */
export default function TripDetailsPage() {
  const { tripId } = useParams();
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);

  /* Fetch trip details from backend */
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios
                                    .get(`http://localhost:3000/api/v1/trips/get-user/${tripId}`)
                                    .then((res)=>{
                                        console.log(res.data)   
                                    })
        // const data = await response.json();
        // if (data.success) {
        //   setTrip(data.data);
        // }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails();
  }, [tripId]);

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
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm p-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-[#00A99D]">Trip Details</div>
        <a href="/" className="text-[#334155]">
          <XIcon className="h-6 w-6" />
        </a>
      </header>

      {/* Trip Details */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div layout className="border rounded-lg overflow-hidden shadow-lg bg-white">
          <img
            src={trip.images[0].imageUrl}
            alt={trip.title}
            className="w-full aspect-[3/2] object-cover"
          />
          <div className="p-4">
            <h1 className="text-2xl font-bold text-slate-800">{trip.title}</h1>
            <p className="text-sm text-slate-600 mb-2">{trip.region}</p>
            <p className="text-sm text-slate-500 mb-4">{trip.description}</p>

            <div className="flex flex-wrap gap-2 text-xs text-white mb-4">
              <span className="bg-[#334155] px-2 py-1 rounded">{trip.difficulty}</span>
              <span className="bg-[#334155] px-2 py-1 rounded">{trip.durationInDays} Days</span>
              <span className="bg-[#334155] px-2 py-1 rounded">₹{trip.price}</span>
              <span className="bg-[#334155] px-2 py-1 rounded">{trip.type}</span>
            </div>

            <h2 className="text-lg font-semibold text-slate-800 mb-2">Itinerary</h2>
            <ul className="list-disc list-inside mb-4">
              {trip.itinerary.map((item) => (
                <li key={item._id} className="text-sm text-slate-600">
                  {item.day} - {item.time}: {item.description}
                </li>
              ))}
            </ul>

            <h2 className="text-lg font-semibold text-slate-800 mb-2">Included</h2>
            <ul className="list-disc list-inside mb-4">
              {trip.included.map((item, index) => (
                <li key={index} className="text-sm text-slate-600">{item}</li>
              ))}
            </ul>

            <h2 className="text-lg font-semibold text-slate-800 mb-2">Excluded</h2>
            <ul className="list-disc list-inside mb-4">
              {trip.excluded.map((item, index) => (
                <li key={index} className="text-sm text-slate-600">{item}</li>
              ))}
            </ul>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-slate-800">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {trip.tags.map((tag, index) => (
                  <span key={index} className="bg-[#00A99D] text-white px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 border-t text-sm py-6 px-4 text-center text-slate-500">
        © 2025 XploreNow. All rights reserved. | Follow us on{" "}
        <a href="#" className="text-[#00A99D] underline">Instagram</a>
      </footer>
    </div>
  );
}
