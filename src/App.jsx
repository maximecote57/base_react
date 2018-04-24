import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {Helmet} from "react-helmet";
import {injectIntl} from 'react-intl';

import Translator from "./components/tools/translator";
import Homepage from "./components/pages/Homepage";
import Simulator from './components/pages/Simulator';

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
                <Switch>
                    {/* Generic routes */}
                    <Route path="/" exact render={(...props) => <Homepage {...props} availableLangs={this.props.availableLangs} />} />
                    {/* EN routes */}
                    <Route path={"/" + Translator('simulator.slug', 'en')} component={Simulator} />
                    {/* FR routes */}
                    <Route path={"/" + Translator('simulator.slug', 'fr')} component={Simulator} />
                </Switch>
            </div>
        )
    }
}

export default injectIntl(App);