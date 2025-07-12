import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderIcon, SearchIcon, FilterIcon, XIcon } from "lucide-react";

/* ---------- Tiny UI atoms ---------- */
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded bg-[#00A99D] text-white hover:bg-opacity-90 disabled:opacity-60 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#00A99D] ${className}`}
    {...props}
  />
);

const Select = ({ className = "", children, ...props }) => (
  <select
    className={`w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00A99D] ${className}`}
    {...props}
  >
    {children}
  </select>
);

/* ---------- Trip Card ---------- */
const TripCard = ({ trip }) => (
  <motion.div
    layout
    className="border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition"
  >
    <img
      src={trip.image}
      alt={trip.name}
      className="w-full aspect-[3/2] object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-slate-800">{trip.name}</h3>
      <p className="text-sm text-slate-600 mb-1">{trip.region}</p>
      <p className="text-sm text-slate-500 line-clamp-2">{trip.description}</p>

      <div className="mt-2 flex flex-wrap gap-2 text-xs text-white">
        <span className="bg-[#334155] px-2 py-1 rounded">
          {trip.difficulty}
        </span>
        <span className="bg-[#334155] px-2 py-1 rounded">
          {trip.duration} Days
        </span>
        <span className="bg-[#334155] px-2 py-1 rounded">₹{trip.price}</span>
        <span className="bg-[#334155] px-2 py-1 rounded">{trip.type}</span>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        {trip.agency} · ⭐ {trip.rating.toFixed(1)}
      </div>
      <Button className="mt-3 w-full text-sm">View Details</Button>
    </div>
  </motion.div>
);

/* ---------- Filter Form ---------- */
const FilterSidebar = ({ filters, setFilters, onApply }) => (
  <div className="space-y-4 text-sm">
    <h2 className="font-semibold text-lg text-slate-800">Filters</h2>

    <div>
      <label className="block mb-1 text-slate-700">Type</label>
      <Select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="">All</option>
        <option value="Trek">Trek</option>
        <option value="Safari">Safari</option>
        <option value="Expedition">Expedition</option>
      </Select>
    </div>

    <div>
      <label className="block mb-1 text-slate-700">Difficulty</label>
      <Select
        value={filters.difficulty}
        onChange={(e) =>
          setFilters({ ...filters, difficulty: e.target.value })
        }
      >
        <option value="">All</option>
        <option value="Easy">Easy</option>
        <option value="Moderate">Moderate</option>
        <option value="Hard">Hard</option>
      </Select>
    </div>

    <div>
      <label className="block mb-1 text-slate-700">Region / Category</label>
      <Select
        value={filters.region}
        onChange={(e) => setFilters({ ...filters, region: e.target.value })}
      >
        <option value="">All</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
      </Select>
    </div>

    <Button className="w-full" onClick={onApply}>
      Apply Filters
    </Button>
  </div>
);

/* ---------- Mock Trips (replace with API data) ---------- */
const tripsMock = [
  {
    id: 1,
    name: "Valley of Flowers Trek",
    region: "Uttarakhand",
    image: "https://source.unsplash.com/600x400/?mountains,trek",
    description:
      "A breathtaking trek through the UNESCO world heritage site.",
    difficulty: "Moderate",
    duration: 6,
    price: 8500,
    type: "Trek",
    agency: "MountainSeekers",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Ranthambore Wildlife Safari",
    region: "Rajasthan",
    image: "https://source.unsplash.com/600x400/?tiger,safari",
    description:
      "Experience thrilling jungle safaris with a chance to spot tigers.",
    difficulty: "Easy",
    duration: 3,
    price: 12500,
    type: "Safari",
    agency: "WildExpeditions",
    rating: 4.6,
  },
];

/* ---------- Main Page ---------- */
export default function ExplorePage() {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  const [filters, setFilters] = useState({
    type: "",
    difficulty: "",
    region: "",
  });

  // mobile drawer toggle
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Simulate fetch */
  useEffect(() => {
    setTimeout(() => {
      setTrips(tripsMock);
      setFilteredTrips(tripsMock);
      setLoading(false);
    }, 800);
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
          <Button>Sign Up</Button>
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
      <div className="flex flex-1 flex-col md:flex-row gap-4 px-4 py-6 max-w-7xl mx-auto w-full">
        {/* Desktop sidebar */}
        <aside className="hidden md:block md:w-1/4">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onApply={applyFilters}
          />
        </aside>

        {/* Trip cards */}
        <section className="w-full md:w-3/4">
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
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
        © 2025 XploreNow. All rights reserved. | Follow us on{" "}
        <a href="#" className="text-[#00A99D] underline">
          Instagram
        </a>
      </footer>
    </div>
  );
}
