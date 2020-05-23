import { GlobalState } from "./types";

export const initialState: GlobalState = {
    page: {
        title: "Holidaze"
    },
    user: {
        authToken: undefined,
        userId: null
    }
};
