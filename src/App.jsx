import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {IntlProvider, addLocaleData, FormattedMessage} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import Strings from "./strings.json";
import Cookies from 'universal-cookie';
import {Helmet} from "react-helmet";

import Homepage from "./components/pages/Homepage";
import Simulator from './components/pages/Simulator';

import "./global_styles/global_styles.scss";

const cookies = new Cookies();
const defaultLang = "en";
const availableLangs = ["en", "fr"];

addLocaleData(en);
addLocaleData(fr);

class App extends Component {

    constructor() {
        super();
        this.state = {
            currentLang: cookies.get('lang') || defaultLang,
            availableLangs: availableLangs
        }
    }

    handleLangChange = (newLang) => {
        this.setState({
            currentLang: newLang
        }, () => cookies.set('lang', newLang))
    }

    render() {
        const {intl} = new IntlProvider({
            locale: this.state.currentLang,
            messages: Strings[this.state.currentLang],
        }, {}).getChildContext();
        const documentTitle = intl.formatMessage({id: "document.title" });
        return (
            <IntlProvider locale={this.state.currentLang} messages={Strings[this.state.currentLang]}>
                <div>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>{documentTitle}</title>
                        <link rel="canonical" href="http://opheliafintech.com" />
                    </Helmet>
                    <Route path="/" exact render={(...props) => <Homepage {...props} currentLang={this.state.currentLang} availableLangs={this.state.availableLangs} onLangChange={this.handleLangChange} />} />
                    <Route path="/simulator" component={Simulator} />
                </div>
            </IntlProvider>
        );
    }
}

export default App;