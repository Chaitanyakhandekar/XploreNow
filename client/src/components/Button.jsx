export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded bg-[#00A99D] text-white hover:bg-opacity-90 disabled:opacity-60 ${className}`}
    {...props}
  >
    {children}
  </button>
);
