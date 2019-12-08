import { createAction, ActionsUnion } from "./types";

export type AppState = {
  isAuthorized: boolean;
};

export const initialState: AppState = {
  isAuthorized: false
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const AppActions = {
  setLogin: createAction<typeof LOGIN>(LOGIN),
  setLogout: createAction<typeof LOGOUT>(LOGOUT)
};

export type AppAcceptedActions = ActionsUnion<typeof AppActions>;

export function reducer(state: AppState, action: AppAcceptedActions): AppState {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthorized: true };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
