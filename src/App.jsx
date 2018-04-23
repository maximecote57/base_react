import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Helmet} from "react-helmet";
import {injectIntl} from 'react-intl';

import Homepage from "./components/pages/Homepage";
import Simulator from './components/pages/Simulator';

import "./global_styles/global_styles.scss";

class App extends Component {

    constructor() {
        super();
        this.availableLangs = ["en", "fr"];
    }

    render() {
        const intl = this.props.intl;
        const documentTitle = intl.formatMessage({ id: 'document.title' })
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{documentTitle}</title>
                    <link rel="canonical" href="http://opheliafintech.com" />
                </Helmet>
                <Route path="/" exact render={(...props) => <Homepage {...props} availableLangs={this.availableLangs} />} />
                <Route path="/simulator" component={Simulator} />
            </div>
        )
    }
}

export default injectIntl(App);