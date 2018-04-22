import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Homepage from "./components/pages/Homepage";
import Simulator from './components/pages/Simulator';

import "./global_styles/global_styles.scss";

const App = () => (
    <div>
        <Route path="/" component={Homepage} exact/>
        <Route path="/simulator" component={Simulator} />
    </div>

)

export default App;