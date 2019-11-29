const url = process.env.REACT_APP_API_HOST;

export interface IEntity {
  id: number;
}

export interface Make extends IEntity {
  id: number;
  name: string;
  yearFounded: Date;
}

export interface Image extends IEntity {
  id: number;
  name: string;
}

export interface Model extends IEntity {
  id: number;
  name: string;
  productionYearFrom: Date;
  productionYearTo: Date;
  makeId: number;
  make: Make;
}

export interface PartClass extends IEntity {
  id: number;
  name: string;
}

export interface Part extends IEntity {
  id: number;
  name: string;
  productionYearStart: Date;
  productionYearEnd: Date;
  manufacturer: string;
  qualityGrade: number;
  price: number;
  priceUnits: string;
  partNumber: string;
  partClassId: number;
  imageId: number;
  trimId: number;
  buyerId: number;
  sellerId: number;
}

export interface SpecificationValue extends IEntity {
  id: number;
  name: string;
  value: number;
  units: string;
  partId: number;
  part: Part;
}

export interface Trim extends IEntity {
  id: number;
  name: string;
  productionYearStart: Date;
  productionYearEnd: Date;
  modelId: number;
  model: Model;
}

export interface UserInfo {
  username: string;
  reputation: number;
  email: string;
  contactPhone: string;
}

export interface Token {
  token: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Error {
  error: string;
}

export const api = {
  make: `${url}/make`,
  model: `${url}/model`,
  image: `${url}/image`,
  partClass: `${url}/partclass`,
  part: `${url}/part`,
  specificationValue: `${url}/specificationvalue`,
  trim: `${url}/trim`,
  user: `${url}/user`,
  authentication: `${url}/user/authentication`,
  registration: `${url}/user/registration`
};
