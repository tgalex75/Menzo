import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    // @TODO: add sign up logic
  }

  return (
    <>
      <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
        <form
          className="flex max-h-fit flex-col gap-4 rounded-xl border-2 border-[--clr-ter] bg-black/25 p-8"
          onSubmit={handleSubmit}
        >
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" ref={emailRef} />

          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={passwordRef} />

          <br />

          <button type="submit">Sign up</button>
        </form>

        <br />

        <p>
          Hai già un account? <Link to="/login">Log In</Link>
        </p>
      </section>
    </>
  );
}
