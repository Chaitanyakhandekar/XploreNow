// components/TicketModal.jsx
import { useState } from "react";
import { XIcon } from "lucide-react";

export default function TicketModal({ isOpen=false, setIsOpen , onClose=()=>{setIsOpen(false)} }) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (quantity < 1) return alert("At least 1 ticket is required.");
    onConfirm(quantity);
    setQuantity(1);
    onClose();
  };

  const onConfirm = ()=>{

  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Book Your Tickets
        </h2>

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Number of Tickets
        </label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <button
          onClick={handleConfirm}
          className="w-full bg-[#00A99D] text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
