import { createActionPayload, ActionsUnion } from "./types";

export interface MakeOption {
  label: string;
  value: number;
}

export interface ModelOption {
  label: string;
  value: number;
}

export interface HomeState {
  make?: MakeOption;
  models?: ModelOption[];
}

export const initialState: HomeState = {};

export const SET_MAKE = "SET_MAKE";
export const SET_MODELS = "SET_MODELS";

export const HomeActions = {
  setMake: createActionPayload<typeof SET_MAKE, MakeOption>(SET_MAKE),
  setModels: createActionPayload<typeof SET_MODELS, ModelOption[]>(SET_MODELS)
};

export type HomeAcceptedActions = ActionsUnion<typeof HomeActions>;

export function reducer(
  state: HomeState,
  action: HomeAcceptedActions
): HomeState {
  switch (action.type) {
    case SET_MAKE:
      return { ...state, make: action.payload };
    case SET_MODELS:
      return { ...state, models: action.payload };
    default:
      return state;
  }
}
