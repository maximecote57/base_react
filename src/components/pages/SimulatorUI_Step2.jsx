import React from "react";

const SimulatorUI_Step2 = (props) => (

    <div className="component">
        <div className="container">
            <div className="pt-5">
                <h1 className="display-4 text-center">Récapitulons:</h1>
            </div>
            <div className="pt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <h3>Avant</h3>
                        </div>
                        <table className="table">
                            <thead className="thead thead-dark">
                                <tr>
                                    <th>Prêts</th>
                                    <th></th>
                                    <th>Taux d’intérêt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <h5>VISA OR Élégance Desjardins</h5>
                                        <span>4540 33** **** 8019</span>
                                    </td>
                                    <td>
                                        <span>5 000,00$</span>
                                    </td>
                                    <td>
                                        <span>19,90%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>069226-PP1 Prêt personnel</h5>
                                        <span>Lac des Deux-Montagnes</span>
                                    </td>
                                    <td>
                                        <span>5 000,00$</span>
                                    </td>
                                    <td>
                                        <span>17,50%</span>
                                    </td>
                                </tr>
                                <tr className="table-success">
                                    <td>
                                        <h4>Total</h4>
                                    </td>
                                    <td>
                                        <h4>10 000,00$</h4>
                                    </td>
                                    <td>
                                        <h4>18,70%</h4>
                                        <span>(moyenne)</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <div className="text-center">
                            <h3>Après</h3>
                        </div>
                        <table className="table">
                            <thead className="thead thead-dark">
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
                                    <span>10 000,00$</span>
                                </td>
                                <td>
                                    <span>10,00%</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <thead className="thead thead-dark">
                            <tr>
                                <th>Tremplin financier	</th>
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
                                    <span>4 653$</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <div className="text-center">
                    <button type="button" className="btn btn-primary btn-lg" onClick={props.onClickChangeStep.bind(this, 3)}>C'est mon choix final!</button>
                    <div className="text-center pt-1">
                        <a className="fs-" onClick={props.onClickChangeStep.bind(this, 1)} href="#">
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

export default SimulatorUI_Step2;