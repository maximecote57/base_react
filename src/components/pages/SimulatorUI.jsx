import React from "react";

import SimulatorUI_Step1 from "./SimulatorUI_Step1"
import SimulatorUI_Step2 from "./SimulatorUI_Step2"
import SimulatorUI_Step3 from "./SimulatorUI_Step3"
import SimulatorUI_Step4 from "./SimulatorUI_Step4"
import SimulatorUI_Step5 from "./SimulatorUI_Step5"

import "./_simulator.scss";

class SimulatorUI extends React.Component {


    handleChangePayment = (paymentValue) => {

        this.props.onChangePayment(isNaN(paymentValue) ? 0 : paymentValue);

    }

    handleChangeSelectedOffer = (newSelectedOffer) => {

        if(newSelectedOffer == this.props.selectedOffer) {
            newSelectedOffer = null;
        }

        this.props.onChangeSelectedOffer(newSelectedOffer);

    }

    onUpdate = (newState, newStep) => {

        this.props.onUpdate(newState, newStep);

    }

    render() {
        return (
            <div>
                {this.props.currentStep == 1 &&
                    <SimulatorUI_Step1
                        onUpdate={this.onUpdate}
                        debts={this.props.debts}
                        institutions={this.props.data.institutions}
                        loanTypes={this.props.data.loanTypes}
                    />
                }
                {this.props.currentStep == 2 &&
                    <SimulatorUI_Step2
                        onUpdate={this.onUpdate}
                        offers={this.props.offers}
                        selectedOffer={this.props.selectedOffer}
                    />
                }
                {this.props.currentStep == 3 &&
                    <SimulatorUI_Step3
                        onUpdate={this.onUpdate}
                        offers={this.props.offers}
                        selectedOffer={this.props.selectedOffer}
                        loanValue={this.props.loanValue}
                        paymentValue={this.props.paymentValue}
                    />
                }
                {this.props.currentStep == 4 &&
                    <SimulatorUI_Step4
                        onUpdate={this.onUpdate}
                        debts={this.props.debts}
                        loanValue={this.props.loanValue}
                        opheliaAccountTotal={this.props.offers[this.props.selectedOffer].opheliaAccountTotal}
                    />
                }
                {this.props.currentStep == 5 &&
                    <SimulatorUI_Step5 />
                }
            </div>
        )
    }
}

export default SimulatorUI;