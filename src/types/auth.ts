export interface SignupFormInputs {
  name: string;
  email: string;
  businessName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    businessName: string;
  };
  token: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}
