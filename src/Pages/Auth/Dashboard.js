import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

export default function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth();

  const history = useNavigate();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push("/login");
  }

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <div className="flex h-64 flex-col justify-between gap-4 rounded-xl border-2 border-[--clr-ter] bg-black/25 p-16">
        <p>Welcome!</p>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </section>
  );
}
