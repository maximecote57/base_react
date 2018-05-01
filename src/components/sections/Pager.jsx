import React from "react";

import "./_pager.scss";

class Dropdown extends React.Component {

    constructor(props) {
        super(props);


        this.nbOfPages = Math.round(props.nbOfItems / props.nbOfProductsPerPage);

        this.state = {
            activePage: 1
        }
    }


    handleClickItem =  (activePage) => {

        this.setState({activePage})

    };

    render() {

        let pagerItems = [];

        for (let i = 1; i <= this.nbOfPages; i++) {
            pagerItems.push(<div className={"pager__item " + (this.state.activePage === i ? 'is-active' : '')} onClick={this.handleClickItem.bind(this, i)}>{i}</div>)
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