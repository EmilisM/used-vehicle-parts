interface Make {
  name?: string;
  yearFounded?: string;
}

export interface MakeRequest extends Make {}

export interface MakeResponse extends Make {
  id: number;
}

interface Model {
  name?: string;
  productionYearFrom?: string;
  productionYearTo?: string;
  makeId: number;
  make?: MakeResponse;
}

export interface ModelRequest extends Model {}

export interface ModelResponse extends Model {
  id: number;
}

export const makeGetAll = (name?: string) => `/api/make?name=${name}`;

export const modelGetAll = (name?: string, makeId?: number) =>
  `/api/model?name=${name}&makeId=${makeId || ""}`;
