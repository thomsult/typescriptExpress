import {User} from "~/type/user";
import { getUserBy,addUser } from "./user.model";

export const createUser = async (data: User) => {
  const alreadyRegister = await getUserBy("email",data.email)
    if (!alreadyRegister) {
      const user = await addUser(data);
      return Promise.resolve(user);
    } else {
      return Promise.reject("email are already Register");
    }
};



export const findUser = async (data: User) => {
  const FindUser = await getUserBy("email",data.email,true)
  if (!FindUser) {
    return Promise.reject("email Not Found");
    
  } else {
    return Promise.resolve(FindUser);
  }
};
