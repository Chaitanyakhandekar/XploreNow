// src/components/Spinner.jsx
import { motion } from "framer-motion";

export default function Spinner({ size = 20, color = "#00A99D" }) {
  return (
    <motion.div
      className="rounded-md"
      style={{
        width: size,
        height: size,
        borderWidth: size / 8,   // thickness scales with size
        borderColor: color,
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 2,            // 1 s per spin
      }}
    />
  );
}
