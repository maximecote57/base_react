import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import Strings from "./strings.json";
import Cookies from 'universal-cookie';

import Homepage from "./components/pages/Homepage";
import Simulator from './components/pages/Simulator';

import "./global_styles/global_styles.scss";

const cookies = new Cookies();

addLocaleData(fr);
addLocaleData(en);

class App extends Component {

    constructor() {
        super();
        this.state = {
            currentLang: cookies.get('lang') || "en",
            availableLangs: ["en", "fr"]
        }
    }

    updateDocumentTitle = () => {
        document.title = this.state.currentLang == "en" ? 'Ophelia | Get the best out of your debts' : 'Ophelia | Tirez le meilleur de vos dettes';
    }

    componentDidMount() {
        this.updateDocumentTitle();
    }

    componentDidUpdate() {
        this.updateDocumentTitle();
    }

    handleLangChange = (newLang) => {
        this.setState({
            currentLang: newLang
        }, () => cookies.set('lang', newLang))
    }

    render() {
        return (
            <IntlProvider locale={this.state.currentLang} messages={Strings[this.state.currentLang]}>
                <div>
                    <Route path="/" exact render={(...props) => <Homepage {...props} currentLang={this.state.currentLang} availableLangs={this.state.availableLangs} onLangChange={this.handleLangChange} />} />
                    <Route path="/simulator" component={Simulator} />
                </div>
            </IntlProvider>
        );
    }
}

export default App;