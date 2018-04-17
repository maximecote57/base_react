import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from "./views/Home"
import Login from "./views/Login"

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/login" component={Login}/>
            </div>
        )
    }
}

export default App;