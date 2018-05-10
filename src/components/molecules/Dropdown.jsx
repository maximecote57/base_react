import React from "react";
import { openDropdown, closeDropdown } from "../../actions/dropdownActions";
import { connect } from "react-redux";

import "./_dropdown.scss";

class Dropdown extends React.Component {

    constructor() {

        super();

        this.state = {
            selectedItem: null
        }

    }

    handleClickBtn =  () => {

        this.props.openedDropdownId === this.props.id ? this.props.closeDropdown() : this.props.openDropdown(this.props.id);

    };

    handleClickItem =  (item) => {

        this.setState({
            selectedItem: item
        });


        this.props.closeDropdown();
        this.props.onClickItem(item.value);

    };

    render() {

        return (
            <div className="dropdown component">
                <button className="dropdown__btn" type="button" onClick={this.handleClickBtn}>
                    {this.state.selectedItem ? this.state.selectedItem.text : this.props.title}
                    <i className="fas fa-chevron-down"></i>
                </button>
                <div className={"dropdown__list " + (this.props.openedDropdownId === this.props.id ? 'is-opened' : '')}>
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

const mapStateToProps = state => ({

    openedDropdownId: state.dropdown.openedDropdownId

});



export default connect(mapStateToProps, { openDropdown, closeDropdown })(Dropdown);