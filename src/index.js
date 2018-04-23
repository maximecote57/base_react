import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import {IntlProvider, addLocaleData, FormattedMessage} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import Strings from "./strings.json";
import App from "./App";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const defaultLang = "en";
const currentLang =  cookies.get('lang') || defaultLang;

addLocaleData(en);
addLocaleData(fr);

ReactDOM.render(
    <IntlProvider locale={currentLang} messages={Strings[currentLang]}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </IntlProvider>
    , document.getElementById('app'));