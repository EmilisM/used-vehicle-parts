import { createActionPayload, ActionsUnion } from "./types";
import { PartResponse } from "../Api/api";

export type MakeOption = { label: string; value: number };

export type ModelOption = { label: string; value: number };

export type TrimOption = { label: string; value: number };

export type PartClassOption = { label: string; value: number };

export type Nullable<T> = T | null;

export type HomeState = {
  make: Nullable<MakeOption>;
  model: Nullable<ModelOption>;
  trims: Nullable<TrimOption[]>;
  partClasses: Nullable<PartClassOption[]>;
  partName: string;
  parts: PartResponse[];
  qualityGrade: string;
  partsLoading: boolean;
};

export const SET_MAKE = "SET_MAKE";
export const SET_MODEL = "SET_MODEL";
export const SET_TRIMS = "SET_TRIMS";
export const SET_PART_CLASSES = "SET_PART_CLASSES";
export const SET_PART_NAME = "SET_PART_NAME";
export const SET_PARTS = "SET_PARTS";
export const SET_QUALITY_GRADE = "SET_QUALITY_GRADE";
export const SET_PARTS_LOADING = "SET_PARTS_LOADING";

export const HomeActions = {
  setMake: createActionPayload<typeof SET_MAKE, Nullable<MakeOption>>(SET_MAKE),
  setModel: createActionPayload<typeof SET_MODEL, Nullable<ModelOption>>(
    SET_MODEL
  ),
  setTrims: createActionPayload<typeof SET_TRIMS, Nullable<TrimOption[]>>(
    SET_TRIMS
  ),
  setPartClasses: createActionPayload<
    typeof SET_PART_CLASSES,
    Nullable<PartClassOption[]>
  >(SET_PART_CLASSES),
  setPartName: createActionPayload<typeof SET_PART_NAME, string>(SET_PART_NAME),
  setParts: createActionPayload<typeof SET_PARTS, PartResponse[]>(SET_PARTS),
  setQualityGrade: createActionPayload<typeof SET_QUALITY_GRADE, string>(
    SET_QUALITY_GRADE
  ),
  setPartsLoading: createActionPayload<typeof SET_PARTS_LOADING, boolean>(
    SET_PARTS_LOADING
  )
};

export type HomeAcceptedActions = ActionsUnion<typeof HomeActions>;

export const initialState: HomeState = {
  make: null,
  model: null,
  trims: null,
  partClasses: null,
  partName: "",
  parts: [],
  qualityGrade: "",
  partsLoading: false
};

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
    case SET_PART_NAME:
      return { ...state, partName: action.payload };
    case SET_PARTS:
      return { ...state, parts: action.payload };
    case SET_QUALITY_GRADE:
      return { ...state, qualityGrade: action.payload };
    case SET_PARTS_LOADING:
      return { ...state, partsLoading: action.payload };
    default:
      return state;
  }
}
