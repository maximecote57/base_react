import React from "react";

import SimulatorUI_Step1 from "./SimulatorUI_Step1"
import SimulatorUI_Step2 from "./SimulatorUI_Step2"
import SimulatorUI_Step3 from "./SimulatorUI_Step3"

import "./_simulator.scss";

class SimulatorUI extends React.Component {

    constructor() {
        super();
        this.state = {
            step: 1,
            selectedOffer: null,
            paymentValue: 0
        }
    }

    handleChangePayment = (paymentValue) => {

        this.setState({
            paymentValue: isNaN(paymentValue) ? "" : paymentValue
        })

        this.props.onChangePayment(isNaN(paymentValue) ? 0 : paymentValue);

    }

    handleChangeSelectedOffer = (newSelectedOffer) => {

        this.setState({
            selectedOffer: newSelectedOffer
        })

    }

    changeStep = (stepId) => {

        this.setState({
            step: stepId
        }, () => window.scrollTo(0, 0));

    }

    render() {
        return (
            <div>
                {this.state.step == 1 &&
                    <SimulatorUI_Step1 onChangeSelectedOffer={this.handleChangeSelectedOffer} onChangePayment={this.handleChangePayment} offers={this.props.offers} loanValue={this.props.loanValue} onClickChangeStep={this.changeStep} paymentValue={this.state.paymentValue} selectedOffer={this.state.selectedOffer}/>
                }
                {this.state.step == 2 &&
                    <SimulatorUI_Step2 onClickChangeStep={this.changeStep}/>
                }
                {this.state.step == 3 &&
                    <SimulatorUI_Step3 />
                }
            </div>
        )
    }
}

export default SimulatorUI;