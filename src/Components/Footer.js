//import { color } from "framer-motion";
import React from "react";
import { isMobile } from "react-device-detect";

const Footer = (props) => {
  // const { session } = props;

  return (
    <div
      className={
        isMobile
          ? "hidden"
          : "absolute bottom-0 left-0 m-1 flex w-full justify-start text-sm"
      }
    >
      <small className="z-10 ps-4 opacity-20">
        coded by tgalex75 - Menzo Community - beta version
      </small>
    </div>
  );
};

export default Footer;
