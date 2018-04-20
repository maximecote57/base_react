import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Simulator from './components/pages/Simulator';

import "./global_styles/global_styles.scss";

class App extends React.Component {
    render() {
        return (
            <div>
                <Route path="/" component={Simulator} exact/>
            </div>
        )
    }
}

export default App;