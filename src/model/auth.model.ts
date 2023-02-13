import User from "~/type/user";
import { GetUserByEmail,AddUser } from "./user.model";

export const CreateUser = async (data: User) => {
  const alreadyRegister = await GetUserByEmail(data.email)
    if (!alreadyRegister) {
      const user = await AddUser(data);
      return Promise.resolve(user);
    } else {
      return Promise.reject("email are already Register");
    }
};



export const FindUser = async (data: User) => {
  const FindUser = await GetUserByEmail(data.email)
  if (!FindUser) {
    return Promise.reject("email Not Found");
    
  } else {
    return Promise.resolve(FindUser);
  }
};
