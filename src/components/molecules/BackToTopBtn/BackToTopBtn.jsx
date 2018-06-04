import React from "react";

class BackToToTopBtn extends React.Component {

    constructor() {
        super();
        this.triggerPosition = 1000;
        this.state = {
            isVisible: false
        }
    }

    handleScroll = () => {

        if(window.scrollY >= this.triggerPosition && !this.state.isVisible) {
            this.setState({
                isVisible: true
            });
        }
        else if(window.scrollY < this.triggerPosition && this.state.isVisible) {
            this.setState({
                isVisible: false
            });
        }
    }

    componentDidMount = () => {
        document.addEventListener('scroll', this.handleScroll);

    }

    componentWillUnmount = () => {
        document.removeEventListener('scroll', this.handleScroll);
    }

    render() {

        return (
            <div>
                {this.state.isVisible &&
                    <div className="back-to-top-btn component" onClick={() => window.scrollTo(0, 0)}>
                        Back to top
                    </div>
                }
            </div>
        )
    }
}


export default BackToToTopBtn;