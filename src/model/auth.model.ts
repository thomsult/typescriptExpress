import User from "~/type/user";
import { getUserByEmail,addUser } from "./user.model";

export const createUser = async (data: User) => {
  console.log(data)
  const alreadyRegister = await getUserByEmail(data.email)
  console.log(alreadyRegister)
    if (!alreadyRegister) {
      const user = await addUser(data);
      return Promise.resolve(user);
    } else {
      return Promise.reject("email are already Register");
    }
};



export const findUser = async (data: User) => {
  const FindUser = await getUserByEmail(data.email)
  if (!FindUser) {
    return Promise.reject("email Not Found");
    
  } else {
    return Promise.resolve(FindUser);
  }
};
