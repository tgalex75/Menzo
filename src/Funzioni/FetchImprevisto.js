import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function FetchData() {
  const [imprevisto, setImprevisto] = useState([]);

  useEffect(() => {
    fetchLista();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      delElemento();
    }, 3000);
  });

  const fetchLista = async () => {
    const { data } = await supabase
      .from("ordine_casuale")
      .select("*")
      .limit(1)
      .single();
    setImprevisto(data ? data : { id: 0, descrizione: "LISTA VUOTA!!!" });
  };

  const delElemento = async () => {
    const { error } = await supabase
      .from("zz_menzo_Imprevisti")
      .delete("id")
      .eq("id", imprevisto.id);
    error && console.log(error);
  };

  return (
    <p
      style={{ fontFamily: "'Roboto', cursive" }}
      className={`h-fit flex-1 overflow-y-auto px-4 ${
        imprevisto.descrizione && imprevisto.descrizione.length > 200
          ? "text-sm md:text-xl"
          : "text-xl md:text-2xl"
      }`}
    >
      {imprevisto.descrizione}
    </p>
  );
}
