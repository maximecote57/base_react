import { DROPDOWN_OPEN, DROPDOWN_CLOSE } from "../actions/types";

const initalState = {
    openedDropdownId: null
}

export default function (state = initalState, action) {
    switch(action.type) {
        case DROPDOWN_OPEN:
            return {
                ...state,
                openedDropdownId: action.payload
            };
        case DROPDOWN_CLOSE:
            return {
                ...state,
                openedDropdownId: null
            };
        default:
            return state;
    }
}