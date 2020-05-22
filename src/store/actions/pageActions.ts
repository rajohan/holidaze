import { Action } from "../types";
import { ActionTypes } from "./types";

export const setTitle = (page: string): Action => {
    return { type: ActionTypes.SET_TITLE, payload: page };
};
