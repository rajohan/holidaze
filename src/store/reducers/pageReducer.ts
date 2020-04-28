import { ActionTypes } from "../actions/types";
import { Action, PageState } from "../types";

export const pageReducer = (state: PageState, action: Action): PageState => {
    switch (action.type) {
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        case ActionTypes.SET_TITLE:
            return { ...state, title: `Holidaze - ${action.payload}` };
        default:
            return state;
    }
};
