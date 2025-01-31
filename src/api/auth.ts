import axios from "axios";
import { AuthResponse, LoginFormInputs, SignupFormInputs } from "../types/auth";

const API_URL = process.env.BASE_API_URL || "http://localhost:3000/api";

export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  async login(credentials: LoginFormInputs): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        credentials
      );
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw new Error("Network error occurred");
    }
  }

  async signup(
    data: Omit<SignupFormInputs, "confirmPassword">
  ): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/signup`,
        data
      );
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Signup failed");
      }
      throw new Error("Network error occurred");
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        }
      );
    } finally {
      this.clearToken();
    }
  }
}

export const authService = AuthService.getInstance();
