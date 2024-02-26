import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function FetchImprevisto() {
  const [imprevisto, setImprevisto] = useState([]);

  useEffect(() => {
    fetchLista();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      delElemento();
    }, 2000);
  });

  const fetchLista = async () => {
    const { data } = await supabase
      .from("ordine_casuale")
      .select("*")
      .limit(1)
      .single();
    setImprevisto(data ? data : { id: 0, titolo: "", descrizione: "LISTA VUOTA!!!" });
  };

  const delElemento = async () => {
    const { error } = await supabase
      .from("zz_menzo_Imprevisti")
      .delete("id")
      .eq("id", imprevisto.id);
    error && console.log(error);
  };

  return (
    <>
      {imprevisto.titolo && <h4 className="text-3xl md:text-5xl uppercase mb-4">{imprevisto.titolo}</h4>}
      <p
        style={{ fontFamily: "'Roboto', cursive" }}
        className={`w-full md:w-3/4 h-fit flex-1 overflow-y-auto px-4 italic ${
          imprevisto.descrizione && imprevisto.descrizione.length > 200
            ? "text-sm md:text-xl"
            : "text-xl md:text-2xl"
        }`}
      >
        {imprevisto.descrizione}
      </p>
    </>
  );
}
