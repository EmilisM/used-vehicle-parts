export const BaseUrl = "http://85.206.134.3:7000/api";

export interface Error<T> {
  errors: T;
}

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
  make: MakeResponse;
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
  model: Model;
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
  imageUrl: string;
}

export interface ImageRequest extends Image {}

export interface ImageResponse extends Image {
  id: number;
}

export interface User {
  reputation?: string;
  email: string;
  contactPhone?: string;
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

export interface PartRequest {
  name: string;
  manufacturer?: string;
  qualityGrade: number;
  price: number;
  priceUnits?: string;
  partNumber?: string;
  partClassId: number;
  trimId: number;
  image: Image;
}

export interface PartErrors {
  Name?: string[];
  PartNumber?: string[];
  Manufacturer?: string[];
  PriceUnits?: string[];
  price?: string[];
  qualityGrade?: string[],
}

export interface PartError extends Error<PartErrors> {

}

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

export interface TokenResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginErrors {
  Form?: string[];
  Email?: string[];
  Password?: string[];
}

export interface SignUpRequest {
  email: string;
  password: string;
  repeatPassword: string;
}

interface SignUpErrors {
  Email?: string[];
  Password?: string[];
  RepeatPassword?: string[];
}

export interface SignUpError extends Error<SignUpErrors> {}

export interface LoginError extends Error<LoginErrors> {}

export const makeGetAll = (name?: string) => `/make?name=${name}`;

export const modelGetAll = (name?: string, makeId?: number) =>
  `/model?name=${name}&makeId=${makeId || ""}`;

export const trimGetAll = (name?: string, modelId?: number) =>
  `/trim?name=${name}&modelId=${modelId || ""}`;

export const partClassGetAll = (name?: string) => `/partclass?name=${name}`;

export const partGetAll = (
  name?: string,
  partClassIds?: number[],
  trimIds?: number[],
  qualityGrade?: string
) => {
  const nameRoute = name ? `&name=${name}` : "";
  const partClassIdRoute = partClassIds
    ? partClassIds.map(partClassId => `&partClassId=${partClassId}`).join("")
    : "";

  const trimIdRoute = trimIds
    ? trimIds.map(trimId => `&trimId=${trimId}`).join("")
    : "";

  const qualityGradeRoute = qualityGrade ? `&qualityGrade=${qualityGrade}` : "";

  return `/part?${nameRoute}${qualityGradeRoute}${partClassIdRoute}${trimIdRoute}`;
};

export const authPost = "/user/authentication";
export const registrationPost = "/user/registration";
export const userGet = "/user";
export const partPost = "/part";