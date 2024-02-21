import React, { useState, useEffect } from "react";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import { supabase } from "../supabaseClient";

const Retrocessione = () => {
  const [casuale, setCasuale] = useState(null);

  const { id, title, description } = casuale ;

  /* useEffect(() => {
    setTimeout(() => {
      delElemento();
    }, 3000);
  }); */

  const fetchLista = async () => {
    const { data } = await supabase
      .from("ordine_casuale")
      .select("*")
      .limit(1)
      .single();
    setCasuale(data ? data : { id: 0, name: "LISTA VUOTA!!!" });
  };

  const estraiNumeroCasuale = () => {
    console.log("fdfdfd");
  };

  const titoloH1 = "Imprevisto Retrocessione";

  return (
    <>
      <LayoutBase titoloH1={titoloH1} id={id} casuale={casuale}>
        {casuale && (
          <>
            <h2
              style={{
                fontFamily: "'Rubik Scribble', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
            ></h2>

            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className={`text-4xl font-extrabold uppercase md:flex-1 md:text-5xl ${
                id === 6 && "hidden"
              }`}
            >
              {title}
            </h3>
            <p
              style={{ fontFamily: "'Roboto', cursive" }}
              className="mt-4 px-4 text-xl md:flex-1 md:text-3xl"
            >
              {description}
            </p>
          </>
        )}
      </LayoutBase>
      {Dado(fetchLista)}
    </>
  );
};

export default Retrocessione;
