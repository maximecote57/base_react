import React from "react";
import { Link } from 'react-router-dom';

import logo_ophelia from "../../images/logo_ophelia.svg";
import logo_desjardins from "../../images/logo_desjardins.svg";

import "./_navbar.scss";

const Navbar = () => (
    <div className="navbar component">
        <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
                <Link to="/">
                    <img src={logo_ophelia} width={100} />
                </Link>
                <Link to="https://www.desjardins.com/" target="_blank">
                    <img src={logo_desjardins} width={170} />
                </Link>
            </div>
        </div>
    </div>
);

export default Navbar;