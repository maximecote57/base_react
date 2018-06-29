import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import Strings from "./strings.json";
import App from "./App";
import Cookies from 'universal-cookie';
import { appSettings } from "./SettingsContext";
import axios from 'axios';

axios.get(appSettings.apiUrlSettings)
    .then(res => { return res.data; })
    .then((wordpressSettings) => {

        const settings = {...appSettings, ...wordpressSettings};

        addLocaleData(en);
        addLocaleData(fr);

        const cookies = new Cookies();
        const currentURLPathname = window.location.pathname;
        const firstPathSegment = currentURLPathname !== "/" ? currentURLPathname.split('/')[1] : "";
        let currentLang = null;

        if(settings.availableLangs[firstPathSegment] !== undefined ) {
            currentLang = firstPathSegment;
        }
        else if(cookies.get('lang')) {
            currentLang = cookies.get('lang');
        }
        else {
            currentLang = settings.defaultLang;
        }

        ReactDOM.render(
            <IntlProvider locale={currentLang} messages={Strings[currentLang]}>
                <BrowserRouter basename={"/" + currentLang}>
                    <App settings={settings} />
                </BrowserRouter>
            </IntlProvider>
            , document.getElementById('app'));
    });