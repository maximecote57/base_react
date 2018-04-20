import React from "react";

class OfferCard extends React.Component {
    render() {
        return (
            <div className={"card " + (this.props.active ? 'active' : '')} onClick={this.props.onClick}>
                <div className="card-header">
                    <span className="font-weight-bold">Offre #{this.props.number}</span>
                </div>
                <div className="card-body">
                    <h6 className="mb-2 text-muted">
                        <span className="font-weight-bold">Durée: </span>
                        <span>{this.props.duration} ans</span>
                    </h6>
                    <h6 className="mb-0 text-muted">
                        <span className="font-weight-bold">Taux d'intérêt: </span>
                        <span>{this.props.interestRate} %</span>
                    </h6>
                </div>
                { this.props.active == 1 &&
                <div className="card-footer">
                    <h6 className="mb-2">
                        <span className="font-weight-bold">Total des intérêts: </span>
                        <span>{this.props.interestTotal}</span>
                    </h6>
                    <h6 className="mb-2">
                        <span className="font-weight-bold">Total du compte Ophelia: </span>
                        <span>{this.props.opheliaAccountTotal}</span>
                    </h6>
                </div>
                }
            </div>
        )
    }
}

export default OfferCard;