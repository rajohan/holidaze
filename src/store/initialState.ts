import { GlobalState } from "./types";

export const initialState: GlobalState = {
    page: {
        title: "Holidaze",
        loading: true
    },
    user: {
        authToken: undefined
    }
};
