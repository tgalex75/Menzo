//import { color } from "framer-motion";
import React from "react";
import baffo from "../assets/imgs/baffo.png";

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 m-1 hidden w-full items-center justify-between text-sm md:flex">
      <small className="z-10 ps-4 opacity-20">
        coded by tgalex75 - Menzo Community - beta version
      </small>
      <img
        className="z-20 me-10 h-auto w-24 opacity-70"
        src={baffo}
        alt="baffo nordico"
      />
    </div>
  );
};

export default Footer;
