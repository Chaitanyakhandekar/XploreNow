// components/ui/Loader.jsx
import { motion } from "framer-motion";

export function Loader() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white text-[#00A99D]">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-12 h-12">
          <motion.span
            className="absolute inset-0 rounded-full border-4 border-t-[#00A99D] border-slate-200 animate-spin"
            style={{ borderTopColor: "#00A99D" }}
          />
        </div>
        <motion.div
          className="text-lg font-semibold tracking-wide"
          initial={{ x: -10 }}
          animate={{ x: 0 }}
        >
          Loading...
        </motion.div>
      </motion.div>
    </div>
  );
}
