import { Select } from "./Select";
import { Button } from "./Button";
import { api } from "../api/api";
import { useEffect } from "react";
import { Input } from "./Input";

export const FilterSidebar = ({ filters, setFilters, onApply , setTrips ,setFilteredTrips }) => {

    let apiUrl  = `/trips/all/?type=${(filters.type && filters.type !=="all" ? filters.type : "")}&difficulty=${(filters.difficulty && filters.difficulty !=="all" ? filters.difficulty : "")}&region=${(filters.region && filters.region !=="all" ? filters.region : "")}&startDate=${filters.startDate || ""}&endDate=${filters.endDate || ""}`;

    useEffect(()=>{
         apiUrl = `/trips/all/?type=${(filters.type && filters.type !=="all" ? filters.type : "")}&difficulty=${(filters.difficulty && filters.difficulty !=="all" ? filters.difficulty : "")}&region=${(filters.region && filters.region !=="all" ? filters.region : "")}&startDate=${filters.startDate || ""}&endDate=${filters.endDate || ""}`

         console.log(filters)
    },[filters])

    const applyFilters = ()=>{
        const response = api
                            .get(apiUrl)
                            .then((res)=>setFilteredTrips(res.data.data.allTrips))
                            .catch(()=>setFilteredTrips([]))
    }

    return (
        <div className="space-y-4 text-sm">
    <h2 className="font-semibold text-lg text-slate-800">Filters</h2>

    <div>
      <label className="block mb-1 text-slate-700 font-bold">Type</label>
      <Select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="all">All</option>
        <option value="trek">Trek</option>
        <option value="trip">Trip</option>
        <option value="camping">Camping</option>
        <option value="adventure">Adventure</option>
        <option value="backpacking">Backpacking</option>
      </Select>
    </div>

    <div>
      <label className="block mb-1 text-slate-700 font-bold">Difficulty</label>
      <Select
        value={filters.difficulty}
        onChange={(e) =>
          setFilters({ ...filters, difficulty: e.target.value })
        }
      >
        <option value="all">All</option>
        <option value="easy">Easy</option>
        <option value="moderate">Moderate</option>
        <option value="hard">Hard</option>
      </Select>
    </div>

    <div>
      <label className="block mb-1 text-slate-700 font-bold">StartDate</label> 
         <Input className="" type="date" onChange={(e)=>setFilters({...filters , startDate:new Date(e.target.value).toISOString()})}/>   
    </div>
    <div>
      <label className="block mb-1 text-slate-700 font-bold">endDate</label> 
         <Input className="" type="date" onChange={(e)=>setFilters({...filters , endDate:new Date(e.target.value).toISOString()})}/>   
    </div>
    {/* <div>
      <label className="block mb-1 text-slate-700">Region</label>
      <Select
        value={filters.region}
        onChange={(e) => setFilters({ ...filters, region: e.target.value })}
      >
        <option value="all">All</option>
        <option value="maharashtra">Maharashtra</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="rajasthan">Rajasthan</option>
      </Select>
    </div> */}

    <Button className="w-full" onClick={applyFilters}>
      Apply Filters
    </Button>
  </div>
    );
};