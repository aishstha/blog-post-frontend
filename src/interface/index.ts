export interface IPostDetails {
  title: string;
  description: string;
  users: IUser;
}

interface IUser {
  _id: string;
  name: string;
}

export interface IProfileDetails {
  name: string;
  _id: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IClientId {
  data: string;
}
