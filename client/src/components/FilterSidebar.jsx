import { Select } from "./Select";
import { Button } from "./Button";

export const FilterSidebar = ({ filters, setFilters, onApply }) => (
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
      <label className="block mb-1 text-slate-700">Region</label>
      <Select
        value={filters.region}
        onChange={(e) => setFilters({ ...filters, region: e.target.value })}
      >
        <option value="">All</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="Rajasthan">Rajasthan</option>
      </Select>
    </div>

    <Button className="w-full" onClick={onApply}>
      Apply Filters
    </Button>
  </div>
);