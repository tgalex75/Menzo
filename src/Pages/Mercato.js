import React, { useState, useEffect, useRef } from "react";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { supabase } from "../supabaseClient";

const Mercato = () => {
  const [casuale, setCasuale] = useState(null);

  const estraiNumeroCasuale = () => {
    setCasuale(Math.floor(Math.random() * 10) + 1);
  };

  const isImpr = casuale === 5;

  const inputRef = useRef(null);

  const [vociRegistro, setVociRegistro] = useState([]);

  const tipoImprevisto = "Mercato"

  useEffect(() => {
    fetchRegistryList();
  }, [vociRegistro]);

  const fetchRegistryList = async () => {
    const { data } = await supabase.from("registro").select("*");
    setVociRegistro(data ? data : []);
  };

  const removeVociRegistro = async (element) => {
    const { error } = await supabase
      .from("registro")
      .delete()
      .eq("id", element);
    error && console.log(error);
  };

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>{isMobile ? "Calciomercato" : "Imprevisto Offerte Calciomercato"}</h1>
      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={casuale}
        id="containerPrimaEstrazione"
        style={isImpr ? { color: "var(--clr-prim)" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-around rounded-xl bg-black/50 px-4 pb-4 text-center shadow-lg ring ring-inset ring-white/75 md:px-10 md:pb-8"
      >
        {!casuale && (
          <h2
            style={{ fontFamily: "'Roboto', cursive" }}
            className="text-5xl italic"
          >
            Lancia il dado...
          </h2>
        )}

        {casuale && (
          <>

            <h2
              style={{
                fontFamily: "'Rubik Scribble', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                isImpr
                  ? "text-5xl font-extrabold uppercase md:text-7xl"
                  : "hidden"
              }
            >
              imprevisto!
            </h2>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-4xl font-extrabold uppercase md:text-6xl"
            >
              {isImpr ? "Mercenario" : "Bilancio in Ordine"}
            </h3>
            <p
              style={{
                fontFamily: "'Roboto', cursive",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className="mt-4 px-4 text-2xl md:w-3/5 md:text-4xl"
            >
              {isImpr
                ? "Accetta l'offerta o raddoppia l'ingaggio appena possibile"
                : "Totale libertà di scelta"}
            </p>
          </>
        )}
      </motion.div>
      {Dado(estraiNumeroCasuale)}
    </section>
  );
};

export default Mercato;
