import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../Pages/Home";
import Prepartita from "../Pages/Prepartita";
import MediaOverall from "../Pages/MediaOverall";
import Mercato from "../Pages/Mercato";
import RiepilogoImprevisti from "../Pages/RiepilogoImprevisti";
import EditorImprevisti from "../Pages/EditorImprevisti";
import ErrorPage from "../Pages/ErrorPage";

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/prepartita" element={<Prepartita />} />
                <Route path="/calcolo-media" element={<MediaOverall />} />
                <Route path="/mercato" element={<Mercato />} />
                <Route path="/riepilogo-imprevisti" element={<RiepilogoImprevisti />} />
                <Route path="/editor-imprevisti" element={<EditorImprevisti />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
