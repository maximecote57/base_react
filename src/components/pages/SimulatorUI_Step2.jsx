import React from "react";
import SimpleOfferCard from "../sections/SimpleOfferCard";

class SimulatorUI_Step2 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedOffer: this.props.selectedOffer
        }

    }

    handleClickOffer = (selectedOffer) => {

        this.setState({selectedOffer})

    }

    render() {
        const offers = this.props.offers;
        return (

            <div className="component">
                <div className="container">
                    <div className="pt-3">
                        <h1 className="text-primary text-center font-weight-bold">Personnalisez votre prêt Ophelia</h1>
                        <h4 className="pt-3 font-weight-normal text-center">Pour vous faire les meilleures offres, nous voulons savoir quelle est votre préférence parmi les 3 choix suivants.</h4>
                    </div>
                    <div className="pt-5">
                        <div className="row">
                            {Object.keys(offers).map((keyName) =>
                                <div className="col-md-4 pb-4 pb-md-0" key={keyName}>
                                    <SimpleOfferCard active={this.state.selectedOffer == keyName} onClick={this.handleClickOffer.bind(this, keyName)} description={offers[keyName].description} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="text-center">
                            <button type="button" className="btn btn-primary btn-lg" onClick={this.props.onUpdate.bind(this, this.state, 3)} disabled={!this.state.selectedOffer}>Poursuivre</button>
                            <div className="text-center pt-1">
                                <a className="fs-" onClick={this.props.onUpdate.bind(this, this.state, 1)} href="javascript:void(0)">
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

export default SimulatorUI_Step2;