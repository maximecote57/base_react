import React from "react";
import { injectIntl, FormattedMessage } from 'react-intl';

class Homepage extends React.Component {

    render() {
        return (
            <div className="contact component">
                <div className="container">
                    <div className="page-title">
                        <h1>
                            <FormattedMessage id="homepage.title" default="Homepage" />
                        </h1>
                    </div>
                    <div>
                        <p>
                            <FormattedMessage id="homepage.description"/>
                        </p>
                    </div>
                </div>
            </div>
        );

    }
}

export default injectIntl(Homepage);