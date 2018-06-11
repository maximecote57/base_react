import React from "react";
import { settings } from "../../../SettingsContext";
import { injectIntl, FormattedMessage } from 'react-intl';
import axios from 'axios';

class Contact extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            pageContent: '',
            isLoadingInfosFromAPI : true
        }

    }

    componentDidMount() {
        console.log('componentDidMount - contact')
        axios.get(settings.apiUrlPages + '/' + this.props.pageId)
            .then(res => {

                const pageInfosFromAPI = res.data;

                this.setState({
                    pageContent: pageInfosFromAPI.post_content,
                    isLoadingInfosFromAPI: false
                })
            })

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
                            <div dangerouslySetInnerHTML={{__html: this.state.pageContent}} ></div>
                        }
                    </div>
                </div>
            </div>
        );

    }
}

export default injectIntl(Contact);