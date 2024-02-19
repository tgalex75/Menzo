import { useState, useEffect, useRef } from "react";
import { mySelect, tattiche, listaTattiche, data } from "../Funzioni/schemi";
import { v4 as uuidv4 } from "uuid";

const IndicatoreGiocatoriImpr = (props) => {
  const { extractedPlayer } = props;
  const [schema, setSchema] = useState(() => {
    const saved = localStorage.getItem("schema");
    const initialValue = JSON.parse(saved);
    return initialValue || "4-2-3-1";
  });

  const selectRef = useRef(null);
  const getSchema = () => {
    setSchema(selectRef.current.value);
  };

  useEffect(() => {
    localStorage.setItem("schema", JSON.stringify(schema));
  }, [schema]);

  const filteredTactics = listaTattiche.filter((item) => item.nome === schema);

  const tactics = (arr, start, end) => {
    return (
      <section id="tattiche" className="flex items-center justify-center">
        <div className="flex items-center gap-6">
          {arr.slice(start, end).map((el) => (
            <div
              key={uuidv4()}
              className="my-2 flex w-2 items-center justify-center rounded-lg border px-4 py-1 text-xs font-semibold text-gray-200"
              style={
                extractedPlayer.find((item) => item === el.nome) && {
                  backgroundColor: "orange",
                  borderColor: "transparent",
                  color: "black",
                }
              }
            >
              {el.nome}
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col h-full w-1/4 items-center justify-between py-2">
      <div className="flex w-full flex-col-reverse justify-center">
        <strong>{schema}</strong>
        {schema &&
          filteredTactics[0].formazione.map((el, i, array) =>
          tactics(data, el === 1 ? 0 : array[i - 1], el),
          )}
      </div>
      <div className="">
        {mySelect("Scegli lo schema", selectRef, getSchema, tattiche)}
      </div>
    </div>
  );
};

export default IndicatoreGiocatoriImpr;
