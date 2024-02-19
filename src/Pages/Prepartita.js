import React, { useState } from "react";
import { randomNumber } from "../Funzioni/RandomNumber";
import datiPrepartita from "../Data/datiPrepartita";
import SecondaEstrazione from "../Components/SecondaEstrazione";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";

const Prepartita = () => {
  const [casuale, setCasuale] = useState(null);

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    setCasuale(randomNumber(datiPrepartita));
  };

  const { id, title, description, isImprev, ultEstrazione } = casuale
    ? datiPrepartita[casuale - 1]
    : {};

  const titoloH1 = "Imprevisto Prepartita";
  const isImpCommunity = title === "PAROLA ALLA COMMUNITY!";
  const numbExtrPlayer = 5;

  return (
    <>
      <LayoutBase
        titoloH1={titoloH1}
        id={id}
        isImprev={isImprev}
        casuale={casuale}
      >
        {casuale && (
          <>
            <h2
              style={{
                fontFamily: "'Rubik Scribble', sans-serif",
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className={
                isImprev
                  ? "text-5xl font-extrabold uppercase md:top-2 md:flex-1 md:text-6xl"
                  : "hidden"
              }
            >
              {isImpCommunity ? "Imprevisto della Community" : "IMPREVISTO!"}
            </h2>
            {!isImpCommunity ? (
              <>
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
            ) : (
              <>
                <FetchImprevisto />
              </>
            )}
            {ultEstrazione && id !== 4 ? <SecondaEstrazione /> : ""}
            {ultEstrazione && id === 4 ? (
              <SecondaEstrazioneDiretta numbExtrPlayer={numbExtrPlayer} />
            ) : (
              ""
            )}
          </>
        )}
      </LayoutBase>
      {Dado(estraiNumeroCasuale)}
    </>
  );
};

export default Prepartita;
