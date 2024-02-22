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
    fetchLista();
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
        className="flex h-full w-full select-none flex-col items-center justify-center rounded-xl bg-black/50 px-4 pb-4 text-center shadow-lg ring ring-inset ring-white/75 md:gap-6 md:px-10 md:pb-8"
      >
        <aside className="absolute top-0 flex h-full flex-col items-center py-2 text-gray-300 md:left-1 md:w-60">
          <div className="flex w-full flex-col items-center md:h-2/5">
            <h6
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="md:text-md text-xs font-semibold uppercase"
            >
              Aree da sbloccare
            </h6>
            <ul className="flex h-auto w-full flex-wrap items-center gap-2 p-1 text-xs md:flex-col md:justify-around md:p-2 md:text-lg">
              {datiMercato.map((el) => {
                return (
                  el.nazione !== null && (
                    <li
                      className={`flex-1 rounded bg-orange-600/80 px-1 font-semibold md:w-full md:px-4 md:py-2 ${
                        el.nazione === casuale.nazione &&
                        "bg-[#0284c7cc] text-lg md:ml-8 md:text-3xl border-2 border-[--clr-sec]"
                      }`}
                      /* style={
                        el.nazione === casuale.nazione
                          ? {
                              backgroundColor: "rgb(2 132 199 / 0.8)",
                              marginLeft: "2rem",
                              fontSize: "1.8rem",
                            }
                          : {}
                      } */
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
          <div className="flex w-full flex-col items-center border-t md:h-2/5 md:border-none">
            <h6
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="md:text-md text-xs font-semibold uppercase"
            >
              Aree già sbloccate
            </h6>
            <ul className="flex h-auto w-full flex-wrap items-center gap-2 p-1 text-xs md:flex-col md:justify-around md:p-2 md:text-lg">
              {registroAree.map((el) => {
                return (
                  el.area !== null && (
                    <li
                      className=" flex-1 rounded bg-teal-600/80 px-1 font-semibold md:w-full md:px-4 md:py-2"
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
          <div className="md:text-md flex w-full flex-col items-center gap-1 border-t px-2 text-xs md:h-1/5 md:gap-2 md:border-none">
            <p className="w-3/4 font-medium text-gray-300">
              INSERISCI NUOVA AREA
            </p>
            <div className="flex gap-2 md:flex-col w-full">
              <input
                ref={newAreaRef}
                className="w-2/3 rounded px-4 py-1 text-center font-semibold text-zinc-950 md:w-full md:py-3"
                type="text"
                id="newAreaInput"
                name="newAreaInput"
                placeholder="Inserisci area"
              />
              <button
                type="submit"
                onClick={() => addNewArea(newAreaRef.current.value)}
                className="w-1/3 rounded bg-purple-700 px-4 py-1 text-center font-semibold md:w-full md:py-3"
              >
                Invia
              </button>
            </div>
          </div>
        </aside>

        {/* PULSANTE AVVIO ESTRAZIONE */}
        {!casuale && (
          <h2
            style={{ fontFamily: "'Roboto', cursive" }}
            className="w-3/5 text-xl italic md:text-5xl"
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
