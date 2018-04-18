import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import HomePage from "./components/pages/HomePage"
import LoginPage from "./components/pages/LoginPage"

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/login" component={LoginPage}/>
            </div>
        )
    }
}

export default App;