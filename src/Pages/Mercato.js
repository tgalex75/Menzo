import React, { useState, useEffect } from "react";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import random from "random";
import { v4 as uuidv4 } from "uuid";

const Mercato = () => {
  const [datiMercato, setDatiMercato] = useState(null);
  const [casuale, setCasuale] = useState("");
  const [registroAree, setRegistroAree] = useState(() => {
    const saved = localStorage.getItem("regAree");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("regAree", JSON.stringify(registroAree));
  }, [registroAree]);

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

  const delElemento = async (country) => {
    const { error } = await supabase
      .from("zz_menzo_mercato")
      .delete("id")
      .eq("id", country);
    error && console.log(error);
  };

  useEffect(() => {
    setTimeout(() => {
      casuale.id > 4 && delElemento(casuale.id);
    }, 2500);
  }, [casuale]);

  const estraiNumeroCasuale = () => {
    setCasuale(random.choice(datiMercato));
    casuale.id > 4 &&
      setTimeout(() => {
        setRegistroAree([
          ...registroAree,
          { id: uuidv4(), area: casuale.nazione },
        ]);
      });
    fetchLista();
  };

  const isNewArea = casuale.nazione != null;

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>Area Calciomercato</h1>
      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={uuidv4()}
        id="containerPrimaEstrazione"
        style={
          isNewArea
            ? {
                color: "var(--clr-prim)",
              }
            : {}
        }
        className="flex h-full w-full select-none flex-col items-center justify-center gap-6 rounded-xl bg-black/50 px-4 pb-4 text-center shadow-lg ring ring-inset ring-white/75 md:px-10 md:pb-8"
      >
        {!casuale && (
          <h2
            style={{ fontFamily: "'Roboto', cursive" }}
            className="text-5xl italic"
          >
            Avvia estrazione...
          </h2>
        )}

        {casuale && (
          <>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-4xl font-extrabold uppercase md:text-5xl"
            >
              {isNewArea ? "NUOVA AREA DI MERCATO" : "Nessuna nuova area"}
            </h3>
            <p
              style={{
                fontFamily: "'Roboto', cursive",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className="mt-4 px-4 text-2xl md:w-3/5 md:text-7xl"
            >
              {casuale.nazione}
            </p>
            {registroAree.length > 0 && (
              <div className="absolute bottom-4 flex h-36 w-full flex-col items-center justify-between border-t-2 text-[--clr-sec]">
                <h4 className="py-4">Aree di Mercato già estratte</h4>
                <div className="mb-4 flex items-center justify-around gap-12 px-24">
                  {registroAree.slice(0, 5).map((el) => {
                    return (
                      <h3 id={el.id} className="mx-4 text-xl font-black">
                        {el.area}
                      </h3>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
      {Dado(estraiNumeroCasuale)}
    </section>
  );
};

export default Mercato;
