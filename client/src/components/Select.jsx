export const Select = ({ className = "", children, ...props }) => (
  <select
    className={`w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00A99D] ${className}`}
    {...props}
  >
    {children}
  </select>
);