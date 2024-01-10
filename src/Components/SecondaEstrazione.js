import React, { useState } from "react";
import firstkit from "../assets/imgs/firstKit.png";
import gkKit from "../assets/imgs/gkKit.png";
import IndicatoreGiocatoriImpr from "./IndicatoreGiocatoriImpr";
import { isMobile } from "react-device-detect";

const SecondaEstrazione = () => {
  const [inputField, setInputField] = useState({
    randomPlayerNum: "",
  });

  function handleChange(event) {
    setInputField((prevInputField) => {
      return {
        ...prevInputField,
        [event.target.name]: event.target.value,
      };
    });
  }

  const [secondExtractedNumber, setSecondExtractedNumber] = useState(null);

  const genSecondRandomNumber = () => {
    setSecondExtractedNumber(
      Math.floor(Math.random() * inputField.randomPlayerNum) + 1,
    );
  };

  const extractedPlayer = [secondExtractedNumber];

  return (
    <section className="flex h-[40vh] w-full items-center justify-around gap-2 rounded-md border-2 border-gray-300/20 px-1 md:min-h-[50%] md:w-3/4 md:px-12">
      <div className="flex h-fit flex-col items-center justify-around gap-6 rounded-lg px-2">
        <div className="flex w-full flex-col items-center justify-around">
          <label
            htmlFor="name-with-label"
            className="mb-1 self-start text-xs text-gray-300 md:text-sm"
          >
            A chi toccherà oggi?
          </label>
          <input
            onChange={handleChange}
            value={inputField.randomPlayerNum}
            type="number"
            id="input-estrazione-giocatore"
            className="md:text-md min-h-[2rem] w-full flex-1 appearance-none rounded-lg border-gray-300 bg-white px-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4 focus:ring-sky-700 md:min-h-[3rem] "
            name="randomPlayerNum"
            placeholder="Quanti giocatori?"
          />
        </div>
        <button
          type="button"
          onClick={genSecondRandomNumber}
          className="min-h-[2rem] w-full rounded-lg bg-sky-700 px-4 text-center text-sm font-semibold text-gray-100 shadow-md transition duration-200 ease-in hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-[--clr-ter] focus:ring-offset-2 focus:ring-offset-sky-800 md:h-12 "
        >
          Estrai
        </button>
      </div>
      {secondExtractedNumber && (
        <>
          <div
            className="flex h-full w-1/2 flex-col items-center justify-center overflow-hidden rounded bg-contain bg-center bg-no-repeat p-6 transition-all"
            style={{
              backgroundImage:
                secondExtractedNumber === 1
                  ? `url(${gkKit})`
                  : `url(${firstkit})`,
            }}
          >
            <span
              style={{ color: secondExtractedNumber > 1 && "var(--clr-prim" }}
              className="block pt-2 font-['Oswald'] text-4xl font-bold text-gray-300 md:pb-14 md:text-8xl"
            >
              {secondExtractedNumber}
            </span>
          </div>
          {!isMobile && (
            <IndicatoreGiocatoriImpr extractedPlayer={extractedPlayer} />
          )}
        </>
      )}
    </section>
  );
};

export default SecondaEstrazione;
