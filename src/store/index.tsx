import React, { createContext } from "react";

import { useImprovedReducer } from "./improvedReducer";
import { Store } from "./types";
import { globalReducer } from "./reducers";
import { initialState } from "./initialState";

const StoreContext = createContext({} as Store);

const StoreProvider: React.FC = (props): React.ReactElement => {
    const [state, dispatch] = useImprovedReducer(globalReducer, initialState);

    return <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>;
};

export { StoreContext, StoreProvider };
