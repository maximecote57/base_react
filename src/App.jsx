import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { injectIntl } from 'react-intl';
import axios from 'axios';
import withFetching from "./components/hoc/WithFetching";
import Translator from "./components/tools/Translator";
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
            mobileMenuPagesLoadedViaAPI: [],
            currentPageName: '',
            pagesContents: {}
        }

    }

    getCurrentPageNameInEnglish(pages) {

        let currentPageName = this.props.location.pathname.split('/')[1];

        if(currentPageName === '') {
            currentPageName = this.props.settings.defaultPageName;
        }

        pages.forEach((page) => {
            if(this.props.intl.messages[page.post_name + '.slug']) {
                const slug = this.props.intl.formatMessage({ id: page.post_name + '.slug' });
                if(slug === currentPageName) {
                    currentPageName = Translator(page.post_name + ".slug", "en");
                }
            }
        })

        return currentPageName;

    }

    componentDidMount() {

        let pagesLoadedViaAPI = [];

        axios.get(this.props.settings.apiUrlPages)
            .then(res => { return res.data; })
            .then((pages) => {
                pagesLoadedViaAPI = pages;
                axios
                    .get(this.props.settings.apiUrlMenus)
                    .then(res => { return res.data; })
                    .then((menus) => {

                        const navbarData = menus.find((menu) => menu['slug'] === 'navbar');
                        const mobileMenuData = menus.find((menu) => menu['slug'] === 'mobile-menu');
                        const navbarPagesLoadedViaAPI = navbarData !== undefined ? navbarData.pages : [];
                        const mobileMenuPagesLoadedViaAPI = mobileMenuData !== undefined ? mobileMenuData.pages : [];

                        this.setState({ navbarPagesLoadedViaAPI, mobileMenuPagesLoadedViaAPI, pagesLoadedViaAPI, currentPageName: this.getCurrentPageNameInEnglish(pagesLoadedViaAPI) });

                    });

            });
    }

    getRoute = (page) => {

        let defaultRouteProps = {
            key: 'route-' + page.ID,
            exact: true,
            path: '/' + Translator(page.post_name + ".slug", this.props.intl.locale)
        };

        const apiUrl = this.props.settings.apiUrlPages + '/' + page.ID + `?lang=${this.props.intl.locale}`;

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

        return (
            <div>
                <Helmet>
                    <title>{this.documentTitle}</title>
                </Helmet>
                {(navbarPages.length > 0 && this.settings.viewportWidth > this.settings.mobileMenuBreakpoint) &&
                    <Navbar pages={navbarPages} availableLangs={this.settings.availableLangs} currentPageName={this.state.currentPageName} />
                }
                {(mobileMenuPages.length > 0 && this.settings.viewportWidth <= this.settings.mobileMenuBreakpoint) &&
                    <MobileMenu pages={mobileMenuPages} availableLangs={this.settings.availableLangs} currentPageName={this.state.currentPageName} />
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