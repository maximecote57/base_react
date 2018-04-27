import React from "react";
import NumberFormat from 'react-number-format';

import Dropdown from "../sections/Dropdown"

class SimulatorUI_Step1 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            debts: this.props.debts
        }

    }

    handleClickAddRowBtn = () => {

        let highestId = 0;

        this.state.debts.map((debt) => {

            if(debt.id > highestId) {
                highestId = debt.id;
            }

        });

        this.setState({
            debts: [...this.state.debts, {
                id: highestId + 1,
                institution : "",
                loanType: "",
                monthlyPayment: 0,
                interestsRate: 0,
                balance: 0
            }]
        })

    }

    getCurrentDebtsCleaned = () => {

        let currentDebts = this.state.debts;
        const lastDebt = currentDebts[currentDebts.length - 1];

        const hasDebtAMissingInfo = Object.keys(lastDebt).some((key) => {
            return (lastDebt[key] === null || lastDebt[key] === "")
        });

        if(hasDebtAMissingInfo) {
            currentDebts.pop();
        }

        return currentDebts;

    }

    handleClickNextBtn = () => {

        this.setState({
            debts: this.getCurrentDebtsCleaned()
        }, () => this.props.onUpdate(this.state, 2))

    }

    handleClickRemoveRowBtn = (debtId) => {

        let currentDebts = this.state.debts;
        let debtToUpdate = currentDebts.find((debt) => {
            return debt.id == debtId
        });

        currentDebts.splice(currentDebts.indexOf(debtToUpdate), 1);

        this.setState({
            debts: currentDebts
        })

    }

    handleDebtPropertyChange = (debtId, propertyName, value) => {

        let debts = this.state.debts;
        let debtToUpdate = debts.find((debt) => {
            return debt.id == debtId
        })

        debtToUpdate[propertyName] = value;

        debts[debts.indexOf(debtToUpdate)] = debtToUpdate;

        this.setState({debts});

    }

    handleDebtNumberPropertyChange = (debtId, numberPropertyName, value) => {

        let debts = this.state.debts;
        let debtToUpdate = debts.find((debt) => {
            return debt.id == debtId
        })

        debtToUpdate[numberPropertyName] = isNaN(value.floatValue) ? 0 : value.floatValue;

        debts[debts.indexOf(debtToUpdate)] = debtToUpdate;

        this.setState({debts});

    }

    getNbOfCompletedDebts = () => {

        let nbOfCompletedDebts = 0;

        this.state.debts.map((debt) => {
            const hasDebtAMissingInfo = Object.keys(debt).some((key) => {
                return (debt[key] === null || debt[key] === "")
            });
            if(!hasDebtAMissingInfo) {
                nbOfCompletedDebts++;
            }
        });

        return nbOfCompletedDebts;

    }

    render() {

        return (

            <div className="component">
                <div className="container">
                    <div className="pt-3">
                        <h1 className="text-primary text-center font-weight-bold">Entrez les informations relatives aux dettes à consolider</h1>
                    </div>
                    <div className="pt-4">
                        <table className="table table--not-fixed">
                            <thead className="thead bg-secondary text-white font-weight-bold">
                                <tr>
                                    <th className="table__large-cell">Institution</th>
                                    <th className="table__large-cell">Type de prêt</th>
                                    <th>Mensualités</th>
                                    <th>Taux d'intérêt</th>
                                    <th>Solde</th>
                                    <th className="table__small-cell"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.debts.map((debt, index) => {
                                        const hasDebtAMissingInfo = Object.keys(debt).some((key) => {
                                           return (debt[key] === null || debt[key] === "")
                                        });
                                        return (
                                            <tr key={debt.id}>
                                                <td>
                                                    <Dropdown items={this.props.institutions} title="Institution" value={debt.institution} onClickItem={this.handleDebtPropertyChange.bind(this, debt.id, "institution")} />
                                                </td>
                                                <td>
                                                    <Dropdown items={this.props.loanTypes} title="Type de prêt" value={debt.loanType} onClickItem={this.handleDebtPropertyChange.bind(this, debt.id, "loanType")} />
                                                </td>
                                                <td>
                                                    <NumberFormat className="form-control" decimalScale={2} value={debt.monthlyPayment} suffix={"$"} thousandSeparator={true} onValueChange={this.handleDebtNumberPropertyChange.bind(this, debt.id, "monthlyPayment")} />
                                                </td>
                                                <td>
                                                    <NumberFormat className="form-control" decimalScale={2} value={debt.interestsRate} suffix={"%"} thousandSeparator={true} onValueChange={this.handleDebtNumberPropertyChange.bind(this, debt.id, "interestsRate")}/>
                                                </td>
                                                <td>
                                                    <NumberFormat className="form-control" decimalScale={2} value={debt.balance} suffix={"$"} thousandSeparator={true} onValueChange={this.handleDebtNumberPropertyChange.bind(this, debt.id, "balance")}/>
                                                </td>
                                                <td>
                                                    {(index + 1 == this.state.debts.length) ? (
                                                        <button className="btn btn-secondary" type="button" onClick={this.handleClickAddRowBtn} disabled={hasDebtAMissingInfo}>
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-secondary" type="button" onClick={this.handleClickRemoveRowBtn.bind(this, debt.id)}>
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-5 pb-5">
                        <div className="text-right">
                            <button type="button" className="btn btn-primary btn-lg" disabled={this.getNbOfCompletedDebts() == 0} onClick={this.handleClickNextBtn}>Poursuivre</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default SimulatorUI_Step1;