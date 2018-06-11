import React from "react";
import { injectIntl, FormattedMessage } from 'react-intl';

class Contact extends React.Component {

    render() {
        return (
            <div className="contact component">
                <div className="container">
                    <div className="page-title">
                        <h1>
                            <FormattedMessage id="contact.title"/>
                        </h1>
                    </div>
                    <div>
                        <p>
                            <FormattedMessage id="contact.description"/>
                        </p>
                    </div>
                </div>
            </div>
        );

    }
}

export default injectIntl(Contact);