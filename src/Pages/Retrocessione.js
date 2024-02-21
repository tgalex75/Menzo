import React, { useState } from "react";
import datiRetrocessione from "../Data/datiRetrocessione"
import random from "random";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";

const Retrocessione = () => {
  const [casuale, setCasuale] = useState("");

  const fetchLista = () => {
    setCasuale(random.choice(datiRetrocessione))
  }
  
  const { id, title, description } = casuale;

  const titoloH1 = "Imprevisto Retrocessione";

  return (
    <>
      <LayoutBase titoloH1={titoloH1} id={id} casuale={casuale}>
        {casuale && (
          <section className="flex flex-col items-center justify-center gap-8 text-[--clr-prim]">
            <h2 className="text-5xl">{title} {id}</h2>
            <p
              style={{ fontFamily: "'Roboto', cursive" }}
              className="px-12 md:w-3/5 md:flex-1 md:text-3xl italic"
            >
              {description}
            </p>
          </section>
        )}
      </LayoutBase>
      {Dado(fetchLista)}
    </>
  );
};

export default Retrocessione;
