import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { injectIntl } from 'react-intl';
import axios from 'axios';
import withFetching from "./components/hoc/WithFetching";
import Homepage from "./components/pagesTemplates/Homepage/";
import Contact from "./components/pagesTemplates/Contact/";
import Products from "./components/pagesTemplates/Products/";
import Navbar from "./components/sections/Navbar/";
import MobileMenu from "./components/sections/MobileMenu/";
import "./global_styles/global_styles.scss";

class App extends React.Component {

    constructor(props) {

        super(props);
        this.settings = props.settings;
        this.documentTitle = props.intl.formatMessage({ id: 'document.title' });
        this.state = {
            pagesLoadedViaAPI: [],
            navbarPagesLoadedViaAPI: [],
            mobileMenuPagesLoadedViaAPI: []
        }

    }

    componentDidMount() {

        let pagesLoadedViaAPI = [];
        let apiUrlPages = this.props.settings.apiUrlPages;
        let apiUrlMenus = this.props.settings.apiUrlMenus;

        // This is to prevent a bug caused by Wordpress WPML, where when an API request is done with
        // the lang GET parameter with the default language as the value, it redirects to the same URL
        // without the GET parameter, causing issues because of CORS
        if(this.props.intl.locale !== this.props.settings.defaultLang) {
            apiUrlPages += `?lang=${this.props.intl.locale}`;
            apiUrlMenus += `?lang=${this.props.intl.locale}`;
        }

        axios.get(apiUrlPages)
            .then(res => { return res.data; })
            .then((pages) => {
                pagesLoadedViaAPI = pages;
                axios
                    .get(apiUrlMenus)
                    .then(res => { return res.data; })
                    .then((menus) => {

                        const navbarData = menus.find((menu) => menu['slug'].indexOf('navbar') !== -1);
                        const mobileMenuData = menus.find((menu) => menu['slug'].indexOf('mobile-menu') !== -1);
                        const navbarPagesLoadedViaAPI = navbarData !== undefined ? navbarData.pages : [];
                        const mobileMenuPagesLoadedViaAPI = mobileMenuData !== undefined ? mobileMenuData.pages : [];

                        this.setState({ navbarPagesLoadedViaAPI, mobileMenuPagesLoadedViaAPI, pagesLoadedViaAPI});

                    });

            });
    }

    getRoute = (page) => {

        let defaultRouteProps = {
            key: 'route-' + page.ID,
            exact: true,
            path: `/${page.slugs[this.props.intl.locale]}`
        };

        let apiUrl = this.props.settings.apiUrlPages + '/' + page.ID;

        // This is to prevent a bug caused by Wordpress WPML, where when an API request is done with
        // the lang GET parameter with the default language as the value, it redirects to the same URL
        // without the GET parameter, causing issues because of CORS
        if(this.props.intl.locale !== this.props.settings.defaultLang) {
            apiUrl += `?lang=${this.props.intl.locale}`;
        }

        switch(page.template) {
            case 'homepage':
                return <Route {...defaultRouteProps} component={withFetching(apiUrl)(Homepage)} />;
                break;
            case 'contact':
                return <Route {...defaultRouteProps} component={withFetching(apiUrl)(Contact)} />;
                break;
            case 'products':
                return <Route {...defaultRouteProps} component={withFetching(apiUrl)(Products)} />;
                break;
        }

    };

    render() {

        const navbarPages = this.state.navbarPagesLoadedViaAPI;
        const mobileMenuPages = this.state.mobileMenuPagesLoadedViaAPI;
        const pages = this.state.pagesLoadedViaAPI;
        const currentPageName = this.props.location.pathname.split('/')[1];

        let currentPageSlugs = null;

        if(pages.length > 0) {
            if(currentPageName === '') {
                currentPageSlugs = {};
                Object.keys(this.settings.availableLangs).map((availableLang) => {
                    currentPageSlugs[availableLang] = "";
                });
            }
            else {
                currentPageSlugs = pages.find((page) => page.slugs[this.props.intl.locale] === currentPageName)['slugs'];
            }
        }

        return (
            <div>
                <Helmet>
                    <title>{this.documentTitle}</title>
                </Helmet>
                {(navbarPages.length > 0 && this.settings.viewportWidth > this.settings.mobileMenuBreakpoint) &&
                    <Navbar pages={navbarPages} availableLangs={this.settings.availableLangs} currentPageSlugs={currentPageSlugs} />
                }
                {(mobileMenuPages.length > 0 && this.settings.viewportWidth <= this.settings.mobileMenuBreakpoint) &&
                    <MobileMenu pages={mobileMenuPages} availableLangs={this.settings.availableLangs} currentPageSlugs={currentPageSlugs} />
                }
                {pages.length > 0 &&
                    <Switch>
                        {pages.map((page) => {
                            return this.getRoute(page);
                        })}
                    </Switch>
                }
            </div>
        )
    }

}

export default withRouter(injectIntl(App));