import { API } from "../../https";
import { UserDTO } from "../../model/user/dto/user.dto";
import { UserResponse } from "../../model/user/response/user.response";

export const getUserProfile = async () => {
  try {
    const data = (await API.get<UserResponse>(`/user`)).data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Result is undefined");
  }
};

export const updateProfile = async (
  username: string,
  email: string,
  bio: string,
  image: string
) => {
  try {
    const data = (
      await API.put<UserDTO>("/user", {
        username: username,
        email: email,
        bio: bio,
        image: image,
      })
    ).data;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("username or email already exits!!");
  }
};
