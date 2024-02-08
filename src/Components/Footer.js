//import { color } from "framer-motion";
import React from "react";
import { isMobile } from "react-device-detect";
import baffo from "../assets/imgs/baffo.png";

const Footer = (props) => {
  // const { session } = props;

  return (
    <div
      className={
        isMobile
          ? "hidden"
          : "absolute bottom-0 left-0 m-1 flex w-full items-center justify-between text-sm"
      }
    >
      <small className="z-10 ps-4 opacity-20">
        coded by tgalex75 - Menzo Community - beta version
      </small>
      <img className="h-auto w-24 me-10 z-20 opacity-70" src={baffo} alt="baffo nordico" />
    </div>
  );
};

export default Footer;
