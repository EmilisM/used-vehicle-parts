const url = process.env.REACT_APP_API_HOST;

export interface IEntity {
  id: number;
};

export class Make implements IEntity {
  id: number;
  name: string;
  yearFounded: Date;
};

export class Image implements IEntity {
  id: number;
  name: string;
}

export class Model implements IEntity {
  id: number;
  name: string;
  productionYearFrom: Date;
  productionYearTo: Date;
  makeId: number;
  make: Make;
};

export class PartClass implements IEntity {
  id: number;
  name: string;
};

export class Part implements IEntity {
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
};

export class SpecificationValue implements IEntity {
  id: number;
  name: string;
  value: number;
  units: string;
  partId: number;
  part: Part;
};

export class Trim implements IEntity {
  id: number;
  name: string;
  productionYearStart: Date;
  productionYearEnd: Date;
  modelId: number;
  model: Model;
};

export class UserInfo {
  username: string;
  reputation: number;
  email: string;
  contactPhone: string;
};

export class Token {
  token: string;
}

export class Login {
  username: string;
  password: string;
}

export class Error {
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
  registration: `${url}/user/registration`,
};