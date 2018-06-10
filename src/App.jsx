import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { injectIntl } from 'react-intl';
import axios from 'axios';
import Translator from "./components/tools/translator";
import Homepage from "./components/pages/Homepage/";
import Contact from "./components/pages/Contact/";
import Products from "./components/pages/Products/";
import Navbar from "./components/sections/Navbar/";
import MobileMenu from "./components/sections/MobileMenu/";
import "./global_styles/global_styles.scss";

class App extends React.Component {

    constructor(props) {

        super(props);
        this.settings = props.settings;
        this.documentTitle = props.intl.formatMessage({ id: 'document.title' });
        this.pagesComponents = {
            homepage: Homepage,
            contact: Contact,
            products: Products
        };
        this.state = {
            pages: [],
            navbarPages: [],
            mobileMenuPages: [],
            currentPageName: ''
        }

    }

    getCurrentPageNameInEnglish() {

        let currentPageName = this.props.location.pathname.split('/')[1];

        if(currentPageName === '') {
            currentPageName = this.props.settings.defaultPageName;
        }

        this.state.pages.forEach((page) => {
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

        axios.get(this.props.settings.apiUrlPages)
            .then(res => {

                const pages = res.data;

                this.setState({pages}, () => {
                    this.setState({
                        currentPageName: this.getCurrentPageNameInEnglish()
                    })
                });

            })

        axios.get(this.props.settings.apiUrlMenus)
            .then(res => {

                const menus = res.data;
                const navbarData = menus.find((menu) => menu['slug'] === 'navbar');
                const mobileMenuData = menus.find((menu) => menu['slug'] === 'mobile-menu');
                const navbarPages = navbarData !== undefined ? navbarData.pages : [];
                const mobileMenuPages = mobileMenuData !== undefined ? mobileMenuData.pages : [];

                this.setState({ navbarPages, mobileMenuPages });

            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {

        this.setState({
            currentPageName: this.getCurrentPageNameInEnglish()
        });

    }

    // Filters the pages of a menu to show only the links to pages
    // created in React, imported in this file and put in the pagesComponents array
    getFilteredPagesOfAMenu = (pagesOfAMenu, menuName) => {

        let filteredPages = [];

        if(this.state.pages.length > 0 && pagesOfAMenu.length > 0) {

            filteredPages = pagesOfAMenu.filter((page) => {
                if(this.pagesComponents.hasOwnProperty(page.slug)) {
                    return true;
                }
                else {
                    console.log('REPTILE WARNING - ', page.title, ' is included in the ', menuName,' menu but has not been created in React.')
                    return false;
                }

            });

        }

        return filteredPages;

    };

    render() {

        let filteredNavbarPages = this.getFilteredPagesOfAMenu(this.state.navbarPages, 'navbar');
        let filteredMobileMenuPages = this.getFilteredPagesOfAMenu(this.state.mobileMenuPages, 'mobile');

        return (
            <div>
                <Helmet>
                    <title>{this.documentTitle}</title>
                </Helmet>
                {(filteredNavbarPages.length > 0 && this.settings.viewportWidth > this.settings.mobileMenuBreakpoint) &&
                    <Navbar pages={filteredNavbarPages} availableLangs={this.settings.availableLangs} currentPageName={this.state.currentPageName} />
                }
                {(filteredMobileMenuPages.length > 0 && this.settings.viewportWidth <= this.settings.mobileMenuBreakpoint) &&
                    <MobileMenu pages={filteredMobileMenuPages} availableLangs={this.settings.availableLangs} currentPageName={this.state.currentPageName} />
                }
                {this.state.pages.length > 0 &&
                    <Switch>
                        {this.settings.availableLangs.map((availableLang) => {
                            return this.state.pages.map((page) => {
                                return (
                                    <Route exact path={"/" + Translator(page.post_name + ".slug", availableLang)} component={this.pagesComponents[page.post_name]} />
                                )
                            })
                        })}
                        <Redirect to="/"/>
                    </Switch>
                }
            </div>
        )
    }

}

export default withRouter(injectIntl(App));