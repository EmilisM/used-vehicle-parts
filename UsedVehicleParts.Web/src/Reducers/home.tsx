import { createActionPayload, ActionsUnion } from "./types";

export interface MakeOption {
  label: string;
  value: number;
}

export interface ModelOption {
  label: string;
  value: number;
}

export interface TrimOption {
  label: string;
  value: number;
}

export interface PartClassOption {
  label: string;
  value: number;
}

export interface HomeState {
  make?: MakeOption;
  model?: ModelOption;
  trims?: TrimOption[];
  partClasses?: PartClassOption[];
}

export const SET_MAKE = "SET_MAKE";
export const SET_MODEL = "SET_MODEL";
export const SET_TRIMS = "SET_TRIMS";
export const SET_PART_CLASSES = "SET_PART_CLASSES";

export const HomeActions = {
  setMake: createActionPayload<typeof SET_MAKE, MakeOption>(SET_MAKE),
  setModel: createActionPayload<typeof SET_MODEL, ModelOption>(SET_MODEL),
  setTrims: createActionPayload<typeof SET_TRIMS, TrimOption[]>(SET_TRIMS),
  setPartClasses: createActionPayload<
    typeof SET_PART_CLASSES,
    PartClassOption[]
  >(SET_PART_CLASSES)
};

export type HomeAcceptedActions = ActionsUnion<typeof HomeActions>;

export const initialState: HomeState = {};

export function reducer(
  state: HomeState,
  action: HomeAcceptedActions
): HomeState {
  switch (action.type) {
    case SET_MAKE:
      return { ...state, make: action.payload };
    case SET_MODEL:
      return { ...state, model: action.payload };
    case SET_TRIMS:
      return { ...state, trims: action.payload };
    case SET_PART_CLASSES:
      return { ...state, partClasses: action.payload };
    default:
      return state;
  }
}
