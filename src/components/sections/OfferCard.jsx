import React from "react";
import NumberFormat from 'react-number-format';

const OfferCard = (offer) => (
    <div className={"card " + (offer.active ? 'active' : '')} onClick={offer.onClick}>
        <div className="card-header">
            <span className="font-weight-bold">Offre #{offer.number}</span>
        </div>
        <div className="card-body">
            <h6 className="mb-2 text-muted">
                <span className="font-weight-bold">Durée: </span>
                <span>{offer.durationInMonths/12} ans</span>
            </h6>
            <h6 className="mb-0 text-muted">
                <span className="font-weight-bold">Taux d'intérêt: </span>
                <span>{offer.interestRate} %</span>
            </h6>
        </div>
        { offer.active == 1 &&
        <div className="card-footer">
            <h6 className="mb-2">
                <span className="font-weight-bold">Total des intérêts: </span>
                <NumberFormat value={offer.interestTotal} displayType={'text'} thousandSeparator={true} suffix={'$'} />
            </h6>
            <h6 className="mb-2">
                <span className="font-weight-bold">Total du compte Ophelia: </span>
                <NumberFormat value={offer.opheliaAccountTotal} displayType={'text'} thousandSeparator={true} suffix={'$'} />
            </h6>
        </div>
        }
    </div>
);

export default OfferCard;