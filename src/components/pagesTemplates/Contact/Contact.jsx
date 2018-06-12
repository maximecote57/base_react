import React from "react";
import { injectIntl, FormattedMessage } from 'react-intl';

const Contact = ({ data, isLoading, error}) => {

    let pageContent = null;

    if(isLoading) {
        pageContent = <div>Loading infos from API</div>
    }
    else if(error) {
        pageContent = <div>{ error }</div>
    }
    else {
        pageContent = <div dangerouslySetInnerHTML={{__html: data.post_content}} ></div>
    }

    return (
        <div className="contact component">
            <div className="container">
                <div className="page-title">
                    <h1>
                        <FormattedMessage id="contact.title"/>
                    </h1>
                </div>
                { pageContent }
            </div>
        </div>
    );

};

export default injectIntl(Contact);