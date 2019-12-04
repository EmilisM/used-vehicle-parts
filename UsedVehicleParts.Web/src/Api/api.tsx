interface Make {
  name: string;
  yearFounded?: string;
}

export interface MakeRequest extends Make {}

export interface MakeResponse extends Make {
  id: number;
}

interface Model {
  name: string;
  productionYearFrom?: string;
  productionYearTo?: string;
  makeId: number;
  make?: MakeResponse;
}

export interface ModelRequest extends Model {}

export interface ModelResponse extends Model {
  id: number;
}

interface Trim {
  name: string;
  productionYearFrom?: string;
  productionYearTo?: string;
  modelId: number;
  model?: Model;
}

export interface TrimRequest extends Trim {}

export interface TrimResponse extends Trim {
  id: number;
}

interface PartClass {
  name: string;
}

export interface PartClassRequest extends PartClass {}

export interface PartClassResponse extends PartClass {
  id: number;
}

export const makeGetAll = (name?: string) => `/api/make?name=${name}`;

export const modelGetAll = (name?: string, makeId?: number) =>
  `/api/model?name=${name}&makeId=${makeId || ""}`;

export const trimGetAll = (name?: string, modelId?: number) =>
  `/api/trim?name=${name}&modelId=${modelId || ""}`;

export const partClassGetAll = (name?: string) => `/api/partclass?name=${name}`;
