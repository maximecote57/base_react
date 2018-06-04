import React from "react";
import { injectIntl } from 'react-intl';
import { withRouter } from "react-router-dom";
import Translator from "../../tools/translator";

class LangSwitcher extends React.Component {

    getCurrentURLInAnotherLang = (anotherLang) => {

        let URLinAnotherLang = "";
        let newURLPathname = "";
        const currentURLPathname = window.location.pathname;
        const currentURLPathnameSegments = currentURLPathname !== "/" ? currentURLPathname.split('/') : [];

        if(currentURLPathnameSegments.length == 0) {
            URLinAnotherLang = window.location.origin + "/" + anotherLang;
        }
        else {
            currentURLPathnameSegments[1] = anotherLang;
            if(currentURLPathnameSegments.length >= 3 && currentURLPathnameSegments[2] !== "") {
                currentURLPathnameSegments[2] = Translator(this.props.currentPageName + '.slug', anotherLang);
            }
            newURLPathname = currentURLPathnameSegments.join('/');
            URLinAnotherLang = window.location.origin + newURLPathname + window.location.search;
        }

        return URLinAnotherLang;

    };

    render() {

        return (
            this.props.availableLangs.map((availableLang) => {
                if(availableLang !== this.props.intl.locale) {
                    return <a className="lang-switcher" href={this.getCurrentURLInAnotherLang(availableLang)} key={availableLang}>{availableLang}</a>;
                }
            })
        )
    }

}


export default withRouter(injectIntl(LangSwitcher));