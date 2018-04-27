import React from "react";

import SimulatorUI from "./SimulatorUI";
import Navbar from "../sections/Navbar"

import Data from "../../data.json";

class Simulator extends React.Component {

    constructor() {
        super();
        this.state = {
            currentStep: 1,
            loanValue: 0,
            offers: {
                1 : {
                    description: "Je veux avoir le plus petit taux d’intérêt possible",
                    durationInMonths: 60,
                    interestRate: 17,
                    interestPercentage: 85,
                    opheliaPercentage: 15,
                    interestTotal: 0,
                    opheliaAccountTotal: 0,
                },
                2 : {
                    description: "Je veux rembourser le plus rapidement possible",
                    durationInMonths: 72,
                    interestRate: 13,
                    interestPercentage: 55,
                    opheliaPercentage: 45,
                    interestTotal: 0,
                    opheliaAccountTotal: 0
                },
                3 : {
                    description: "Je veux accumuler le maximum d’argent",
                    durationInMonths: 84,
                    interestRate: 10,
                    interestPercentage: 34,
                    opheliaPercentage: 66,
                    interestTotal: 0,
                    opheliaAccountTotal: 0,
                }
            },
            debts: [
                {
                    id: 1,
                    institution : "",
                    loanType: "",
                    monthlyPayment: 0,
                    interestsRate: 0,
                    balance: 0
                }
            ],
            paymentValue: 0,
            selectedOffer: null
        }
    }

    changeStep = (stepId) => {

        this.setState({
            currentStep: stepId
        }, () => window.scrollTo(0, 0));

    }


    updateSelectedOffer = (selectedOffer) => {

        this.setState({selectedOffer})
    }

    onUpdate = (newState, newStep) => {

        newState['currentStep'] = newStep;

        this.setState(newState, () => console.log(this.state));

    }

    render() {

        return (
            <div>
                <Navbar />
                <SimulatorUI selectedOffer={this.state.selectedOffer} paymentValue={this.state.paymentValue} onUpdate={this.onUpdate} onChangeSelectedOffer={this.updateSelectedOffer} data={Data} debts={this.state.debts} currentStep={this.state.currentStep} onChangeStep={this.changeStep} offers={this.state.offers} loanValue={this.state.loanValue} onChangePayment={this.handleChangePayment} />
            </div>
        );

    }
}

export default Simulator;