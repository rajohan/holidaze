import { Action } from "../types";
import { ActionTypes } from "./types";

export const setLoading = (isLoading: boolean): Action => {
    return {
        type: ActionTypes.SET_LOADING,
        payload: isLoading
    };
};

export const setTitle = (page: string): Action => {
    return { type: ActionTypes.SET_TITLE, payload: page };
};

// LOAD_START
// LOAD_SUCCESS
// LOAD_ERROR

// case types.LOAD_GAMES_BEGIN:
// return {
//     ...state,
//     loading: true,
// };
//
// case types.LOAD_GAMES_SUCCESS:
// return {
//     ...state,
//     loading: false,
//     hasLoaded: true,
//     serverError: null,
//     games: action.payload,
//     filteredGames: action.payload,
// };
//
// case types.LOAD_GAMES_ERROR:
// return {
//     ...state,
//     loading: false,
//     hasLoaded: true,
//     serverError: action.payload,
// };
