import { Action } from "../types";
import { ActionTypes } from "./types";

export const setAuthToken = (token: string): Action => {
    return { type: ActionTypes.SET_AUTH_TOKEN, payload: token };
};

export const setUserId = (id: string | null): Action => {
    return { type: ActionTypes.SET_USER_ID, payload: id };
};
