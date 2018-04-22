import React from "react";

import SimulatorUI_Step1 from "./SimulatorUI_Step1"
import SimulatorUI_Step2 from "./SimulatorUI_Step2"
import SimulatorUI_Step3 from "./SimulatorUI_Step3"

import "./_simulator.scss";

class SimulatorUI extends React.Component {

    constructor() {
        super();
        this.state = {
            currentStep: 1,
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

        if(newSelectedOffer == this.state.selectedOffer) {
            newSelectedOffer = null;
        }

        this.setState({
            selectedOffer: newSelectedOffer
        })

    }

    changeStep = (stepId) => {

        this.setState({
            currentStep: stepId
        }, () => window.scrollTo(0, 0));

    }

    render() {
        return (
            <div>
                {this.state.currentStep == 1 &&
                    <SimulatorUI_Step1 onChangeSelectedOffer={this.handleChangeSelectedOffer} onChangePayment={this.handleChangePayment} offers={this.props.offers} loanValue={this.props.loanValue} onClickChangeStep={this.changeStep} paymentValue={this.state.paymentValue} selectedOffer={this.state.selectedOffer}/>
                }
                {this.state.currentStep == 2 &&
                    <SimulatorUI_Step2 onClickChangeStep={this.changeStep} loanValue={this.props.loanValue} opheliaAccountTotal={this.props.offers[this.state.selectedOffer].opheliaAccountTotal} />
                }
                {this.state.currentStep == 3 &&
                    <SimulatorUI_Step3 />
                }
            </div>
        )
    }
}

export default SimulatorUI;