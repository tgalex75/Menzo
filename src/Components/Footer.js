import React from "react";
import { isMobile } from "react-device-detect";
import baffo from "../assets/imgs/baffo.png";
import { useAuth } from "../context/Auth";

const Footer = () => {
  const { user } = useAuth();

  return (
    <div
      className={
        isMobile
          ? "hidden"
          : "fixed bottom-0 left-0 z-10 m-1 flex w-full items-center justify-between text-sm"
      }
    >
      <small className="ms-4 w-1/3 opacity-20">
        coded by tgalex75 - Menzo Community - beta version
      </small>
      {user && <small className="w-1/3 italic">{user.email}</small>}
      <img
        className="z-20 me-10 h-auto w-24 opacity-70"
        src={baffo}
        alt="baffo nordico"
      />
    </div>
  );
};

export default Footer;
