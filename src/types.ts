import Model from "./classes/model";

export interface ITypedCollection<T extends Model> {
  models: Array<T>;
}

export interface ILengthAwarePaginator<T> {
  current_page: number;
  data: T[];
  from: number;
  to: number;
  per_page: number;
  last_page: number;
  total: number;
}

export interface IAPIClientResponse {
  data?: IJSONAPIResponse;
  response: Response;
}

export interface IJSONAPIResponse {
  data?: IJSONAPIResource | IJSONAPIResource[];
  errors?: any;
  meta?: Record<string, any>;
  included?: IJSONAPIResource[];
}

export interface IJSONAPIResource {
  type: string;
  id: string;
  attributes: Record<string, any>;
  relationships?: Record<string, IJSONAPIRelationship>;
}

export interface IJSONAPIRelationship {
  links: Record<string, string>;
  data: IJSONAPIRelationshipResource | IJSONAPIRelationshipResource[];
}

export interface IJSONAPIRelationshipResource {
  type: string;
  id: string;
}

export interface IAPIClientBody {
  searchParams?: Record<string, string | number | boolean>;
  requestBody?: Record<string, any> | FormData;
}

export interface ILengthAwarePaginatedResponse<T> {
  data: T[];
  current_page: number;
  from: number;
  to: number;
  per_page: number;
  last_page: number;
  total: number;
}

export enum WebProtocol {
  HTTP = "http:",
  HTTPS = "https:"
}
