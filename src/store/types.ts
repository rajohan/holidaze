import { ActionTypes } from "./actions/types";

export type Action = {
    type: ActionTypes;
    payload?: any;
};

export type Dispatch = (action: Function | Action) => void;

export type Store = {
    state: GlobalState;
    dispatch: Dispatch;
};

export type Reducer<State> = (state: State, action: Action) => State;
export type Reducers<State> = { [key in keyof State]: Reducer<State[key]> };

export type GlobalState = {
    page: PageState;
    state2: AnotherState;
};

export type PageState = {
    title: string;
    loading: true;
};

export type AnotherState = {
    hello: string;
};
