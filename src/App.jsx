import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Simulator from './components/pages/Simulator';

import "./global_styles/global_styles.scss";

const App = () => (
    <Route path="/" component={Simulator} exact/>
)

export default App;