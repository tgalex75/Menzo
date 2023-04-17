import PropTypes from "prop-types";
import { React, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { MdMenu, MdClose } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import "./NavbarStyle.css";
import logo from "../assets/logo192.png";
import { Link } from "react-router-dom";

function Navbar(props) {
    const { theme, cambiaTema } = props;

    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = () => {
        setOpenMenu((prevMenu) => !prevMenu);
    };

    return (
        <nav>
            {/* Logo */}
            <div className="logo">
                <a href="/">
                    <img src={logo} alt="logo" />
                </a>
            </div>
            <ThemeToggle theme={theme} cambiaTema={cambiaTema} />
            {/* Menu */}
            <Tooltip title="Menu generale" placement="left" arrow>
                <div className="menu">
                    {!openMenu ? (
                        <MdMenu onClick={handleClick} />
                    ) : (
                        <MdClose onClick={handleClick} />
                    )}
                    <ul
                        onClick={handleClick}
                        className={openMenu ? "nav-menu active" : "nav-menu"}
                    >
                        <Link to="/">
                            <li>Home</li>
                        </Link>
                        <Link to="/prepartita">
                            <li>Imprevisti Prepartita</li>
                        </Link>
                        <Link to="/migliore-peggiore-stagione">
                            <li>Migliore e Peggiore</li>
                        </Link>
                        <span id="span-menu">MENU</span>
                    </ul>
                </div>
            </Tooltip>
        </nav>
    );
}

Navbar.propTypes = {
    cambiaTema: PropTypes.any,
    theme: PropTypes.any,
};

export default Navbar;
