import React from "react";

import NumberFormat from 'react-number-format';

class SimulatorUI_Step4 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {}

    }

    getTotalBalances = () => {

        let totalBalance = 0;

        this.props.debts.map((debt) => {

            totalBalance += debt.balance;

        })

        return totalBalance;

    }

    getAverageInterest = () => {

        let totalInterests = 0;

        this.props.debts.map((debt) => {

            totalInterests += debt.interestsRate;

        });

        return totalInterests / this.props.debts.length;

    }

    render() {
        return (

            <div className="component">
                <div className="container">
                    <div className="pt-5">
                        <h1 className="font-weight-bold text-primary text-center">Récapitulons:</h1>
                    </div>
                    <div className="pt-5">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="text-center">
                                    <h3 className="font-weight-bold text-primary">Avant</h3>
                                </div>
                                <table className="table">
                                    <thead className="thead bg-secondary text-white font-weight-bold">
                                    <tr>
                                        <th>Prêts</th>
                                        <th>Solde</th>
                                        <th>Taux d’intérêt</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.debts.map((debt) => {

                                            return (
                                                <tr>
                                                    <td>
                                                        <h6>{debt.institution}</h6>
                                                        <span>{debt.loanType}</span>
                                                    </td>
                                                    <td>
                                                        <NumberFormat decimalScale={2} displayType="text" value={debt.balance} thousandSeparator={true} suffix={"$"}/>
                                                    </td>
                                                    <td>
                                                        <NumberFormat decimalScale={2} displayType="text" value={debt.interestsRate} thousandSeparator={true} suffix={"%"}/>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                        <tr className="table-secondary">
                                            <td>
                                                <h4>Total</h4>
                                            </td>
                                            <td>
                                                <h4><NumberFormat decimalScale={2} displayType="text" value={this.getTotalBalances()} thousandSeparator={true} suffix={"$"}/></h4>
                                            </td>
                                            <td>
                                                <h4><NumberFormat decimalScale={2} displayType="text" value={this.getAverageInterest()} thousandSeparator={true} suffix={"%"}/></h4>
                                                <span>(moyenne)</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <div className="text-center">
                                    <h3 className="font-weight-bold text-primary">Après</h3>
                                </div>
                                <table className="table">
                                    <thead className="thead bg-secondary text-white font-weight-bold">
                                    <tr>
                                        <th>Prêts</th>
                                        <th>Solde</th>
                                        <th>Taux d’intérêt</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span>Mon prêt Ophelia</span>
                                        </td>
                                        <td>
                                            <NumberFormat decimalScale={0} displayType="text" value={this.props.loanValue} thousandSeparator={true} suffix={"$"}/>
                                        </td>
                                        <td>
                                            <span>10,00%</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table className="table">
                                    <thead className="thead bg-secondary text-white font-weight-bold">
                                    <tr>
                                        <th>Tremplin financier</th>
                                        <th></th>
                                        <th>Solde*</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span>Mon compte Ophelia</span>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            <NumberFormat decimalScale={0} displayType="text" value={this.props.opheliaAccountTotal} thousandSeparator={true} suffix={"$"}/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="text-center">
                            <button type="button" className="btn btn-primary btn-lg" onClick={this.props.onUpdate.bind(this, this.state, 5)}>C'est mon choix final!</button>
                            <div className="text-center pt-1">
                                <a className="fs-" onClick={this.props.onUpdate.bind(this, this.state, 3)} href="javascript:void(0)">
                                    <small>Revenir en arrière</small>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5 pb-5">
                        <div className="text-right">
                            <small>*Total à l’extinction du prêt Ophelia</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SimulatorUI_Step4;