import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {Helmet} from "react-helmet";
import {injectIntl} from 'react-intl';

import Translator from "./components/tools/translator";
import Homepage from "./components/pages/Homepage";
import Contact from "./components/pages/Contact";
import Navbar from "./components/sections/Navbar";
import MobileMenu from "./components/sections/MobileMenu";

import "./global_styles/global_styles.scss";

class App extends Component {

    constructor({intl}) {
        super();
        this.intl = intl;
    }

    render() {
        const documentTitle = this.intl.formatMessage({ id: 'document.title' });
        return (
            <div>
                <Helmet>
                    <title>{documentTitle}</title>
                </Helmet>
                { this.props.viewportWidth > this.props.mobileMenuBreakpoint && <Navbar availableLangs={this.props.availableLangs} /> }
                { this.props.viewportWidth <= this.props.mobileMenuBreakpoint && <MobileMenu availableLangs={this.props.availableLangs}  /> }
                <Switch>
                    {/* Generic routes */}
                    <Route path="/" exact render={(...props) => <Homepage {...props} availableLangs={this.props.availableLangs} />} />
                    {/* EN routes */}
                    <Route path={"/" + Translator('contact.slug', 'en')} component={Contact} />
                    {/* FR routes */}
                    <Route path={"/" + Translator('contact.slug', 'fr')} component={Contact} />
                </Switch>
            </div>
        )
    }
}

export default injectIntl(App);