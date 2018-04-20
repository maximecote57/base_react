import React from "react";

import SimulatorUI from "./SimulatorUI";

class Simulator extends React.Component {

    constructor() {
        super();
        this.state = {
            paymentValue: 0,
            loanValue: 0,
            offers: {
                1 : {
                    duration: 5,
                    interestRate: 17,
                    interestTotal: 0,
                    opheliaAccountTotal: 0,
                    interestPercentage: 85,
                    opheliaPercentage: 15
                },
                2 : {
                    duration: 6,
                    interestRate: 13,
                    interestTotal: 0,
                    opheliaAccountTotal: 0,
                    interestPercentage: 55,
                    opheliaPercentage: 45
                },
                3 : {
                    duration: 7,
                    interestRate: 10,
                    interestTotal: 0,
                    opheliaAccountTotal: 0,
                    interestPercentage: 34,
                    opheliaPercentage: 66
                }
            }
        }
    }

    updateLoanValue = (callback) => {

        const newLoanValue = Math.round(this.state.paymentValue * 60 * 0.6666);

        this.setState({
            loanValue: newLoanValue
        }, () => {
            if(typeof callback === "function") callback()
        });

    }

    updateOffers = () => {

        const loanValue = this.state.loanValue;
        let newOffers = {};

        Object.keys(this.state.offers).map(keyName => {

            let offer = {...this.state.offers[keyName]};
            const offerInterestRate = offer.interestRate;
            const offerRealDuration = offer.duration * 12;
            const totalPayment = ( this.state.paymentValue * offerRealDuration ) + ( ( this.state.paymentValue * offerRealDuration ) * ( offerInterestRate / 100 ) );
            const balance = totalPayment - loanValue;
            const newInterestTotal = Math.round( balance * offer.interestPercentage );
            const newOpheliaAccountTotal = Math.round( balance * offer.opheliaPercentage );

            offer.interestTotal = newInterestTotal;
            offer.opheliaAccountTotal = newOpheliaAccountTotal;

            newOffers[keyName] = offer;

        });

        this.setState({
            offers: newOffers
        })

    }

    handleBlurPayment = (paymentValue) => {

        this.setState({
            paymentValue: paymentValue
        }, () => this.updateLoanValue(this.updateOffers));

    }

    render() {

        return (
            <SimulatorUI offers={this.state.offers} loanValue={this.state.loanValue} onBlurPayment={this.handleBlurPayment} />
        );
    }
}

export default Simulator;