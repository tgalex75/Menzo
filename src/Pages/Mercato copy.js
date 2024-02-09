import React, { useState, useEffect, useRef } from "react";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import random from "random";
import { v4 as uuidv4 } from "uuid";

const Mercato = () => {
  const [datiMercato, setDatiMercato] = useState([]);
  const [casuale, setCasuale] = useState("");
  const [registroAreeSbloccate, setRegistroAreeSbloccate] = useState([
    { id: uuidv4(), aree: "LISTA VUOTA" },
  ]);
  const [nazioneEstratta, setNazioneEstratta] = useState([]);
  const [newArea, setNewArea] = useState(null);

  useEffect(() => {
    fetchLista();
    fetchAree();
  }, [nazioneEstratta]);

  const fetchLista = async () => {
    let { data: zz_menzo_mercato, error } = await supabase
      .from("zz_menzo_mercato")
      .select("*");
    setDatiMercato(zz_menzo_mercato ? zz_menzo_mercato : console.log(error));
  };

  const fetchAree = async () => {
    let { data: regAree, error } = await supabase.from("regAree").select("*");
    regAree ? setRegistroAreeSbloccate(regAree) : console.log(error);
  };

  /* const delElemento = async (country) => {
    const { error } = await supabase
      .from("zz_menzo_mercato")
      .delete("id")
      .eq("id", country);
    error && console.log(error);
  }; 

  const insertArea = async (country) => {
    const { data, error } = await supabase
      .from("regAree")
      .insert([{ id: uuidv4(), area: country }])
      .select();
    data ? console.log(data) : console.log(error);
  };*/

  const addNewArea = async (country) => {
    const { data, error } = await supabase
      .from("zz_menzo_mercato")
      .insert([{ nazione: country !== null && country.toUpperCase() }])
      .select();
    data ? console.log(data) : console.log(error);
  };

  /* AGGIUNGE UN PAESE ALLA LISTA DI ESTRAZIONE */
  useEffect(() => {
    newArea !== null && addNewArea(newArea);
  }, [newArea]);

  const newAreaRef = useRef("");

  /* useEffect(() => {
    setTimeout(() => {
      delElemento(casuale.id);
      casuale.nazione != null && insertArea(casuale.nazione);
    }, 1800);
  }, [casuale]); */

  const estraiNumeroCasuale = () => {
    setCasuale(random.choice(datiMercato));
    isNewArea &&
      setNazioneEstratta(
        nazioneEstratta
          ? [...nazioneEstratta, { id: uuidv4(), nazione: casuale.nazione }]
          : { id: uuidv4(), nazione: casuale.nazione },
      );
    rimuoviAreaEstratta(casuale.nazione);
  };

  const isNewArea = casuale.nazione !== null;

  const rimuoviAreaEstratta = (area) => {
    isNewArea &&
      setDatiMercato(datiMercato.filter((el) => el.nazione !== area));
  };

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
        <aside className="absolute left-0 top-0 flex h-full w-60 flex-col items-center py-2 text-gray-300">
          <div className="flex h-1/2 w-full flex-col items-center">
            <h6
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-md font-semibold uppercase"
            >
              Aree da sbloccare
            </h6>
            <ul className="flex h-auto w-full flex-col items-center justify-around gap-2 p-2 text-sm">
              {datiMercato.map((el) => {
                return (
                  el.nazione !== null && (
                    <li
                      className="w-full bg-orange-600/80 px-4 py-1 font-semibold "
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
          <div className="flex h-1/2 w-full flex-col items-center">
            <h6
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="text-md font-semibold uppercase"
            >
              Aree già sbloccate
            </h6>
            <ul className="flex h-auto w-full flex-col items-center justify-around gap-2 p-2 text-sm">
              {nazioneEstratta.map((el) => {
                return (
                  el.nazione !== null && (
                    <li
                      className="w-full bg-sky-600/80 px-4 py-1 font-semibold "
                      key={el.id}
                    >
                      {el.nazione}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </aside>
        {!casuale && (
          <>
            <h2
              style={{ fontFamily: "'Roboto', cursive" }}
              className="text-5xl italic"
            >
              Avvia estrazione...
            </h2>
            <div className="absolute right-4 top-2 flex flex-col items-center gap-2">
              <p className="font-medium text-gray-300">
                Vuoi inserire una nuova Area?
              </p>
              <input
                ref={newAreaRef}
                className="rounded-md p-1 text-center text-xs font-medium text-stone-900"
                type="text"
                id="newAreaInput"
                name="newAreaInput"
                placeholder="Inserisci area"
              />
              <button
                type="button"
                onClick={() => setNewArea(newAreaRef.current.value)}
                className="h-6 w-24 rounded-lg bg-sky-700 text-center text-sm font-semibold uppercase text-gray-100 shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-[--clr-ter] focus:ring-offset-2 focus:ring-offset-sky-800"
              >
                Inserisci
              </button>
            </div>
          </>
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
          </>
        )}
      </motion.div>
      {Dado(estraiNumeroCasuale)}
    </section>
  );
};

export default Mercato;
