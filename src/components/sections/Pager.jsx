import React from "react";

import "./_pager.scss";

class Pager extends React.Component {

    constructor(props) {

        super(props);

        this.nbOfPages = Math.round(props.nbOfItems / props.nbOfProductsPerPage);
        this.maxNbOfVisiblePagerItems = 5;
        this.nbOfPagesSwitchToggle = 3;

    }

    handleClickItem =  (activePage) => {

        this.props.onClick(activePage);

    };

    render() {

        const activePage = (this.props.currentOffset / this.props.nbOfProductsPerPage) + 1;
        let pagerItems = [];
        let firstPagerItemIndex = activePage - Math.floor(this.maxNbOfVisiblePagerItems / 2);

        if(firstPagerItemIndex <= 0) {
            firstPagerItemIndex = 1;
        }

        for (let i = firstPagerItemIndex; i < (firstPagerItemIndex + this.maxNbOfVisiblePagerItems) && i <= this.nbOfPages; i++) {

            pagerItems.push(<div className={"pager__item " + (activePage === i ? 'is-active' : '')} key={"pager-cell-" + i} onClick={this.handleClickItem.bind(this, i)}>{i}</div>)

        }

        return (
            <div className="pager component">
                {activePage > this.nbOfPagesSwitchToggle &&
                    <div className="pager__item" onClick={this.handleClickItem.bind(this, activePage - this.nbOfPagesSwitchToggle)}>
                        <i className="fas fa-chevron-left"></i>
                        <i className="fas fa-chevron-left"></i>
                    </div>
                }
                {activePage > 1 &&
                    <div className="pager__item" onClick={this.handleClickItem.bind(this, activePage - 1)}>
                        <i className="fas fa-chevron-left"></i>
                    </div>
                }
                {pagerItems.map((cell) => {
                    return (
                        cell
                    )
                })}
                {activePage < this.nbOfPages &&
                    <div className="pager__item" onClick={this.handleClickItem.bind(this, activePage + 1)}>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                }
                {activePage <= (this.nbOfPages - this.nbOfPagesSwitchToggle) &&
                    <div className="pager__item" onClick={this.handleClickItem.bind(this, activePage + this.nbOfPagesSwitchToggle)}>
                        <i className="fas fa-chevron-right"></i>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                }
            </div>
        )
    }
}


export default Pager;