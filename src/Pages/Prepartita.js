import React, { useState, useEffect } from "react";
import { randomNumber } from "../Funzioni/RandomNumber";
import datiPrepartita from "../Data/datiPrepartita";
import SecondaEstrazione from "../Components/SecondaEstrazione";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabaseClient";

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

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
                {!session ? (
                  <div className="absolute left-1/2 top-1/2 flex h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 border-2 border-[--clr-prim] py-2 rounded-2xl bg-neutral-900">
                    <h3 className="text-2xl text-[--clr-sec]">ATTENZIONE!</h3>
                    <span >Funzionalità disponibile solo se loggati</span>
                    <Auth
                      supabaseClient={supabase}
                      appearance={{ theme: ThemeSupa }}
                      showLinks={false}
                      theme="dark"
                      providers={[]}
                      localization={{
                        variables: {
                          sign_in: {
                            email_label: "Il tuo indirizzo email",
                            password_label: "La tua password",
                            email_input_placeholder:
                              "Inserisci il tuo indirizzo email",
                            password_input_placeholder:
                              "Inserisci la tua password",
                          },
                        },
                      }}
                      className="w-1/2"
                    />
                    <span >Se non disponi di un account effettua un'altra estrazione</span>
                  </div>
                ) : (
                  <FetchImprevisto />
                )}
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
