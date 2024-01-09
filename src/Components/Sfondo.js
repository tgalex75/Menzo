import React from "react";
import logoWr from "../assets/imgs/FK_Lofoten.png";

const Sfondo = () => {
  return (
    <section className="absolute left-1/2 top-1/2 -z-50 h-screen w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-transparent">
<div className="h-full w-full opacity-[.08]" style={{
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${logoWr})`,
    }}></div>
    </section>
  );
};

export default Sfondo;
