import React from "react";
import { Link } from 'react-router-dom';

import logo_ophelia from "../../images/logo_ophelia.svg";
import drawing_man_piggy_bank from "../../images/drawing_man_piggy_bank.png";

import "./_homepage.scss";

class Homepage extends React.Component {

    constructor() {
        super();
    }

    componentDidMount = () => {

        let tl = new TimelineMax();

        tl.fromTo('.js-main-title', 1.2, {autoAlpha: 0, y: "100%"}, {autoAlpha: 1, y: "0%"})
            .fromTo('.js-side-img', 1.2, {autoAlpha: 0, x: "100%"}, {autoAlpha: 1, x: "0%"}, '-=1')
            .fromTo('.js-sub-title', 1.2, {autoAlpha: 0, y: "100%"}, {autoAlpha: 1, y: "0%"}, '-=0.4');

    }

    render() {

        return (
            <section className="main-section">
                <div className="main-section__top">
                    <div className="main-section__logo-wrapper">
                        <img className="main-section__logo" src={logo_ophelia} />
                    </div>
                    <div className="main-section__top-right-wrapper">
                        <a className="link text-uppercase js-lang-toggler" href="javascript:void(0)"></a>
                        <Link to="/simulator">Simulator</Link>
                    </div>
                </div>
                <div className="main-section__middle d-flex align-items-center">
                    <div className="row align-items-center no-gutters">
                        <div className="left-col">
                            <h1 className="main-section__title no-opacity js-main-title">The only debt payment<br /> that thickens your wallet.</h1>
                            <div className="main-section__sub-title-wrapper">
                                <div className="no-opacity js-sub-title">
                                    <div className="main-section__sub-title-header-wrapper">
                                        <h2 className="main-section__sub-title-header">Impossible?</h2>
                                    </div>
                                    <div className="main-section__sub-title-wrapper">
                                        <h3 className="main-section__sub-title">We will convince you of the contrary in a few weeks.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-col">
                            <div className="main-section__img-wrapper">
                                <img className="main-section__img no-opacity js-side-img" src={drawing_man_piggy_bank} />
                            </div>
                        </div>
                    </div>
                </div>
                <svg className="main-section__polygon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon fill="#071d37" points="0,0 0,100 100,100"/>
                </svg>
                <div className="main-section__bottom-circle js-bottom-circle"></div>
            </section>
        );

    }
}

export default Homepage;