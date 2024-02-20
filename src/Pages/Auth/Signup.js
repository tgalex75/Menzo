import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Register = () => {
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
          "Registration Successful. Check your email to confirm your account",
        );
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
    }
    setLoading(false);
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex h-1/2 w-1/3 flex-col items-center justify-around rounded-lg border-2 border-[--clr-prim] p-4"
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
        <div id="confir-password" className="flex flex-col items-center gap-1 w-full">
          <label>Confirm Password</label>
          <input
            className="rounded-md p-1 font-semibold text-black w-full"
            type="password"
            ref={confirmPasswordRef}
            required
          />
        </div>
        {errorMsg && (
          <alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
            {errorMsg}
          </alert>
        )}
        {msg && (
          <alert variant="success" onClose={() => setMsg("")} dismissible>
            {msg}
          </alert>
        )}
        <div className="mt-2 text-center">
          <button
            disabled={loading}
            type="submit"
            className="w-50 rounded-md border border-[--clr-prim] px-6 py-2 font-semibold hover:bg-[--clr-prim]"
          >
            Register
          </button>
        </div>
      </form>
      <div className="w-100 mt-2 text-center font-semibold">
        Already a User?{" "}
        <Link
          className="text-[--clr-prim] hover:text-[--clr-sec] "
          to={"/login"}
        >
          Login
        </Link>
      </div>
    </main>
  );
};

export default Register;
