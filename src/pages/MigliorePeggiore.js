import React, { useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import { BsGraphDown } from "react-icons/bs";
import { motion } from "framer-motion";
import miglioreStagione from "../data/miglioreStagione";
import peggioreStagione from "../data/peggioreStagione";
import { MdSend } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import "./MigliorePeggioreStyle.css";

function MigliorePeggiore() {
    const [count, setCount] = useState(0);

    function genClick() {
        setCount(count + 1);
    }
    function getRandomNumber(inputNum) {
        return Math.floor(Math.random() * inputNum.length) + 1;
    }

    const extractedNumberM = getRandomNumber(miglioreStagione) - 1;
    const extractedNumberP = getRandomNumber(peggioreStagione) - 1;

    const {
        id: idM,
        title: titleM,
        description: descriptionM,
    } = miglioreStagione[extractedNumberM];
    const {
        id: idP,
        title: titleP,
        description: descriptionP,
    } = peggioreStagione[extractedNumberP];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="titolo-h1-MP">MIGLIORE e PEGGIORE</h1>
            <div className="mainBox" key={count}>
                {count > 0 && (
                    <div className="bestWorse">
                        <div className="mainContainer">
                            {/* MIGLIORE */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                <h3>il Migliore</h3>
                                <BsGraphUp />
                                <motion.div
                                    key={"h1M" + count}
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
                                    <h1>{idM}</h1>
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
                                    <h2>{titleM}</h2>
                                    <p>{descriptionM}</p>
                                </motion.div>
                            </div>

                            {/* PEGGIORE */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                <h3>il Peggiore</h3>
                                <BsGraphDown style={{ color: "red" }} />
                                <motion.div
                                    key={"h1P" + count}
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
                                    <h1>{idP}</h1>
                                </motion.div>
                                <motion.div
                                    key={"b" + count}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 0 }}
                                    transition={{
                                        type: "tween",
                                        damping: 100,
                                        mass: 0.75,
                                        stiffness: 1,
                                    }}
                                >
                                    <h2>{titleP}</h2>
                                    <p>{descriptionP}</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                )}
                <Tooltip
                    title="Estrai il migliore ed il peggiore della Stagione"
                    placement="top"
                    arrow
                >
                    <div
                        id="bWButton"
                        onClick={genClick}
                        style={
                            count != 0 && window.innerWidth < 768
                                ? { left: "80%", top: "80%" }
                                : {}
                        }
                    >
                        <MdSend />
                    </div>
                </Tooltip>
                <p
                    style={
                        count === 0 ? { display: "block", padding : "10rem 5rem 0", color: "var(--clr-primary)", fontWeight: 700} : { display: "none" }
                    }
                >
                    Estrai il migliore ed il peggiore della Stagione
                </p>
            </div>
        </motion.div>
    );
}

export default MigliorePeggiore;
