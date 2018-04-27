import React from "react";

import NumberFormat from 'react-number-format';
import OfferCard from "../sections/OfferCard";

class SimulatorUI_Step3 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loanValue: this.props.loanValue,
            paymentValue: this.props.paymentValue,
            offers: this.props.offers,
            selectedOffer: this.props.selectedOffer
        }

    }

    handleClickOffer = (newSelectedOffer) => {

        this.setState({
            selectedOffer: newSelectedOffer
        });

    }

    getUpdatedLoanValue = (paymentValue) => {

        return Math.round(paymentValue * 60 * 0.6666);

    }

    handleChangePayment = (values) => {

        const paymentValue = isNaN(values.floatValue) ? 0 : values.floatValue;
        const newLoanValue = this.getUpdatedLoanValue(paymentValue);
        const newOffers = this.getUpdatedOffers(paymentValue, newLoanValue);

        this.setState({
            loanValue: newLoanValue,
            offers: newOffers,
            paymentValue
        });

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

    handleChangeStep = (newStep) => {

        this.props.onUpdate(this.state);
        this.props.onClickChangeStep.bind(this, newStep);

    }

    render() {

        const offers = this.state.offers;

        return (

            <div className="component">
                <div className="container">
                    <div className="pt-3">
                        <h1 className="text-primary text-center font-weight-bold">Vos offres personnalisées</h1>
                    </div>
                    <div className="pt-3">
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <div className="form-group">
                                    <label htmlFor="loan_value">Montant du prêt</label>
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <NumberFormat className="form-control" decimalScale={0} value={this.state.loanValue} thousandSeparator={true} disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-auto">
                                <div className="form-group">
                                    <label htmlFor="monthly_payment">Paiement mensuel</label>
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <NumberFormat className="form-control" decimalScale={0} value={this.state.paymentValue} onValueChange={this.handleChangePayment} thousandSeparator={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <h3 className="font-weight-normal text-center text-primary">Choisissez parmi l’une des 3 offres ci-dessous.</h3>
                    </div>
                    <div className="pt-3">
                        <div className="row">
                            {Object.keys(offers).map((keyName) =>
                                <div className="col-md-4 pb-4 pb-md-0" key={keyName}>
                                    <OfferCard number={keyName} durationInMonths={offers[keyName].durationInMonths} interestRate={offers[keyName].interestRate} interestTotal={offers[keyName].interestTotal} opheliaAccountTotal={offers[keyName].opheliaAccountTotal} active={this.state.selectedOffer == keyName} onClick={this.handleClickOffer.bind(this, keyName)}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-5 pb-3">
                        <div className="text-center">
                            <button type="button" className="btn btn-primary btn-lg" disabled={!this.state.selectedOffer} onClick={this.props.onUpdate.bind(this, this.state, 4)}>Confirmer mon choix</button>
                            <div className="text-center pt-1">
                                <a className="fs-" onClick={this.props.onUpdate.bind(this, this.state, 2)} href="javascript:void(0)">
                                    <small>Revenir en arrière</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SimulatorUI_Step3;