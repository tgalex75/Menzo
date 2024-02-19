//import { color } from "framer-motion";
import React from "react";
import { isMobile } from "react-device-detect";
import baffo from "../assets/imgs/baffo.png";

const Footer = (props) => {
  const { user } = props;

  return (
    <div
      className={
        isMobile
          ? "hidden"
          : "fixed bottom-0 left-0 z-10 m-1 flex w-full items-center justify-between text-sm"
      }
    >
      <small className="ms-4 opacity-20 w-1/3">
        coded by tgalex75 - Menzo Community - beta version
      </small>
      <small className="italic w-1/3">{user}</small>{" "}
      <img
        className="z-20 me-10 h-auto w-24 opacity-70"
        src={baffo}
        alt="baffo nordico"
      />
    </div>
  );
};

export default Footer;
