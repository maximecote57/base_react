import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";
import {injectIntl} from 'react-intl';

import Translator from "./components/tools/translator";
import Homepage from "./components/pages/Homepage";
import Contact from "./components/pages/Contact";
import Products from "./components/pages/Products";
import Navbar from "./components/sections/Navbar";
import MobileMenu from "./components/sections/MobileMenu";

import "./global_styles/global_styles.scss";

const App = (props) => {

    const settings = props.settings;
    const documentTitle = props.intl.formatMessage({ id: 'document.title' });
    const pages = [
        {
            name: "homepage",
            component: Homepage
        },
        {
            name: "contact",
            component: Contact
        },
        {
            name: "products",
            component: Products
        }
    ];
    let currentPageName = props.location.pathname.split('/')[1];

    // If the current locale is not english, we get the page name in english as we need it to get the slugs in strings.json as the keys are in english
    if(props.intl.locale !== "en") {
        pages.forEach((page) => {
            if(props.intl.messages[page.name + '.slug']) {
                const slug = props.intl.formatMessage({ id: page.name + '.slug' });
                if(slug === currentPageName) {
                    currentPageName = Translator(page.name + ".slug", "en");
                }
            }
        })
    }

    return (
        <div>
            <Helmet>
                <title>{documentTitle}</title>
            </Helmet>
            { settings.viewportWidth > settings.mobileMenuBreakpoint && <Navbar availableLangs={settings.availableLangs} currentPageName={currentPageName} /> }
            { settings.viewportWidth <= settings.mobileMenuBreakpoint && <MobileMenu availableLangs={settings.availableLangs} currentPageName={currentPageName} /> }
            <Switch>
                {settings.availableLangs.map((availableLang) => {
                    return pages.map((page) => {
                        return (
                            <Route exact path={"/" + Translator(page.name + ".slug", availableLang)} component={page.component} />
                        )
                    })
                })}
                <Redirect to="/"/>
            </Switch>
        </div>
    )

}

export default withRouter(injectIntl(App));