import React from "react";

import "./_pager.scss";

const Pager = (props) => {

    const nbOfPages = Math.round(props.nbOfItems / props.nbOfItemsPerPage);
    const activePage = (props.currentOffset / props.nbOfItemsPerPage) + 1;
    let pagerItems = [];
    let firstPagerItemIndex = activePage - Math.floor(props.maxNbOfVisiblePagerItems / 2);

    if(firstPagerItemIndex <= 0) {
        firstPagerItemIndex = 1;
    }

    for (let i = firstPagerItemIndex; i < (firstPagerItemIndex + props.maxNbOfVisiblePagerItems) && i <= nbOfPages; i++) {

        pagerItems.push(<div className={"pager__item " + (activePage === i ? 'is-active' : '')} key={"pager-cell-" + i} onClick={props.onClick.bind(this, i)}>{i}</div>)

    }

    return (
        <div className="pager component">
            {activePage > props.nbOfPagesSwitchToggle &&
                <div className="pager__item" onClick={props.onClick.bind(this, activePage - props.nbOfPagesSwitchToggle)}>
                    <i className="fas fa-chevron-left"></i>
                    <i className="fas fa-chevron-left"></i>
                </div>
            }
            {activePage > 1 &&
                <div className="pager__item" onClick={props.onClick.bind(this, activePage - 1)}>
                    <i className="fas fa-chevron-left"></i>
                </div>
            }
            {pagerItems.map((cell) => {
                return (
                    cell
                )
            })}
            {activePage < nbOfPages &&
                <div className="pager__item" onClick={props.onClick.bind(this, activePage + 1)}>
                    <i className="fas fa-chevron-right"></i>
                </div>
            }
            {activePage <= (nbOfPages - props.nbOfPagesSwitchToggle) &&
                <div className="pager__item" onClick={props.onClick.bind(this, activePage + props.nbOfPagesSwitchToggle)}>
                    <i className="fas fa-chevron-right"></i>
                    <i className="fas fa-chevron-right"></i>
                </div>
            }
        </div>
    )
};


export default Pager;