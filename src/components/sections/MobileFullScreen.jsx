import React from "react";

import "./_mobile-full-screen.scss";

class MobileFullScreen extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isVisible: false
        }

    }

    handleClickShowFullScreen = () => {

        this.setState({
            isVisible: true
        });

        document.querySelector('body').classList.add('hidden-overflow');

    };

    handleClickHideFullScreen = () => {

        this.setState({
            isVisible: false
        });

        document.querySelector('body').classList.remove('hidden-overflow');

    };

    render() {
        return(
            <div>
                <a className="mobile-full-screen__trigger" href="javascript:void(0)" onClick={this.handleClickShowFullScreen}>{this.props.triggerTitle}</a>
                {this.state.isVisible &&
                    <div className="mobile-full-screen">
                        {this.props.children}
                        <a className="mobile-full-screen__close-btn" href="javascript:void(0)"  onClick={this.handleClickHideFullScreen}>
                            <i className="fas fa-times"></i>
                        </a>
                    </div>
                }
            </div>
        )
    }

}

export default MobileFullScreen;