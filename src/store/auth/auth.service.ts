import { API } from "../../https";
import { AccountResponse } from "../../model/account/response/account.response";

// interface LoginRequest {
//   email: string;
//   password: string;
// }

export const login = async (email: string, password: string) => {
  try {
    const data = (
      await API.post<AccountResponse>("/login", {
        email: email,
        password: password,
      })
    ).data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const data = (
      await API.post<AccountResponse>("/users", {
        username: username,
        email: email,
        password: password,
      })
    ).data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("username or email already exits!!");
  }
};

export const getUserProfile = async () => {
  try {
    const data = (await API.get<AccountResponse>(`/user`)).data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};
