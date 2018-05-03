import React from "react";

import "./_pager.scss";

class Dropdown extends React.Component {

    constructor(props) {

        super(props);

        this.nbOfPages = Math.round(props.nbOfItems / props.nbOfProductsPerPage);

    }

    handleClickItem =  (activePage) => {

        this.props.onClick(activePage);

    };

    render() {

        let pagerItems = [];
        const props = this.props;
        const activePage = (props.currentOffset / props.nbOfProductsPerPage) + 1;

        for (let i = 1; i <= this.nbOfPages; i++) {
            pagerItems.push(<div className={"pager__item " + (activePage === i ? 'is-active' : '')} onClick={this.handleClickItem.bind(this, i)}>{i}</div>)
        }

        return (
            <div className="pager component">
                {pagerItems.map((cell) => {
                    return (
                        cell
                    )
                })}
            </div>
        )
    }
}


export default Dropdown;