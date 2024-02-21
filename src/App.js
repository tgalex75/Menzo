import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sfondo from "./Components/Sfondo";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/Auth";
import AuthRoute from "./Components/AuthRoute";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import PasswordReset from "./Pages/Auth/PasswordReset";
import UpdatePassword from "./Pages/Auth/UpdatePassword";

function App() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="*" element={<AnimatedRoutes />} />
              <Route path="/home" element={<AnimatedRoutes />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
      <Sfondo />
    </main>
  );
}

export default App;
