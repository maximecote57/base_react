import { OPEN_DROPDOWN, CLOSE_DROPDOWN } from "../actions/types";

const initalState = {
    openedDropdownId: null
}

export default function (state = initalState, action) {
    switch(action.type) {
        case OPEN_DROPDOWN:
            return {
                ...state,
                openedDropdownId: action.payload
            };
        case CLOSE_DROPDOWN:
            return {
                ...state,
                openedDropdownId: null
            };
        default:
            return state;
    }
}