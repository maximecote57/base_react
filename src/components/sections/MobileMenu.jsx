/*

    Add pages you want links in the pagesToPutLinks array.
    Add external URLs you want links in the externalURLsToPutLinks, in the {title : titleOfTheLink, url: urlOfTheLink} format.

 */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { injectIntl, FormattedMessage } from 'react-intl';

import LangSwitcher from "../molecules/LangSwitcher";

import "./_mobile-menu.scss";

class MobileMenu extends React.Component {

    constructor() {

        super();

        this.pagesToPutLinks= [
            "homepage",
            "contact"
        ];
        this.externalURLsToPutLinks= [
            {
                title : "mobile-menu.reptile-title",
                url : "https://reptile.tech"
            }
        ];
        this.state = {
            isOpened: false,
            clientY: null
        }

    }

    handleClickHamburger = () => {

        this.setState({
            isOpened: !this.state.isOpened
        }, () => {
            document.body.classList.toggle('hidden-overflow', this.state.isOpened);
            document.getElementsByTagName( 'html' )[0].classList.toggle('hidden-overflow', this.state.isOpened);
        })

    };

    handleClickLink = () => {

        this.setState({
            isOpened: false
        }, () => {
            document.body.classList.remove('hidden-overflow');
            document.getElementsByTagName( 'html' )[0].classList.remove('hidden-overflow');
        })

    };

    handleTouchStart = (event) => {

        if (event.targetTouches.length == 1) {
            this.setState({
                clientY : event.targetTouches[0].clientY
            });
        }
    };

    handleTouchEnd = () => {

        if (event.targetTouches.length == 1) {
            this.disableRubberBand(event)
        }

    };

    disableRubberBand = (event) => {

        newClientY = event.targetTouches[0].clientY - this.state.clientY

        if (this.mobileMenuContent.scrollTop == 0 && newClientY > 0) {
            event.preventDefault()
        }

        if (this.isMobileMenuContentTotallyScrolled() && newClientY < 0) {
            event.preventDefault()
        }

    }

    isMobileMenuContentTotallyScrolled = () => {

        return this.mobileMenuContent.scrollHeight - this.mobileMenuContent.scrollTop <= this.mobileMenuContent.clientHeight;

    }


    render() {

        const pathname = this.props.location.pathname.replace('/', '');
        const intl = this.props.intl;

        return(
            <div className="mobile-menu component">
                <div className="mobile-menu__header">
                    <div className="mobile-menu__header-section">
                    </div>
                    <div className="mobile-menu__header-section">
                        <LangSwitcher availableLangs={this.props.availableLangs}/>
                        <button className={"mobile-menu__hamburger mobile-menu__hamburger--squeeze " + (this.state.isOpened ? 'is-active' : '')} type="button" onClick={this.handleClickHamburger}>
                          <span className="mobile-menu__hamburger-container">
                            <span className="mobile-menu__hamburger-inner"></span>
                          </span>
                        </button>
                    </div>
                </div>
                <div ref={(mobileMenuContent) => this.mobileMenuContent = mobileMenuContent} className={"mobile-menu__content " + (this.state.isOpened ? 'is-active' : '')} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchEnd}>
                    <ul>
                        {this.pagesToPutLinks.map((pageToPutLink) => {

                            const messageId = pageToPutLink + ".slug";
                            const slug = intl.messages[messageId] !== '' ? intl.formatMessage({ id: messageId }) : "";

                            return (
                                <li key={"link-" + pageToPutLink}>
                                    <Link className={"mobile-menu__content-link " + (slug === pathname ? "is-active" : "")} to={"/" + slug} onClick={this.handleClickLink}>
                                        <FormattedMessage id={pageToPutLink + ".title"} default={pageToPutLink}/>
                                    </Link>
                                </li>
                            )

                        })}
                        {this.externalURLsToPutLinks.map((externalURLToPutLink) => {

                            return (
                                <li key={"link-" + externalURLToPutLink.title}>
                                    <a className="mobile-menu__content-link"  href={externalURLToPutLink.url} target="_blank">
                                        <FormattedMessage id={externalURLToPutLink.title} default={externalURLToPutLink.title}/>
                                    </a>
                                </li>
                            )

                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(injectIntl(MobileMenu));