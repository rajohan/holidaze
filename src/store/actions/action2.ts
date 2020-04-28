import { Action } from "../types";
import { ActionTypes } from "./types";

export const setTest = (test: string): Action => {
    return { type: ActionTypes.SET_TEST, payload: test };
};
