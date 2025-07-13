import { Select } from "./Select";
import { Button } from "./Button";
import { api } from "../api/api";
import { useEffect } from "react";
import { Input } from "./Input";

export const FilterSidebar = ({ filters, setFilters , setTrips ,setFilteredTrips, serachToggle, setSearchToogle }) => {

    let apiUrl  = `/trips/all/?type=${(filters.type && filters.type !=="all" ? filters.type : "")}&difficulty=${(filters.difficulty && filters.difficulty !=="all" ? filters.difficulty : "")}&region=${(filters.region && filters.region !=="all" ? filters.region : "")}&startDate=${filters.startDate || ""}&endDate=${filters.endDate || ""}&category=${(filters.category && filters.category !=="all" ? filters.category : "")}&minPrice=${filters.minPrice || ""}&maxPrice=${filters.maxPrice || ""}&search=${filters.search || ""}`;

    useEffect(()=>{
        apiUrl  = `/trips/all/?type=${(filters.type && filters.type !=="all" ? filters.type : "")}&difficulty=${(filters.difficulty && filters.difficulty !=="all" ? filters.difficulty : "")}&region=${(filters.region && filters.region !=="all" ? filters.region : "")}&startDate=${filters.startDate || ""}&endDate=${filters.endDate || ""}&category=${(filters.category && filters.category !=="all" ? filters.category : "")}&minPrice=${filters.minPrice || ""}&maxPrice=${filters.maxPrice || ""}&search=${filters.search || ""}`;

         console.log(apiUrl)

          applyFilters()
    },[filters])


    const applyFilters = async()=>{
        const response =  await api
                            .get(apiUrl)
                            .then((res)=>{setFilteredTrips(res.data.data.allTrips);setTrips(res.data.data.allTrips) ; console.log(res.data)})
                            .catch(()=>setFilteredTrips([]))
    }

    return (
        <div className="space-y-4 text-sm sticky top-10">
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
      <label className="block mb-1 text-slate-700 font-bold">Category</label>
      <Select
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="all">All</option>
        <option value="himalayan">Himalayan</option>
        <option value="sahyadri">Sahyadri</option>
        <option value="beach">Beach</option>
        <option value="wildlife">Wildlife</option>
        <option value="desert">Desert</option>
        <option value="international">International</option>
        <option value="weekend">Weekend</option>
        <option value="snow">Snow</option>
        <option value="spiritual">Spiritual</option>
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

    <div>
      <label className="block mb-1 text-slate-700 font-bold">Min Price</label> 
         <Input className="" type="number" onChange={(e)=>setFilters({...filters , minPrice:e.target.value})}/>   
    </div>
    <div>
      <label className="block mb-1 text-slate-700 font-bold">Max Price</label> 
         <Input className="" type="number" onChange={(e)=>setFilters({...filters , maxPrice:e.target.value})}/>   
    </div>

    {/* <Button className="w-full" onClick={applyFilters}>
      Apply Filters
    </Button> */}
  </div>
    );
};