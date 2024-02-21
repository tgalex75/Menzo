import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Si prega di compilare tutti i campi");
        return;
      }
      const {
        data: { user, session },
        error,
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMsg("Email o Password non corrette");
    }
    setLoading(false);
  };

  return (
    <main className="flex h-screen w-full gap-2 flex-col items-center justify-center">
      <h2 className="font-semibold text-lg">Effettua il Login</h2>
      <form
        onSubmit={handleSubmit}
        className="flex h-2/3 md:h-1/2 w-3/4 md:w-1/3 flex-col items-center justify-around rounded-lg border-2 border-[--clr-prim] p-4"
      >
        <div id="email" className="flex flex-col items-center gap-1 w-full">
          <label>Email</label>
          <input
            className="rounded-md p-1 font-semibold text-black w-full"
            type="email"
            ref={emailRef}
            required
          />
        </div>
        <div id="password" className="flex flex-col items-center gap-1 w-full">
          <label>Password</label>
          <input
            className="rounded-md p-1 font-semibold text-black w-full"
            type="password"
            ref={passwordRef}
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
            Login
          </button>
        </div>
      </form>
      <div className="w-100 mt-2 text-center font-semibold">
        Nuovo Utente? <Link className="text-[--clr-prim] hover:text-[--clr-sec] " to={"/signup"}>Registrati</Link>
      </div>
      <div className="w-100 mt-2 text-center font-semibold">
        Password dimenticata? <Link className="text-[--clr-prim] hover:text-[--clr-sec] " to={"/password-reset"}>Clicca qui</Link>
      </div>
    </main>
  );
};

export default Login;
