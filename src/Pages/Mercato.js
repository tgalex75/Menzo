import React, { useState, useEffect } from "react";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import random from "random";
import DenmarkFlag from "../assets/imgs/Flags/DenmarkFlag.svg";
import FinlandFlag from "../assets/imgs/Flags/FinlandFlag.svg";
import SwedenFlag from "../assets/imgs/Flags/SwedenFlag.svg";
//import IcelandFlag from "../assets/imgs/Flags/IcelandFlag.svg";
import EstoniaFlag from "../assets/imgs/Flags/EstoniaFlag.svg";
import CanadaFlag from "../assets/imgs/Flags/CanadaFlag.svg";

const Mercato = () => {
  const [datiMercato, setDatiMercato] = useState(null);
  const [casuale, setCasuale] = useState(null);

  const flags = [
    { id: 5, flag: EstoniaFlag },
    { id: 6, flag: SwedenFlag },
    { id: 7, flag: FinlandFlag },
    { id: 8, flag: DenmarkFlag },
    { id: 9, flag: CanadaFlag },
    //{ id: 10, flag: IcelandFlag },
  ];

  useEffect(() => {
    fetchLista();
  }, []);

  const fetchLista = async () => {
    let { data: zz_menzo_mercato, error } = await supabase
      .from("zz_menzo_mercato")
      .select("*");
    setDatiMercato(
      zz_menzo_mercato
        ? zz_menzo_mercato
        : { id: 0, nazione: "Tutte le aree sono state sbloccate" } &&
            console.log(error),
    );
  };

  const delElemento = async () => {
    const { error } = await supabase
      .from("zz_menzo_mercato")
      .delete("nazione")
      .eq("nazione", isMercato && casuale.nazione);
    error && console.log(error);
  };

  const estraiNumeroCasuale = () => {
    setCasuale(random.choice(datiMercato));
    delElemento()
    fetchLista()
  };

  const isMercato = casuale.nazione !== "";

  console.log(isMercato);

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>Area Calciomercato</h1>
      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={casuale}
        id="containerPrimaEstrazione"
        style={isMercato ? { color: "var(--clr-prim)" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-center gap-6 rounded-xl bg-black/50 px-4 pb-4 text-center shadow-lg ring ring-inset ring-white/75 md:px-10 md:pb-8"
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
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-4xl font-extrabold uppercase md:text-5xl"
            >
              {isMercato ? "NUOVA AREA DI MERCATO" : "Nessuna nuova area"}
            </h3>
            <p
              style={{
                fontFamily: "'Roboto', cursive",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className="mt-4 px-4 text-2xl md:w-3/5 md:text-7xl"
            >
              {isMercato && casuale.nazione}
            </p>
          </>
        )}
      </motion.div>
      {Dado(estraiNumeroCasuale)}
    </section>
  );
};

export default Mercato;
