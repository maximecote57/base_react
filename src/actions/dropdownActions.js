import { DROPDOWN_OPEN, DROPDOWN_CLOSE } from "./types";

export const openDropdown = (dropdownID) => dispatch => {

    dispatch({
        type: DROPDOWN_OPEN,
        payload: dropdownID
    });

};

export const closeDropdown = () => dispatch => {

    dispatch({
        type: DROPDOWN_CLOSE
    });

};