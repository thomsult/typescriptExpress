import User from "~/type/user";
import { prisma } from "~/utils/prismaClient";

export const GetUsers = async ()=>{
  const users = await prisma.user.findMany()
  return users.map((el: User)=>{
    return {id:el.id,email:el.email}
  } ) || undefined
}

export const GetUserByEmail = async (email:string)=>{
    const user = await prisma.user.findFirst({
        where: { email: email },
      })
    return user || undefined
}

export const GetUserById = async (id:number)=>{
    const user = await prisma.user.findFirst({
        where: { id: id },
      })
    return user || undefined
}
export const DeleteUserByEmail = async (email:string)=>{
    const deleteUser = await prisma.user.delete({
        where: { email: email },
      })
    return deleteUser
}

export const AddUser = async (CurrentUser:User)=>{
    const userToAdd = await prisma.user.create({
        data: CurrentUser,
      })
      return userToAdd
    
}









