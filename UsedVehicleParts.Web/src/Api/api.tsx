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

interface Image {
  ImageUrl: string;
}

export interface ImageRequest extends Image {}

export interface ImageResponse extends Image {
  id: number;
}

export interface User {
  reputation?: number;
  email: string;
  contactPhone: string;
}

interface Part {
  name: string;
  productionYearStart?: string;
  productionYearTo?: string;
  manufacturer?: string;
  qualityGrade: number;
  price: number;
  priceUnits?: string;
  partNumber?: string;
  partClassId: number;
  imageId: number;
  trimId: number;
  buyerId?: number;
  sellerId: number;
  partClass: PartClass;
  image: Image;
  buyer?: User;
  seller: User;
  trim: Trim;
}

export interface PartRequest extends Part {}

export interface PartResponse extends Part {
  id: number;
}

interface SpecificationValue {
  name: string;
  value: number;
  units?: string;
  partId: number;
  part: Part;
}

export interface SpecificationValueRequest extends SpecificationValue {}

export interface SpecificationValueResponse extends SpecificationValue {
  id: number;
}

export interface Token {
  token: string;
}

export interface Login {
  email: string;
  password: string;
}

export const makeGetAll = (name?: string) => `/api/make?name=${name}`;

export const modelGetAll = (name?: string, makeId?: number) =>
  `/api/model?name=${name}&makeId=${makeId || ""}`;

export const trimGetAll = (name?: string, modelId?: number) =>
  `/api/trim?name=${name}&modelId=${modelId || ""}`;

export const partClassGetAll = (name?: string) => `/api/partclass?name=${name}`;

export const partGetAll = (
  name?: string,
  partClassIds?: number[],
  trimIds?: number[]
) => {
  const nameRoute = name ? `&name=${name}` : "";
  const partClassIdRoute = partClassIds
    ? partClassIds.map(partClassId => `&partClassId=${partClassId}`).join("")
    : "";

  const trimIdRoute = trimIds
    ? trimIds.map(trimId => `&trimId=${trimId}`).join("")
    : "";

  return `/api/part?${nameRoute}${partClassIdRoute}${trimIdRoute}`;
};
