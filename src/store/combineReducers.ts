import isEqual from "lodash/isEqual";
import forOwn from "lodash/forOwn";

import { Action, Reducer, Reducers } from "./types";

const combineReducers = <State>(reducers: Reducers<State>): Reducer<State> => {
    return (state: State, action: Action): State => {
        forOwn(reducers, (reducer, stateKey) => {
            const newState = reducer(state[stateKey as keyof State], action);
            state = isEqual(newState, state[stateKey as keyof State]) ? state : { ...state, [stateKey]: newState };
        });

        return state;
    };
};

export { combineReducers };
