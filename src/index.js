import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import Strings from "./strings.json";
import App from "./App";
import Cookies from 'universal-cookie';

addLocaleData(en);
addLocaleData(fr);

const cookies = new Cookies();
const availableLangs = ["en", "fr"];
const currentURLPathname = window.location.pathname;
const firstPathSegment = currentURLPathname !== "/" ? currentURLPathname.split('/')[1] : "";
const viewportWidth = window.innerWidth;
const mobileMenuBreakpoint = 991;

let currentLang = "en";

if(availableLangs.indexOf(firstPathSegment) !== -1 ) {
    currentLang = firstPathSegment;
}
else if(cookies.get('lang')) {
    currentLang = cookies.get('lang');
}

ReactDOM.render(
    <IntlProvider locale={currentLang} messages={Strings[currentLang]}>
        <BrowserRouter basename={"/" + currentLang}>
            <App availableLangs={availableLangs} viewportWidth={viewportWidth} mobileMenuBreakpoint={mobileMenuBreakpoint} />
        </BrowserRouter>
    </IntlProvider>
    , document.getElementById('app'));