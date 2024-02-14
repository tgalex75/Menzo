import React, { useState, useEffect, useRef } from "react";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

const Mercato = () => {
  const [datiMercato, setDatiMercato] = useState([]);
  const [casuale, setCasuale] = useState("");
  const [registroAree, setRegistroAree] = useState([]);

  useEffect(() => {
    fetchLista();
    fetchAree();
    setTimeout(() => {
      delElemento(casuale.id);
      casuale.nazione !== null && insertArea(casuale);
    }, 1000);
  }, [casuale]);

  const fetchLista = async () => {
    let { data: zz_menzo_mercato, error } = await supabase
      .from("zz_menzo_mercato")
      .select("*");
    setDatiMercato(zz_menzo_mercato ? zz_menzo_mercato : console.log(error));
  };

  const estrattoCasuale = async () => {
    const { data } = await supabase
      .from("ordine_casuale_mercato")
      .select("*")
      .limit(1)
      .single();
    setCasuale(data ? data : []);
  };

  const fetchAree = async () => {
    let { data: regAree, error } = await supabase.from("regAree").select("*");
    regAree ? setRegistroAree(regAree) : console.log(error);
  };

  const delElemento = async (country) => {
    const { error } = await supabase
      .from("zz_menzo_mercato")
      .delete("id")
      .eq("id", country);
    error && console.log(error);
  };

  const insertArea = async (country) => {
    const { data, error } = await supabase
      .from("regAree")
      .insert([{ id: country.id, area: country.nazione }])
      .select();
    data ? console.log(data) : console.log(error);
  };

  const addNewArea = async (country) => {
    const { data, error } = await supabase
      .from("zz_menzo_mercato")
      .insert([{ nazione: country !== null && country.toUpperCase() }])
      .select();
    data ? console.log(data) : console.log(error);
    fetchLista()

  };

  const isNewArea = casuale.nazione !== null;

  const newAreaRef = useRef("");


  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>Area Calciomercato</h1>
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
        <aside className="absolute left-1 top-0 flex h-full w-60 flex-col items-center py-2 text-gray-300">
          <div className="flex h-2/5 w-full flex-col items-center">
            <h6
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-md font-semibold uppercase"
            >
              Aree da sbloccare
            </h6>
            <ul className="flex h-auto w-full flex-col items-center justify-around gap-2 p-2 text-lg">
              {datiMercato.map((el) => {
                return (
                  el.nazione !== null && (
                    <li
                      className="w-full rounded bg-orange-600/80 px-4 py-2 font-semibold"
                      style={
                        el.nazione === casuale.nazione
                          ? {
                              backgroundColor: "rgb(2 132 199 / 0.8)",
                              marginLeft: "2rem",
                              fontSize: "1.8rem",
                            }
                          : {}
                      }
                      key={el.id}
                    >
                      {el.nazione}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          {/* AREE SBLOCCATE */}
          <div className="flex h-2/5 w-full flex-col items-center">
            <h6
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-md font-semibold uppercase"
            >
              Aree già sbloccate
            </h6>
            <ul className="flex h-auto w-full flex-col items-center justify-around gap-2 p-2 text-lg">
              {registroAree.map((el) => {
                return (
                  el.area !== null && (
                    <li
                      className="w-full rounded bg-teal-600/80 px-4 py-2 font-semibold"
                      key={el.id}
                    >
                      {el.area}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          {/* INSERISCI NUOVA AREA NEL DB */}
          <div className="flex h-1/5 w-full flex-col items-center gap-2 px-2">
            <p className="w-3/4 font-medium text-gray-300">
              INSERISCI NUOVA AREA NEL DB
            </p>
            <input
              ref={newAreaRef}
              className="w-full rounded px-4 py-2 text-center font-semibold text-zinc-950"
              type="text"
              id="newAreaInput"
              name="newAreaInput"
              placeholder="Inserisci area"
            />
            <button
              type="submit"
              onClick={() => addNewArea(newAreaRef.current.value)}
              className="w-full rounded bg-purple-700 px-4 py-2 text-center font-semibold"
            >
              Inserisci
            </button>
          </div>
        </aside>
        
        {/* PULSANTE AVVIO ESTRAZIONE */}
        {!casuale && (
          <h2
            style={{ fontFamily: "'Roboto', cursive" }}
            className="w-3/5 text-5xl italic"
          >
            {datiMercato.length > 0
              ? "Avvia estrazione..."
              : "TUTTE LE AREE SONO STATE SBLOCCATE"}
          </h2>
        )}

        {casuale && (
          <>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-4xl font-extrabold uppercase md:text-5xl"
            >
              {isNewArea ? "" : "Nessuna nuova area"}
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
          </>
        )}
      </motion.div>
      {datiMercato.length > 0 && Dado(estrattoCasuale)}
    </section>
  );
};

export default Mercato;
