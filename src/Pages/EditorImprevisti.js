import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { MdSend } from "react-icons/md";
//import datiPrepartita from "../Data/datiPrepartita";

const EditorImprevisti = () => {
  const [vociRegistro, setVociRegistro] = useState([]);
  const [nuovoimprevisto, setNuovoImprevisto] = useState(null);

  const AggiornaImprRef = useRef([]);
  const nuovoImprRef = useRef(null);

  const handleNewImpr = (e) => {
    e.preventDefault();
    setNuovoImprevisto(nuovoImprRef.current.value);
    uploadNewImpr(nuovoImprRef);
  };

  const uploadNewImpr = async (impr) => {
    const { data, error } = await supabase
      .from("zz_menzo_Imprevisti")
      .insert([{ descrizione: impr.current.value }])
      .select();
    console.log(data ? data : console.log(error));
  };

  useEffect(() => {
    fetchRegistryList();
  }, [vociRegistro]);

  const fetchRegistryList = async () => {
    const { data } = await supabase.from("zz_menzo_Imprevisti").select("*");
    setVociRegistro(data ? data : []);
  };

  console.log(AggiornaImprRef.current.value);

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-12 px-4 pb-6 font-bold">
      <h1>Editor Imprevisti</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex h-full w-full items-center gap-2 overflow-hidden rounded-lg bg-black/50 p-2 text-gray-300 md:flex-col"
      >
        {/* Lista Imprevisti Attuale */}

        <div className="relative flex h-2/5 w-full flex-col gap-2">
          <h3 className="text-center uppercase text-[--clr-prim]">
            Imprevisti della Community
          </h3>
          <strong className="absolute right-1 top-0 font-semibold">
            # {vociRegistro.length}
          </strong>
          <ul className="flex h-full w-full flex-col-reverse gap-1 overflow-y-auto px-2 pb-2">
            {vociRegistro.map((el) => (
              <li
                key={el.id}
                className="text-md flex items-center justify-between bg-gray-700/20 py-1 ps-2 text-left font-normal hover:bg-gray-600/50"
              >
                <input
                  className="w-full bg-gray-800 pe-6"
                  placeholder={el.descrizione}
                  ref={AggiornaImprRef[el.id]}
                />
                <MdSend
                  size={24}
                  className="cursor-pointer fill-[--clr-prim] transition-all hover:scale-125 hover:fill-[--clr-sec]"
                  onClick={() => console.log(el.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Form "AGGIUNGI Imprevisti" */}

        <div className="flex w-full flex-col items-center gap-2 p-8">
          <h3 className="text-center uppercase text-[--clr-prim]">
            Aggiungi il tuo imprevisto
          </h3>
          <div className="flex h-full w-1/3 flex-col items-center justify-center self-start rounded-md border-4 p-2 font-normal">
            <label className="my-1 block self-start text-xs">
              Titolo Imprevisto
            </label>
            <input
              className="block w-full rounded p-1  text-sm text-black"
              disabled
            />
            <label className="my-1 block self-start text-xs">
              Dettagli Imprevisto
            </label>
            <textarea
              ref={nuovoImprRef}
              rows={3}
              id="nuovoImprevistoInput"
              placeholder="Descrizione dell'imprevisto"
              className="w-full rounded p-1 text-sm text-black"
            />
            <button
              className="mt-2 w-full rounded-lg border border-[--clr-prim] hover:bg-[--clr-prim]"
              onClick={handleNewImpr}
            >
              Salva
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EditorImprevisti;

/* https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks 
  
  https://blog.logrocket.com/react-createref-guide/

*/
