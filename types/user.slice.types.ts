export interface User {
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  avatar: string;
}
export interface UserType {
  isLogin: boolean;
  isLoading: boolean;
  user: User | null;
}

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  avatar: File | undefined;
}

export interface LoginUserTypes {
  email: string;
  password: string;
}
