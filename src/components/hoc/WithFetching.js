import React from "react";
import axios from "axios";

const withFetching = (url) => (WrappedComponent) =>
    class WithFetching extends React.Component {
        constructor(props) {

            super(props);

            this.state = {
                data: {},
                isLoading: false,
                error: null,
            };
        }

        componentDidMount() {

            this.setState({ isLoading: true });

            axios
                .get(url)
                .then(response => {
                    this.setState({ data: response.data, isLoading: false });
                })
                .catch((error) => {
                    this.setState({ error: error.response.data.message, isLoading: false });
                });
        }

        render() {
            return <WrappedComponent { ...this.props } { ...this.state } />
        }
    };

export default withFetching;