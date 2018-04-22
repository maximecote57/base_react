import React from "react";

import SimulatorUI from "./SimulatorUI";
import Navbar from "../sections/Navbar"

class Simulator extends React.Component {

    constructor() {
        super();
        this.state = {
            loanValue: 0,
            offers: {
                1 : {
                    durationInMonths: 60,
                    interestRate: 17,
                    interestPercentage: 85,
                    opheliaPercentage: 15,
                    interestTotal: 0,
                    opheliaAccountTotal: 0,
                },
                2 : {
                    durationInMonths: 72,
                    interestRate: 13,
                    interestPercentage: 55,
                    opheliaPercentage: 45,
                    interestTotal: 0,
                    opheliaAccountTotal: 0
                },
                3 : {
                    durationInMonths: 84,
                    interestRate: 10,
                    interestPercentage: 34,
                    opheliaPercentage: 66,
                    interestTotal: 0,
                    opheliaAccountTotal: 0,
                }
            }
        }
    }

    getUpdatedLoanValue = (paymentValue) => {

        return Math.round(paymentValue * 60 * 0.6666);

    }

    getUpdatedOffers = (paymentValue, newLoanValue) => {

        let updatedOffers = {};

        Object.keys(this.state.offers).map(keyName => {

            let offer = {...this.state.offers[keyName]};
            const offerInterestRate = offer.interestRate;
            const offerRealDuration = offer.durationInMonths;
            const totalPayment = ( paymentValue * offerRealDuration ) + ( ( paymentValue * offerRealDuration ) * ( offerInterestRate / 100 ) );
            const balance = totalPayment - newLoanValue;
            const newInterestTotal = Math.round( balance * (offer.interestPercentage / 100) );
            const newOpheliaAccountTotal = Math.round( balance * (offer.opheliaPercentage / 100) );

            offer.interestTotal = newInterestTotal;
            offer.opheliaAccountTotal = newOpheliaAccountTotal;

            updatedOffers[keyName] = offer;

        });

        return updatedOffers;

    }

    handleChangePayment = (paymentValue) => {

        const newLoanValue = this.getUpdatedLoanValue(paymentValue);
        const newOffers = this.getUpdatedOffers(paymentValue, newLoanValue);

        this.setState({
            loanValue: newLoanValue,
            offers: newOffers
        });

    }

    render() {

        return (
            <div>
                <Navbar />
                <SimulatorUI offers={this.state.offers} loanValue={this.state.loanValue} onChangePayment={this.handleChangePayment} />
            </div>
        );

    }
}

export default Simulator;