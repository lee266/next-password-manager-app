export interface User {
  id: number;
  username: string;
  token: string;
}

export interface UserRequest {
  token: string;
}

export interface UsersState {
  user: User | null | undefined;
  error: string;
  isLoading: boolean;
}
