import axios from "./axios.service";
import type { User } from "../models";

export class AuthService {
  public login = (user: Pick<User, "username" | "password">) => {
    return axios.post("/auth/login", user);
  };

  public signup = (user: Omit<User, "spendingHistory">) => {
    return axios.post("/auth/signup", user);
  };
}
