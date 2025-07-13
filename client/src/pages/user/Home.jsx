import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderIcon, SearchIcon, FilterIcon, XIcon } from "lucide-react";
import { api } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { TripCard } from "../../components/TripCard";
import { FilterSidebar } from "../../components/FilterSidebar";

export default function ExplorePage() {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    type: "",
    difficulty: "",
    region: "",
  });

  // mobile drawer toggle
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Fetch trips from backend */
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api
                                .get("/trips/all/")
                                .then((res)=>{
                                    console.log(res.data.data.allTrips)
                                    setTrips(res.data.data.allTrips);
                                     setFilteredTrips(res.data.data.allTrips);
                                })
        // if (data.success) {
        //   setTrips(data.data.allTrips);
        //   setFilteredTrips(data.data.allTrips);
        // }
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

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-bold text-[#00A99D]">XploreNow</div>

        <div className="flex w-full md:w-1/2 gap-2">
          <Input
            placeholder="Search destinations, trips, or regions..."
            className="flex-1"
          />
          <Button className="bg-[#334155]">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button className="bg-transparent text-[#334155] border border-[#334155]">
            Login
          </Button>
          <Button>Sign Up</Button>
        </div>
      </header>

      {/* Mobile filter button */}
      <div className="md:hidden px-4 pt-4">
        <Button
          className="w-full flex items-center justify-center gap-2 bg-[#334155]"
          onClick={() => setDrawerOpen(true)}
        >
          <FilterIcon className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Main Grid */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 px-4 py-6 max-w-10xl mx-auto w-full">
        {/* Desktop sidebar */}
        <aside className="hidden md:block md:w-1/4">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onApply={applyFilters}
          />
        </aside>

        {/* Trip cards */}
        <section className="w-full md:w-5/2">
          {loading ? (
            <div className="grid place-items-center h-64">
              <LoaderIcon className="h-8 w-8 animate-spin text-[#00A99D]" />
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              No trips found. Try adjusting your filters.
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </motion.div>
          )}
        </section>
      </div>

      {/* Mobile slide‑in filter panel */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b shadow-sm">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <XIcon className="h-6 w-6 text-slate-600" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onApply={applyFilters}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-100 border-t text-sm py-6 px-4 text-center text-slate-500">
        © 2025 XploreNow. All rights reserved. | Follow us on{" "}
        <a href="#" className="text-[#00A99D] underline">
          Instagram
        </a>
      </footer>
    </div>
  );
}
