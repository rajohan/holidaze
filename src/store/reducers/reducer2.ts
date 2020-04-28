import { ActionTypes } from "../actions/types";
import { Action, AnotherState } from "../types";

export const reducer2 = (state: AnotherState, action: Action): AnotherState => {
    switch (action.type) {
        case ActionTypes.SET_TEST:
            return { ...state, hello: "test" };
        default:
            return state;
    }
};
