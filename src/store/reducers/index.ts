import { combineReducers } from "../combineReducers";
import { pageReducer } from "./pageReducer";
import { reducer2 } from "./reducer2";
import { GlobalState } from "../types";

export const globalReducer = combineReducers<GlobalState>({
    page: pageReducer,
    state2: reducer2
});
