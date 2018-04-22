import React from "react";

import CurrencyInput from 'react-currency-input';
import OfferCard from "../sections/OfferCard";

class SimulatorUI_Step1 extends React.Component {

    handleClickOffer = (newSelectedOffer) => {

        this.props.onChangeSelectedOffer(newSelectedOffer);

    }

    handleChange = (event, maskedValue, floatValue) => {

        this.props.onChangePayment(floatValue, maskedValue);

    }

    render() {

        const offers = this.props.offers;

        return (

            <div className="component">
                <div className="container">
                    <div className="pt-5">
                        <h1 className="display-4 text-center">Vos offres personnalisées</h1>
                    </div>
                    <div className="pt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <div className="form-group">
                                    <label htmlFor="loan_value">Montant du prêt</label>
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input className="form-control" name="loan_value" type="number" placeholder="0" value={this.props.loanValue} disabled/>
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
                                        <CurrencyInput className="form-control" onChangeEvent={this.handleChange} precision="0" value={this.props.paymentMaskedValue}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5">
                        <h3 className="font-weight-normal text-center">Choisissez parmi l’une des 3 offres ci-dessous.</h3>
                    </div>
                    <div className="pt-5">
                        <div className="row">
                            {Object.keys(offers).map((keyName) =>
                                <div className="col-md-4 pb-4 pb-md-0" key={keyName}>
                                    <OfferCard number={keyName} durationInMonths={offers[keyName].durationInMonths} interestRate={offers[keyName].interestRate} interestTotal={offers[keyName].interestTotal} opheliaAccountTotal={offers[keyName].opheliaAccountTotal} active={this.props.selectedOffer == keyName} onClick={this.handleClickOffer.bind(this, keyName)}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-5 pb-5">
                        <div className="text-center">
                            <button type="button" className="btn btn-primary btn-lg" disabled={!this.props.selectedOffer} onClick={this.props.onClickChangeStep.bind(this, 2)}>Confirmer mon choix</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SimulatorUI_Step1;