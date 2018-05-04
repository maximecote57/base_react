import React from "react";

import "./_dropdown.scss";

class Dropdown extends React.Component {

    constructor() {

        super();

        this.state = {
            isOpened: false
        }
    }

    handleClickBtn =  () => {

        this.setState({
            isOpened: !this.state.isOpened
        })

    };

    handleClickItem =  (item) => {

        this.setState({
            isOpened: false
        });

        this.props.onClickItem(item);

    };

    render() {

        const selectedItem = this.props.items.find((item) => item.selected);

        return (
            <div className="dropdown component">
                <button className="dropdown__btn" type="button" onClick={this.handleClickBtn}>
                    {selectedItem.text}
                    <i className="fas fa-chevron-down"></i>
                </button>
                <div className={"dropdown__list " + (this.state.isOpened ? 'is-opened' : '')}>
                    {
                        this.props.items.map((item) => {
                            return <a key={item.value} className="dropdown__item" href="javascript:void(0)" onClick={this.handleClickItem.bind(this, item)}>{item.text}</a>
                        })
                    }
                </div>
            </div>
        )
    }
}


export default Dropdown;