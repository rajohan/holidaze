import { combineReducers } from "../combineReducers";
import { pageReducer } from "./pageReducer";
import { userReducer } from "./userReducer";
import { GlobalState } from "../types";

export const globalReducer = combineReducers<GlobalState>({
    page: pageReducer,
    user: userReducer
});
