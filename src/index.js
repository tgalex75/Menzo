import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/regContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <CartProvider>
            <App />
        </CartProvider>
    </>
);
