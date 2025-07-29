// components/TicketModal.jsx
import { useState, useEffect } from "react";
import { XIcon, TicketIcon, UsersIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import { api } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setTripData } from "../store/slices/tripSlice";
import { useNavigate } from "react-router";

export default function TicketModal({ isOpen = false, setIsOpen, onClose = () => { setIsOpen(false) } }) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const tripData = useSelector(state => state.trip);
  const navigate = useNavigate();

  // Clear error when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setShowSuccess(false);
    }
  }, [isOpen]);

  // Clear error when quantity changes
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [quantity]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (quantity < 1) return alert("At least 1 ticket is required.");
    onConfirm(quantity);
    setQuantity(1);
  };

  const onConfirm = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api
        .get(`/bookings/can-book?tickets=${quantity}&tripId=${localStorage.getItem("tripId")}`);
      
      if (response.data.canBook === false) {
        setError(`Only ${response.data.seatsLeft} seats are left.`);
      } else {
        setShowSuccess(true);
        localStorage.setItem("totalBookings", quantity);
        
        // Small delay to show success state
        setTimeout(() => {
          navigate("/book-trip");
        }, 800);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#00A99D] to-[#00C4B8] rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-full p-1"
            disabled={isLoading}
          >
            <XIcon className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2">
              <TicketIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Book Your Tickets</h2>
              <p className="text-white/80 text-sm">Select the number of tickets you need</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quantity Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 flex items-center space-x-2">
              <UsersIcon className="h-4 w-4 text-slate-500" />
              <span>Number of Tickets</span>
            </label>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementQuantity}
                className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-[#00A99D] hover:text-[#00A99D] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1 || isLoading}
              >
                <span className="text-lg font-semibold">−</span>
              </button>
              
              <div className="relative flex-1 max-w-24">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full text-center border-2 border-slate-200 rounded-lg px-4 py-3 text-lg font-semibold focus:border-[#00A99D] focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 transition-colors duration-200"
                  disabled={isLoading}
                />
              </div>
              
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:border-[#00A99D] hover:text-[#00A99D] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity >= 10 || isLoading}
              >
                <span className="text-lg font-semibold">+</span>
              </button>
            </div>
            
            <p className="text-xs text-slate-500 text-center">Maximum 10 tickets per booking</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3 animate-in slide-in-from-top-2">
              <AlertCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium text-sm">Unable to book tickets</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3 animate-in slide-in-from-top-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium text-sm">Booking confirmed!</p>
                <p className="text-green-600 text-sm">Redirecting to booking details...</p>
              </div>
            </div>
          )}

          {/* Ticket Summary */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Selected tickets:</span>
              <span className="font-semibold text-slate-800">{quantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Ticket type:</span>
              <span className="font-semibold text-slate-800">Standard</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleConfirm}
            disabled={isLoading || showSuccess}
            className={`
              w-full px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 
              flex items-center justify-center space-x-2 relative overflow-hidden
              ${isLoading || showSuccess 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#00A99D] to-[#00C4B8] hover:from-[#00948A] hover:to-[#00A99D] hover:shadow-lg hover:shadow-[#00A99D]/25 active:scale-[0.98]'
              }
            `}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Checking availability...</span>
              </>
            ) : showSuccess ? (
              <>
                <CheckCircleIcon className="h-5 w-5" />
                <span>Booking confirmed!</span>
              </>
            ) : (
              <>
                <TicketIcon className="h-5 w-5" />
                <span>Confirm Booking</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-slate-500 text-center">
            By proceeding, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
}