export const makeGetAll = (query?: string) => `/api/make?query=${query}`;

export interface Make {
  id?: number;
  name?: string;
  yearFounded?: string;
}

export const modelGetAll = (query?: string) => `/api/model?query=${query}`;

export interface Model {
  id?: number;
  name?: string;
  productionYearFrom?: string;
  productionYearTo?: string;
  makeId: number;
  make?: Make;
}
