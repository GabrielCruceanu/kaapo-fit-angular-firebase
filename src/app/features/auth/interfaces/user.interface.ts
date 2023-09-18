export interface User {
  id: number;
  email: string;
  provider: string;
  socialId: any;
  firstName: any;
  lastName: any;
  username: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  photo: any;
  role: Role;
  status: Status;
  __entity: string;
}
export interface Role {
  id: number;
  name: string;
  __entity: string;
}

export interface Status {
  id: number;
  name: string;
  __entity: string;
}
