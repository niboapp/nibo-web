import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { AuthResponse, LoginFormInputs, SignupFormInputs } from "../types/auth";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignUpManufacturer(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $name: String!
  ) {
    SignUp(
      SignUpManufacturerInput: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        businessName: $businessName
        image: "rrr.com"
      }
    ) {
      token
      user {
        id
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout($logOutId: String!) {
    logOut(id: $logOutId) {
      message
    }
  }
`;

export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private client: ApolloClient<unknown>;

  private constructor() {
    this.client = new ApolloClient({
      uri: import.meta.env.VITE_BASE_API_URL
        ? `${import.meta.env.VITE_BASE_API_URL}/graphql`
        : "https://nibo-api-production.up.railway.app/graphql",
      cache: new InMemoryCache(),
      defaultContext: {
        headers: {
          authorization: this.getToken() ? `Bearer ${this.getToken()}` : "",
        },
      },
      defaultOptions: {
        mutate: {
          errorPolicy: "all",
        },
      },
    });
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
    // Update Apollo Client headers with new token
    this.client.setLink(this.createAuthLink());
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
    // Clear Apollo Client headers
    this.client.setLink(this.createAuthLink());
  }

  private createAuthLink() {
    return new HttpLink({
      uri:
        import.meta.env.VITE_BASE_API_URL ||
        "https://nibo-api-production.up.railway.app/graphql",
      headers: {
        authorization: this.getToken() ? `Bearer ${this.getToken()}` : "",
      },
    });
  }

  async login(credentials: LoginFormInputs): Promise<AuthResponse> {
    try {
      const { data } = await this.client.mutate({
        mutation: LOGIN_MUTATION,
        variables: credentials,
      });

      if (data.login.token) {
        this.setToken(data.login.token);
      }

      return data.login;
    } catch (error: any) {
      if (error?.graphQLErrors?.length > 0) {
        throw new Error(error?.graphQLErrors[0].message || "Login failed");
      }
      throw new Error("Network error occurred");
    }
  }

  async signup(data: SignupFormInputs): Promise<AuthResponse> {
    try {
      const { data: responseData } = await this.client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: data,
      });
      if (responseData.signUpManufacturer.token) {
        this.setToken(responseData.signUpManufacturer.token);
      }

      return responseData.signup;
    } catch (error: any) {
      if (error?.graphQLErrors?.length > 0) {
        throw new Error(error?.graphQLErrors[0].message || "Signup failed");
      }
      throw new Error("Network error occurred");
    }
  }

  async logout(): Promise<void> {
    try {
      await this.client.mutate({
        mutation: LOGOUT_MUTATION,
        variables: {
          logOutId: localStorage.getItem("userId"),
        },
      });
    } catch (error) {
      // Continue with token cleanup even if the server request fails
      console.error(error);
    } finally {
      this.clearToken();
      localStorage.removeItem("manufacturer_id");
    }
  }
}

export const authService = AuthService.getInstance();
