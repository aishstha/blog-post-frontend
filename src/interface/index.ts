export interface IPostDetails {
  title: string;
  description: string;
  users: IUser;
  _id: string;
  name: string;
  id:string;
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
  image:string;
}

export interface IClientId {
  token: string;
}

export interface INewComment {
  description: string;
}

export interface ICommentDetails {
  description: string;
  users: IUser;
  _id: string;
}

export interface ICreateNewCommentValues {
  description: string;
}
