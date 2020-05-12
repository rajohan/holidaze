import React, { createContext } from "react";

import { useImprovedReducer } from "./improvedReducer";
import { Store } from "./types";
import { globalReducer } from "./reducers";
import { initialState } from "./initialState";

const StoreContext = createContext({} as Store);

type Props = {
    children: React.ReactNode;
};

const StoreProvider: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const [state, dispatch] = useImprovedReducer(globalReducer, initialState);

    return <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>;
};

export { StoreContext, StoreProvider };
