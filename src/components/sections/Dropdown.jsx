import React from "react";

import "./_dropdown.scss";

class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
            defaultTitle: this.props.title || "",
            value: this.props.value || ""
        }
    }

    handleClickBtn =  () => {

        const isBtnOpened = this.state.isOpened;

        this.setState({
            isOpened: !isBtnOpened
        })

    };

    handleClickItem =  (value) => {

        this.setState({
            isOpened: false,
            value: value
        });

        this.props.onClickItem(value);

    };

    render() {

        return (
            <div className="dropdown component">
                <button className="dropdown__btn" type="button" onClick={this.handleClickBtn}>
                    {this.state.value ? this.state.value : this.state.defaultTitle}
                    <i className="fas fa-chevron-down"></i>
                </button>
                <div className={"dropdown__list " + (this.state.isOpened ? 'is-opened' : '')}>
                    {
                        this.props.items.map((item) => {
                            return <a key={item} className="dropdown__item" href="javascript:void(0)" onClick={this.handleClickItem.bind(this, item)}>{item}</a>
                        })
                    }
                </div>
            </div>
        )
    }
}


export default Dropdown;