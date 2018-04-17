import React, { Component } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import './Navbar.scss';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar component">
                <div className="navbar__section navbar__section--left">
                    <div>Logo</div>
                </div>
                <div className="navbar__section navbar__section--right">
                    <ul className="navbar__list">
                        <li className="navbar__list-item">
                            <Link className="navbar__link" to="/">Home</Link>
                        </li>
                        <li className="navbar__list-item">
                            <Link className="navbar__link" to="/Login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Navbar;