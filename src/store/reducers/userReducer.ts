import { ActionTypes } from "../actions/types";
import { Action, UserState } from "../types";

export const userReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
        case ActionTypes.SET_AUTH_TOKEN:
            return { ...state, authToken: action.payload };
        case ActionTypes.SET_USER_ID:
            return { ...state, userId: action.payload };
        default:
            return state;
    }
};
