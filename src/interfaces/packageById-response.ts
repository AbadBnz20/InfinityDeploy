export interface PackageByIDResponse {
  data: Data;
}

export interface Data {
  packageUser: PackageUser;
}

export interface PackageUser {
  id: number;
  package: Package;
}

export interface Package {
  id: number;
  documentId: string;
  name: string;
  percentage: number;
  price: number;
  description: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: null;
  locale: null;
}

export interface PackageMain {
  percentage?: number;
}

export interface Discount {
  discount: number;
  package: { percentage: number };
}
