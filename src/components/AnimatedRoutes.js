import React from "react";
import Main from "../pages/Main";
import Imprevisto from "../pages/Imprevisto";
import MigliorePeggiore from "../pages/MigliorePeggiore";
import ErrorPage from "../pages/ErrorPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Main />} />
                <Route path="/home" element={<Main />} />
                <Route path="/prepartita" element={<Imprevisto />} />
                <Route path="/migliore-peggiore-stagione" element={<MigliorePeggiore />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;
