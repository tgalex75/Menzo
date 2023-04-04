import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import "./ImprevistoStyle.css";
import settimana from "../data/dati_settimana";
import { motion } from "framer-motion";

const Imprevisto = () => {
    const [randomNumber, setRandomNumber] = useState(1);
    const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);
    const [count, setCount] = useState(0);

    function getRandomNumber(inputNum) {
        return Math.floor(Math.random() * inputNum.length) + 1;
    }

    function genRandomNumber() {
        setRandomNumber(getRandomNumber(settimana));
        setIsWelcomeScreen(false);
        setCount(count + 1);
    }

    function mappedNumber(data) {
        return data[randomNumber - 1];
    }

    const { id, title, description, isImprev } = mappedNumber(settimana);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="titolo-h1">SETTIMANA</h1>

            {/* ***** WELCOME SCREEN ***** */}

            {isWelcomeScreen && (
                <div>
                    <Tooltip title="Estrai un numero" placement="bottom" arrow>
                        <div className="welcomeScreenBtn">
                            <MdSend
                                onClick={() => genRandomNumber(randomNumber)}
                            />
                        </div>
                    </Tooltip>
                </div>
            )}

            {/* ***** PREPARTITA ***** */}

            {!isWelcomeScreen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="prepartita"
                >
                    <motion.div
                        key={count}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, rotate: 360 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            type: "tween",
                            damping: 100,
                            mass: 0.75,
                            stiffness: 10,
                        }}
                    >
                        <h1
                            style={
                                isImprev ? { color: "var(--clr-primary)" } : {}
                            }
                        >
                            {id}
                        </h1>
                    </motion.div>
                    <motion.div
                        key={"a" + count}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{
                            type: "tween",
                            damping: 100,
                            mass: 0.75,
                            stiffness: 10,
                        }}
                    >
                        <div className="isImprevisto">
                            {" "}
                            {isImprev ? "IMPREVISTO" : ""}{" "}
                        </div>
                        <h2
                            style={
                                isImprev ? { color: "var(--clr-primary)" } : {}
                            }
                        >
                            {" "}
                            {title}{" "}
                        </h2>
                        <p> {description} </p>
                        {(id === 8 || id === 16) && (
                            <small
                                style={{
                                    color: "var(--clr-primary)",
                                }}
                            >
                                ⃰ Non applicabile se il giocatore estratto è in
                                prestito. In tal caso si ripete
                                l&apos;estrazione
                            </small>
                        )}
                    </motion.div>

                    {/* ***** Pulsante estrazione ***** */}
                    <Tooltip title="Estrai un numero" placement="top" arrow>
                        <div className="sendButton" onClick={genRandomNumber}>
                            <MdSend />
                        </div>
                    </Tooltip>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Imprevisto;
