import React from "react";

const ItemsList = ({ items }) => {

    return(
        <div className="items-list component">
            <div className="items-list__items-row">
                {items.map((item) => {
                    return (
                        <div className="items-list__items-row-item" key={item.id}>
                            <div className="items-list__item-container">
                                <img className="items-list__item-img" src={item.images[0].src}/>
                                <h3 className="items-list__item-title">{item.name}</h3>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
};

export default ItemsList;