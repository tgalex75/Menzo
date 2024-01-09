export default function Dashboard() {
    async function handleSignOut() {
      // @TODO: add sign out logic
    }
  
    return (
      <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
        <div
          className="flex h-64 flex-col justify-between gap-4 border-2 bg-black/25 p-16 rounded-xl border-[--clr-ter]">
        <p>Welcome!</p>
        <button onClick={handleSignOut}>Sign out</button>
        </div>
      </section>
    )
  }