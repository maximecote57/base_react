import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from "./components/sections/Navbar";
import Simulator from './components/pages/Simulator';

import "./global_styles/global_styles.scss";

const App = () => (
    <div>
        <Navbar />
        <Route path="/" component={Simulator} exact/>
    </div>

)

export default App;