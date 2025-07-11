export const InputField = ({ icon: Icon, type = "text", label, name, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <Icon className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A99D] transition"
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);