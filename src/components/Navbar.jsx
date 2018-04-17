import React, { Component } from "react";
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
                            <a className="navbar__link" href="javascript:void(0)">Home</a>
                        </li>
                        <li className="navbar__list-item">
                            <a className="navbar__link" href="javascript:void(0)">About</a>
                        </li>
                        <li className="navbar__list-item">
                            <a className="navbar__link" href="javascript:void(0)">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Navbar;