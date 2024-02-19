import "./App.css";
//import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sfondo from "./Components/Sfondo";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        showLinks={false}
        theme="dark"
        providers={[]}
        localization={{
          variables: {
            sign_in: {
              email_label: "Il tuo indirizzo email",
              password_label: "La tua password",
              email_input_placeholder: "Inserisci il tuo indirizzo email",
              password_input_placeholder: "Inserisci la tua password",
            },
          },
        }}
        className="w-1/2"
      />
    );
  } else {
    return (
      <main className="h-screen w-screen overflow-hidden">
        <Router>
          <Navbar />
          <AnimatedRoutes />
        </Router>
        <Footer user={session.user.email} />
        <Sfondo />
      </main>
    );
  }
}
export default App;
