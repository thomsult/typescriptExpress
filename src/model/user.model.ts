import User from "~/type/user";
import { prisma } from "~/utils/prismaClient";

export const getUsers = async ()=>{
  const users = await prisma.user.findMany()
  return users.map((el: User)=>{
    return {id:el.id,email:el.email}
  } ) || undefined
}

export const getUserByEmail = async (email:string)=>{
    const user = await prisma.user.findFirst({
        where: { email: email },
      })
    return user || undefined
}

export const getUserById = async (id:number)=>{
    const user = await prisma.user.findFirst({
        where: { id: id },
      })
    return user || undefined
}
export const deleteUserByEmail = async (email:string)=>{
    const deleteUser = await prisma.user.delete({
        where: { email: email },
      })
    return deleteUser
}

export const addUser = async (currentUser:User)=>{
    const userToAdd = await prisma.user.create({
        data: currentUser,
      })
      return userToAdd
    
}









