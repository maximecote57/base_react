import { OPEN_DROPDOWN, CLOSE_DROPDOWN } from "./types";

export const openDropdown = (dropdownID) => dispatch => {

    dispatch({
        type: OPEN_DROPDOWN,
        payload: dropdownID
    });

};

export const closeDropdown = () => dispatch => {

    dispatch({
        type: CLOSE_DROPDOWN
    });

};