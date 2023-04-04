import React from "react";
import classes from "./BgRotate.module.css";
import cornice from "../assets/cornice_rotante.png";
import falco from "../assets/falco_nocornice.png";

const BgRotate = () => {
    return (
        <div className={classes.bgContainer}>
            <div className={classes.rotate}>
                <img src={cornice} alt="logo_cornice" />
            </div>
            <div className={classes.imgLogo}>
                <img src={falco} alt="logo_falco" />
            </div>
        </div>
    );
};

export default BgRotate;

