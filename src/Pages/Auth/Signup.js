import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const register = (email, password) =>
    supabase.auth.signUp({ email, password });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value,
      );
      if (!error && data) {
        setMsg(
          "Registrazione effettuata con successo. Verifica la tua mail per confermare il tuo account",
        );
      }
    } catch (error) {
      setErrorMsg("Errore  durante la creazione dell'account");
    }
    setLoading(false);
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h2 className="text-lg font-semibold">Effettua la Registrazione</h2>
      <form
        onSubmit={handleSubmit}
        className="flex h-2/3 w-3/4 flex-col items-center justify-around rounded-lg border-2 border-[--clr-prim] p-4 md:h-1/2 md:w-1/3"
      >
        <div id="email" className="flex w-full flex-col items-center gap-1">
          <label>Email</label>
          <input
            className="w-full rounded-md p-1 font-semibold text-black"
            type="email"
            ref={emailRef}
            required
          />
        </div>
        <div id="password" className="flex w-full flex-col items-center gap-1">
          <label>Password</label>
          <input
            className="w-full rounded-md p-1 font-semibold text-black"
            type="password"
            ref={passwordRef}
            required
          />
        </div>
        <div
          id="confirm-password"
          className="flex w-full flex-col items-center gap-1"
        >
          <label>Confirm Password</label>
          <input
            className="w-full rounded-md p-1 font-semibold text-black"
            type="password"
            ref={confirmPasswordRef}
            required
          />
        </div>
        {errorMsg && (
          <alert  onClose={() => setErrorMsg("")} dismissible>
            {errorMsg}
          </alert>
        )}
        {msg && (
          <alert onClose={() => setMsg("")} dismissible>
            {msg}
          </alert>
        )}
        <div className="mt-2 text-center">
          <button
            disabled={loading}
            type="submit"
            className="w-50 rounded-md border border-[--clr-prim] px-6 py-2 font-semibold hover:bg-[--clr-prim]"
          >
            Registrati
          </button>
        </div>
      </form>
      <div className="w-100 mt-2 text-center font-semibold">
        Hai già un account?{" "}
        <Link
          className="text-[--clr-prim] hover:text-[--clr-sec] block"
          to={"/login"}
        >
          Effettua il Login
        </Link>
      </div>
    </main>
  );
};

export default Signup;
