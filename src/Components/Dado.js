import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

const Dado = (clickFunc) => {
  return (
    <motion.div
      whileHover={{
        rotate: 30,
      }}
      whileTap={{
        rotate: -90,
        scale: 1.2,
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute bottom-0 right-0 mb-14 me-4 flex h-auto cursor-pointer select-none items-center justify-center rounded-full md:m-4 md:p-3 md:hover:bg-gray-500/10"
    >
      <GiPerspectiveDiceSixFacesRandom
        style={{
          filter: "drop-shadow(.25rem .25rem 0.15rem #222)",
        }}
        size={isMobile ? 72 : 112}
        onClick={clickFunc}
      />
    </motion.div>
  );
};

export default Dado;
