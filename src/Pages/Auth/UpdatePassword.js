import React, { useRef, useState } from "react";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { updatePassword } = useAuth();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordRef.current?.value || !confirmPasswordRef.current?.value) {
      setErrorMsg("Si prega di compilare tutti i campi");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg(
        "Le password non corrispondono. Si prega di controllare nuovamente",
      );
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await updatePassword(passwordRef.current.value);
      if (!error) {
        navigate("/");
      }
    } catch (error) {
      setErrorMsg(
        "Si è verificato un errore nell'aggiornamento della password. Si prega di riprovare.",
      );
    }
    setLoading(false);
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h2 className="text-lg font-semibold">Aggiorna Password</h2>
      <form
        onSubmit={handleSubmit}
        className="flex h-2/3 w-3/4 flex-col items-center justify-around rounded-lg border-2 border-[--clr-prim] p-4 md:h-1/2 md:w-1/3"
      >
        <div id="password" className="flex w-full flex-col items-center gap-1">
          <label>Password</label>
          <input
            className="w-full rounded-md p-1 font-semibold text-black"
            type="password"
            ref={passwordRef}
            required
          />{" "}
        </div>
        <div id="confirm-password" className="flex flex-col items-center gap-1 w-full">
          <label>Conferma Password</label>
          <input
            className="w-full rounded-md p-1 font-semibold text-black"
            type="password"
            ref={confirmPasswordRef}
            required
          />
        </div>
        {errorMsg && (
          <alert onClose={() => setErrorMsg("")} dismissible>
            {errorMsg}
          </alert>
        )}
        <div className="mt-2 text-center w-full">
        <button
            disabled={loading}
            type="submit"
            className="w-full md:w-1/2 h-auto rounded-md border border-[--clr-prim] px-0 md:px-6 py-2 font-semibold hover:bg-[--clr-prim]"
          >
            Aggiorna
          </button>
        </div>
      </form>
    </main>
  );
};

export default UpdatePassword;
