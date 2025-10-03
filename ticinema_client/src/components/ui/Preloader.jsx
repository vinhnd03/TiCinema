import { FaFilm } from "react-icons/fa";
import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-[9999]">
      {/* Logo phim */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-6"
      >
        <FaFilm className="text-orange-500 w-16 h-16" />
      </motion.div>

      {/* Text */}
      <h2 className="text-2xl font-bold text-orange-500 tracking-wider">
        TiCinema
      </h2>

      {/* Thanh loading */}
      <div className="w-40 h-2 bg-gray-800 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-2 bg-orange-500"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
