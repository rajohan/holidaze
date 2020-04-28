import { useCallback, useReducer, useRef } from "react";

import { Action, GlobalState, Dispatch, Reducer } from "./types";

const useImprovedReducer = (reducer: Reducer<GlobalState>, initialState: GlobalState): [GlobalState, Dispatch] => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const prevState = useRef({});

    const improvedDispatch: Dispatch = useCallback((action: Action | Function) => {
        if (typeof action === "function") {
            return action(improvedDispatch, () => prevState.current);
        }

        dispatch(action);
    }, []);

    prevState.current = state;

    return [state, improvedDispatch];
};

export { useImprovedReducer };
