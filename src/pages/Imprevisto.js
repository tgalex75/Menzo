import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import "./ImprevistoStyle.css";
import prepartita from "../data/dati_prepartita";
import TextField from "@mui/material/TextField";
import grifo from "../assets/tshirt.png";

const Imprevisto = () => {
    const [randomNumber, setRandomNumber] = useState(1);
    const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);
    const [count, setCount] = useState(0);

    function getRandomNumber(inputNum) {
        return Math.floor(Math.random() * inputNum.length) + 1;
    }

    function genRandomNumber() {
        setRandomNumber(getRandomNumber(prepartita));
        setIsWelcomeScreen(false);
        setCount(count + 1);
        setInputField({randomPlayerNum: ""});
        setSecondExtractedNumber(null)
    }

    function mappedNumber(data) {
        return data[randomNumber - 1];
    }

    const { id, title, description, isImprev, ultEstrazione } =
        mappedNumber(prepartita);

    const CssTextField = {
        "& label.Mui-focused": {
            color: "var(--clr-primary)",
        },
        "& .MuiInputLabel-root": {
            color: "rgba(128, 128, 128, 0.4)",
        },
        "& .MuiInputLabel-focused": {
            color: "#efefef",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "var(--clr-primary)",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "rgba(128, 128, 128, 0.4)",
            },
            "&:hover fieldset": {
                borderColor: "var(--clr-primary)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "var(--clr-primary)",
            },
        },
        "& .MuiInputBase-input": {
            color: "var(--clr-primary)",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "600",
            width: "10rem",
        },
    };

    /* Logica seconda estrazione */

    const [inputField, setInputField] = useState({
        randomPlayerNum: "",
    });

    function handleChange(event) {
        setInputField((prevInputField) => {
            return {
                ...prevInputField,
                [event.target.name]: event.target.value,
            };
        });
    }

    const [secondExtractedNumber, setSecondExtractedNumber] = useState(null);

    const genSecondRandomNumber = () => {
        setSecondExtractedNumber(
            Math.floor(Math.random() * inputField.randomPlayerNum) + 1
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="titolo-h1">PREPARTITA</h1>

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
                        animate={{ opacity: 1, y: 0}}
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
                    </motion.div>

                    {/* IN CASO DI ULTERIORE ESTRAZIONE */}

                    {ultEstrazione && (
                        <div className="estrazione-extra">
                            <TextField
                                size="small"
                                label="A chi tocca oggi?"
                                id="input-estrazione-giocatore"
                                name="randomPlayerNum"
                                type="number"
                                value={inputField.randomPlayerNum}
                                onChange={handleChange}
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                }}
                                sx={CssTextField}
                            />
                            <MdSend
                                size={"3rem"}
                                onClick={genSecondRandomNumber}
                            />
                            {ultEstrazione && (
                                <div
                                    className="tshirt"
                                    style={{
                                        backgroundImage: `url(${grifo})`,
                                    }}
                                >
                                    {secondExtractedNumber && (
                                        <span>{secondExtractedNumber}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

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
