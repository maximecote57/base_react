import React from "react";

class Dropdown extends React.Component {

    constructor() {

        super();

        this.state = {
            isOpened: false,
            selectedItem: null
        }
    }

    handleClickBtn =  () => {

        this.setState({
            isOpened: !this.state.isOpened
        })

    };

    handleClickItem =  (item) => {

        this.setState({
            isOpened: false,
            selectedItem: item
        });

        this.props.onClickItem(item.value);

    };

    render() {

        return (
            <div className="dropdown component">
                <button className="dropdown__btn" type="button" onClick={this.handleClickBtn}>
                    {this.state.selectedItem ? this.state.selectedItem.text : this.props.title}
                    <i className="fas fa-chevron-down"></i>
                </button>
                <div className={"dropdown__list " + (this.state.isOpened ? 'is-opened' : '')}>
                    {
                        this.props.items.map((item) => {
                            return <a key={item.value} className={"dropdown__item " + (this.state.selectedItem === item ? 'is-selected' : '')} href="javascript:void(0)" onClick={this.handleClickItem.bind(this, item)}>{item.text}</a>
                        })
                    }
                </div>
            </div>
        )
    }
}


export default Dropdown;