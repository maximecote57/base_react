import React from "react";
import { injectIntl } from 'react-intl';
import { withRouter } from "react-router-dom";

class LangSwitcher extends React.Component {

    render() {
        return (
            Object.keys(this.props.availableLangs).map((key) => {
                if(key !== this.props.intl.locale && this.props.currentPageSlugs[key] !== null) {
                    return <a className="lang-switcher" href={`/${key}/${this.props.currentPageSlugs[key]}`} key={key}>{key}</a>;
                }
            })
        )
    }

}


export default withRouter(injectIntl(LangSwitcher));