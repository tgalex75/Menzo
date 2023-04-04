import React from "react";
import { MdSend } from "react-icons/md";
import "./SendButtonStyle.css";

function SendButton() {
    return (
        <div className="sendButton">
            <MdSend />
            {/* <small>Estrai</small> */}
        </div>
    );
}

export default SendButton;
