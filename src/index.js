console.log(' --- App Started --- ');

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'

import "./global_styles/global_styles.scss";

import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('app'));