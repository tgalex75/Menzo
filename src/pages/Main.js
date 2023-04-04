import React from "react";
import { Link } from "react-router-dom";
import "./MainStyle.css";
import logoTeam from "../assets/logo.png";
import poster1 from "../assets/poster1.jpg";
import poster2 from "../assets/poster2.jpg";
import { motion } from "framer-motion";

const Main = () => {
    React.useEffect(() => {}, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <main className="main">
                <div className="container">
                    <img className="logo-team" src={logoTeam} alt="logo team" />
                    <div
                        className="riquadro"
                        id="impr--pre"
                        style={{
                            backgroundImage: `url(${poster1})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top center",
                        }}

                    >
                        <div className="overlay">
                            <Link className="links" to="/prepartita">
                                <h1>
                                    Imprevisti
                                    <br />
                                    Prepartita
                                </h1>
                            </Link>
                        </div>
                    </div>
                    {
                        <div
                            className="riquadro"
                            id="topsandflops"
                            style={{
                                backgroundImage: `url(${poster2})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "top center",
                            }}
                        >
                            <div className="overlay">
                                <Link className="links" to="/migliore-peggiore-stagione">
                                    <h1>
                                        Tops and 
                                        <br />
                                        Flops
                                    </h1>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </motion.div>
    );
};

export default Main;
