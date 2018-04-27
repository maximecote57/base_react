import React from "react";

import "./_simple-offer-card.scss";

const SimpleOfferCard = (offer) => (
    <div className={"   simple-offer-card " + (offer.active ? 'active' : '')} onClick={offer.onClick}>
        <div className="simple-offer-card__description">
            {offer.description}
        </div>
    </div>
);

export default SimpleOfferCard;