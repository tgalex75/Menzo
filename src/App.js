import React from "react";
import { useState, useEffect } from "react";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

import Footer from "./components/Footer";
//import BgRotate from "./components/BgRotate";

export default function App() {
    // Salvare lo stato "theme" nel localStorage
    const getFromLocalStorage = () => {
        return localStorage.getItem("theme")
            ? localStorage.getItem("theme")
            : "dark-mode";
    };

    /* Funzione che aggiorna il tema in base allo State */

    const [theme, setTheme] = useState(getFromLocalStorage());

    // Funzione che cambia il tema in base al valore dello State

    const cambiaTema = () => {
        theme === "light-mode" ? setTheme("dark-mode") : setTheme("light-mode");
    };

    // Al cambio ddello state "theme" verrà attaccata una classe al TAG html
    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <>
            <Router>
                <Navbar theme={theme} cambiaTema={cambiaTema} />
                <AnimatedRoutes />
            </Router>
            <Footer />
        </>
    );
}
