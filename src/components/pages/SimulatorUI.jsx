import React from "react";

import CurrencyInput from 'react-currency-input';
import OfferCard from "../sections/OfferCard";

import "./_simulator.scss";

class SimulatorUI extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedOffer: null,
            paymentRealValue: 0,
            paymentMaskedValue: 0
        }
    }

    handleClickOffer = (newSelectedOffer) => {
        this.setState({selectedOffer: newSelectedOffer});
    }


    handleBlurPayment = () => {
        this.props.onBlurPayment(this.state.paymentRealValue);
    }

    handleChange = (event, maskedValue, floatValue) => {
        this.setState({
            paymentRealValue: floatValue,
            paymentMaskedValue: maskedValue
        });
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
                                        <input className="form-control" name="loan_value" type="number" placeholder="0" value={this.props.loanValue}/>
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
                                        <CurrencyInput ref={this.paymentInput} className="form-control" onBlur={this.handleBlurPayment} onChangeEvent={this.handleChange} precision="0" value={this.state.paymentMaskedValue}/>
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
                            {Object.keys(offers).map((keyName, keyindex) =>
                                <div className="col-md-4" key={keyName}>
                                    <OfferCard number={keyName} duration={offers[keyName].duration} interestRate={offers[keyName].interestRate} interestTotal={offers[keyName].interestTotal} opheliaAccountTotal={offers[keyName].opheliaAccountTotal} active={this.state.selectedOffer == keyName} onClick={this.handleClickOffer.bind(this, keyName)}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="text-center">
                            <button type="button" className="btn btn-primary btn-lg">Confirmer mon choix</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SimulatorUI;