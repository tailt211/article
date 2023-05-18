import { API } from "../../https";
import { UserDTO } from "../../model/user/dto/user.dto";

export const getAllUsers = async () => {
  try {
    const data = (await API.get<UserDTO[]>(`/users`)).data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const deleteUser = async (email: string) => {
  try {
    await API.delete<void>(`/users/${email}`);
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};
