export type UserRole = "user" | "admin";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
  presist: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  presist: boolean;
  confirmPassword: string;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

// forms input types:
export interface LoginInputs {
  email: string;
  password: string;
  presist: boolean;
}
