import ModuloTattica from "../Components/ModuloTattica";
import { isMobile } from "react-device-detect";

const giocatoreNum = isMobile ? "G n. " : "Giocatore n. ";
const overallPlaceholder = isMobile ? "OV " : "Overall";

const tattica = [{ nome: "s442", tact: [4, 4, 2] }];

export const schema = (arr, func, val) => {
  return (
    <section id="schemi" className="flex h-[40vh] w-3/4 flex-col">
      {/* PT */}
      <ModuloTattica
        arr={arr}
        start={0}
        end={1}
        giocatoreNum={giocatoreNum}
        func={func}
        placeholder={overallPlaceholder}
        val={val}
      />
      {/* DIF */}
      {tattica.nome === "s442" &&
        tattica.tact.map((el) => {
          return (
            <ModuloTattica
              arr={arr}
              start={tattica.tact.indexOf(el)+1}
              end={tattica.tact +1}
              giocatoreNum={giocatoreNum}
              func={func}
              placeholder={overallPlaceholder}
              val={val}
            />
          );
        })}
    </section>
  );
};

export const mySelect = (ref, func) => {
  return (
    <div className="flex w-4/5 flex-col items-center md:items-end ">
      <label
        htmlFor="tattica"
        className="block text-xs font-medium text-gray-300"
      >
        Seleziona la tattica
      </label>
      <select
        className="focus:ring-primary-500 focus:border-primary-500 block w-48 rounded-md border border-gray-300 bg-black/50 px-3 py-2 text-gray-200 shadow-sm focus:outline-none"
        name="tattica"
        ref={ref}
        onChange={func}
      >
        <option value="442">4-4-2</option>
        <option value="433">4-3-3</option>
        <option value="4312">4-3-1-2</option>
        <option value="4321">4-3-2-1</option>
        <option value="352">3-5-2</option>
        <option value="3412">3-4-1-2</option>
        <option value="3421">3-4-2-1</option>
        <option value="343">3-4-3</option>
        <option value="532">5-3-2</option>
        <option value="5212">5-2-1-2</option>
      </select>
    </div>
  );
};

export const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

let arrDataPlayers = arrayRange(1, 11, 1);

export const data = arrDataPlayers.map((el) => {
  return { id: el, nome: el };
});
