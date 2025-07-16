import { Select } from "./Select";
import { Button } from "./Button";
import { api } from "../api/api";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Input } from "./Input";

export const FilterSidebar = ({ 
  filters, 
  setFilters, 
  setTrips, 
  setFilteredTrips, 
  searchToggle, 
  setSearchToggle 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize API URL construction
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    
    if (filters.type && filters.type !== "all") params.append("type", filters.type);
    if (filters.difficulty && filters.difficulty !== "all") params.append("difficulty", filters.difficulty);
    if (filters.region && filters.region !== "all") params.append("region", filters.region);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.category && filters.category !== "all") params.append("category", filters.category);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.search) params.append("search", filters.search);
    
    return `/trips/all/?${params.toString()}`;
  }, [filters]);

  // Debounced filter application
  const applyFilters = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Applying filters:", apiUrl);
      
      const response = await api.get(apiUrl);
      const trips = response.data.data.allTrips;
      
      setFilteredTrips(trips);
      setTrips(trips);
      
      console.log("Filters applied successfully:", response.data);
    } catch (err) {
      console.error("Filter application failed:", err);
      setError("Failed to apply filters. Please try again.");
      setFilteredTrips([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, setFilteredTrips, setTrips]);

  // Apply filters when filters change
  useEffect(() => {
    const timeoutId = setTimeout(applyFilters, 300); // Debounce by 300ms
    return () => clearTimeout(timeoutId);
  }, [applyFilters]);

  // Enhanced filter update handler
  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, [setFilters]);

  // Date change handler with proper validation
  const handleDateChange = useCallback((key, value) => {
    if (value) {
      const isoDate = new Date(value).toISOString();
      handleFilterChange(key, isoDate);
    } else {
      handleFilterChange(key, "");
    }
  }, [handleFilterChange]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({
      type: "all",
      difficulty: "all",
      category: "all",
      region: "all",
      startDate: "",
      endDate: "",
      minPrice: "",
      maxPrice: "",
      search: ""
    });
  }, [setFilters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'type' || key === 'difficulty' || key === 'category' || key === 'region') {
        return value && value !== "all";
      }
      return value && value !== "";
    });
  }, [filters]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6 sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <h2 className="font-bold text-xl text-gray-900 tracking-tight">Filters</h2>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Applying filters...</span>
        </div>
      )}

      {/* Filter Groups */}
      <div className="space-y-5">
        {/* Type Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Trip Type
          </label>
          <Select
            value={filters.type || "all"}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
          >
            <option value="all">All Types</option>
            <option value="trek">🥾 Trek</option>
            <option value="trip">🚗 Trip</option>
            <option value="camping">⛺ Camping</option>
            <option value="adventure">🏔️ Adventure</option>
            <option value="backpacking">🎒 Backpacking</option>
          </Select>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Difficulty Level
          </label>
          <Select
            value={filters.difficulty || "all"}
            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
          >
            <option value="all">All Levels</option>
            <option value="easy">🟢 Easy</option>
            <option value="moderate">🟡 Moderate</option>
            <option value="hard">🔴 Hard</option>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Category
          </label>
          <Select
            value={filters.category || "all"}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
          >
            <option value="all">All Categories</option>
            <option value="himalayan">🏔️ Himalayan</option>
            <option value="sahyadri">⛰️ Sahyadri</option>
            <option value="beach">🏖️ Beach</option>
            <option value="wildlife">🦌 Wildlife</option>
            <option value="desert">🏜️ Desert</option>
            <option value="international">🌍 International</option>
            <option value="weekend">📅 Weekend</option>
            <option value="snow">❄️ Snow</option>
            <option value="spiritual">🕉️ Spiritual</option>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">
            Date Range
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <Input
                type="date"
                value={filters.startDate ? new Date(filters.startDate).toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange("startDate", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                End Date
              </label>
              <Input
                type="date"
                value={filters.endDate ? new Date(filters.endDate).toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange("endDate", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">
            Price Range
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Min Price
              </label>
              <Input
                type="number"
                placeholder="₹0"
                value={filters.minPrice || ""}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Max Price
              </label>
              <Input
                type="number"
                placeholder="₹∞"
                value={filters.maxPrice || ""}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || value === "all" || value === "") return null;
              
              let displayValue = value;
              if (key === 'startDate' || key === 'endDate') {
                displayValue = new Date(value).toLocaleDateString();
              }
              
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                >
                  {key}: {displayValue}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};