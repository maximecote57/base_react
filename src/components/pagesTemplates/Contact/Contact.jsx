import React from "react";
import { settings } from "../../../SettingsContext";
import { injectIntl, FormattedMessage } from 'react-intl';
import axios from 'axios';

class Contact extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            pageData: '',
            isLoadingInfosFromAPI : true
        };

    }

    componentDidMount() {

        if(this.props.pagesContents['contact'] !== undefined) {

            this.setState({
                pageData: this.props.pagesContents['contact'],
                isLoadingInfosFromAPI: false
            });

        }
        else {

            axios.get(settings.apiUrlPages + '/' + this.props.pageId)
                .then(res => {

                    const pageDataFromAPI = res.data;

                    this.props.onDataLoaded(pageDataFromAPI);

                    this.setState({
                        pageData: pageDataFromAPI,
                        isLoadingInfosFromAPI: false
                    })
                })

        }

    }

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
                        {this.state.isLoadingInfosFromAPI &&
                            <div>Loading infos from API</div>
                        }
                        {!this.state.isLoadingInfosFromAPI &&
                            <div dangerouslySetInnerHTML={{__html: this.state.pageData.post_content}} ></div>
                        }
                    </div>
                </div>
            </div>
        );

    }
}

export default injectIntl(Contact);