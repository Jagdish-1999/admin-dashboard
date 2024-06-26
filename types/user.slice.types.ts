export interface UserType {
  isLogin: boolean;
  isLoading: boolean;
  name: string;
  email: string;
  avatar: string;
}

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  avatar: File | undefined;
}
