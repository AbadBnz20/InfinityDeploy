export interface PackageResponse {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  documentId: string;
  name: string;
  percentage: number;
  price: number;
  description: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Profile {
  profileId: string;
  firstname: string;
  lastname: string;
  address: string;
  photo: string;
  state: boolean;
  user_id: string;
  stateId: string;
  packageId: string;
  languageId:string;
  roleId: string;
  birthday: string;
  package: Package;
}

export interface Package {
  packageId: string;
  name: string;
  description: string;
  percentage: number;
  price: number;
  state: boolean;
}
