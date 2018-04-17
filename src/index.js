console.log(' --- App Started --- ');

console.log(' --- Importing Node Dependencies --- ');
import React from "react";
import ReactDOM from "react-dom";

console.log(' --- Importing Global Styles --- ');
import "./global/global.scss";

console.log(' --- Importing Components --- ');
import Navbar from "./components/Navbar";

ReactDOM.render(
    <div>
        <Navbar/>
    </div>,
    document.querySelector("#app")
);