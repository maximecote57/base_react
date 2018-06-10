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
            pagesLoadedViaAPI: [],
            navbarPagesLoadedViaAPI: [],
            mobileMenuPagesLoadedViaAPI: [],
            currentPageName: ''
        }

    }

    getCurrentPageNameInEnglish() {

        let currentPageName = this.props.location.pathname.split('/')[1];

        if(currentPageName === '') {
            currentPageName = this.props.settings.defaultPageName;
        }

        this.state.pagesLoadedViaAPI.forEach((page) => {
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

                const pagesLoadedViaAPI = res.data;

                this.setState({pagesLoadedViaAPI}, () => {
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
                const navbarPagesLoadedViaAPI = navbarData !== undefined ? navbarData.pages : [];
                const mobileMenuPagesLoadedViaAPI = mobileMenuData !== undefined ? mobileMenuData.pages : [];

                this.setState({ navbarPagesLoadedViaAPI, mobileMenuPagesLoadedViaAPI });

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

    // Filters the pages of a menu loaded via the API to show only the links to pages
    // created in React, imported in this file and put in the pagesComponents array
    getFilteredPagesOfAMenu = (pagesOfAMenu, menuName) => {

        let filteredPagesOfAMenu = [];

        if(this.state.pagesLoadedViaAPI.length > 0 && pagesOfAMenu.length > 0) {

            filteredPagesOfAMenu = pagesOfAMenu.filter((page) => {
                if(this.pagesComponents.hasOwnProperty(page.slug)) {
                    return true;
                }
                else {
                    console.warn('REPTILE WARNING - ', page.title, ' is included in the ', menuName,' menu loaded via the API but has not been created in React.')
                    return false;
                }

            });

        }

        return filteredPagesOfAMenu;

    };

    // Filters the pages loaded via the API to render pages
    // also created in React, imported in this file and put in the pagesComponents array
    getFilteredPages = () => {

      let filteredPages = [];

      if(this.state.pagesLoadedViaAPI.length > 0) {

          filteredPages = this.state.pagesLoadedViaAPI.filter((page) => {

              if(this.pagesComponents[page.post_name] !== undefined) {
                  return true;
              }
              else {
                  console.warn('REPTILE WARNING - ', page.post_title, ' is included in the pages loaded via the API, but has not been created in React.')
                  return false;
              }

          });

      }

      return filteredPages;

    };

    render() {

        let filteredNavbarPages = this.getFilteredPagesOfAMenu(this.state.navbarPagesLoadedViaAPI, 'navbar');
        let filteredMobileMenuPages = this.getFilteredPagesOfAMenu(this.state.mobileMenuPagesLoadedViaAPI, 'mobile');
        let filteredPages = this.getFilteredPages();

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
                {filteredPages.length > 0 &&
                    <Switch>
                        {this.settings.availableLangs.map((availableLang) => {
                            return filteredPages.map((page) => {
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