export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#00A99D] ${className}`}
    {...props}
  />
);