import React, { useState } from "react";
import { MdHome, MdMenu, MdClose, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/Auth";
import { isMobile } from "react-device-detect";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { signOut } = useAuth();

  const handleClick = () => {
    setIsOpenMenu((prevMenu) => !prevMenu);
  };

  const logOut = async (e) => {
    e.preventDefault();
    const { error } = await signOut();
    if (error) {
      console.log(error);
    }
    handleClick();
  };

  const dettagliMenu = [
    { id: 1, voceLi: "Home", linkTo: "/" },
    { id: 2, voceLi: "Imprevisto Prepartita", linkTo: "/prepartita" },
    {
      id: 3,
      voceLi: "Area Calciomercato",
      linkTo: "/mercato",
    },
    { id: 4, voceLi: "Media Overall", linkTo: "/calcolo-media" },
    { id: 5, voceLi: "Riepilogo imprevisti", linkTo: "/riepilogo-imprevisti" },
  ];

  const linksMenu = dettagliMenu.map((voce) => {
    return (
      <div key={voce.id}>
        <Link to={voce.linkTo}>
          <motion.li
            layout
            whileHover={{ scale: isMobile ? 1.2 : 1.5 }}
            transition={{
              type: "spring",
              duration: 0.4,
              ease: "easeIn",
              stiffness: 200,
            }}
            className="p-4 px-8 text-lg font-bold uppercase hover:text-[--clr-sec] md:text-xl"
          >
            {voce.voceLi}
          </motion.li>
        </Link>
      </div>
    );
  });

  return (
    <nav className="fixed z-[1000] flex h-auto w-full items-center justify-between px-2 py-1 md:px-6 md:py-3">
      <div
        style={isMobile ? { visibility: "hidden" } : {}}
        className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-300/30"
      >
        <Link to="/">
          <MdHome
            size={36}
            style={
              isOpenMenu
                ? { display: "none" }
                : {
                    filter: "drop-shadow(.25rem .25rem 0.15rem #222)",
                  }
            }
            className="fill-gray-300 hover:fill-gray-200"
          />
          <MdLogout
            style={
              !isOpenMenu
                ? { display: "none" }
                : {
                    display: "block",
                    filter: "drop-shadow(.25rem .25rem 0.15rem #222)",
                  }
            }
            size={36}
            className="fill-gray-300 hover:fill-gray-200"
            onClick={logOut}
          />
        </Link>
      </div>
      <div className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-300/30 md:p-2">
        {!isOpenMenu ? (
          <MdMenu
            size={isMobile ? 28 : 36}
            style={{
              filter: "drop-shadow(.25rem .25rem 0.15rem #222)",
            }}
            className="fill-gray-300 hover:fill-gray-200"
            onClick={handleClick}
          />
        ) : (
          <MdClose
            size={isMobile ? 28 : 36}
            className="fill-gray-300 hover:fill-gray-200"
            onClick={handleClick}
          />
        )}
        <ul
          style={isOpenMenu ? { right: 0 } : { right: "-100%" }}
          onClick={handleClick}
          className="absolute top-0 z-[-1] flex h-screen w-full flex-col items-center justify-center gap-24 bg-black/95 text-center text-gray-300 transition-[0.5s]"
        >
          {linksMenu}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
