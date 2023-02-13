import { ObjectId } from "mongodb";
import User from "~/type/user";
import  db  from "~/utils/db";
import prisma from "~/utils/prisma";

const collection  = db.collection('User')

export const getUsers = async ()=>{
  const users = await prisma.user.findMany()
   return users.map((el:any)=>{
el.hashedPassword = undefined;
return el
   }) || undefined
}

export const getUserByEmail = async (email:string)=>{
 
  const user = await prisma.user.findFirst({
    where: { email: email },
  })
    return user
}

export const getUserById = async (id:any)=>{
  const user = await prisma.user.findFirst({
    where: { id:id},
  })

    return user
}
export const deleteUserByEmail = async (email:string)=>{
  const deleteUser = await prisma.user.delete({
    where: { email: email },
  })
return deleteUser
}

export const addUser = async (currentUser:any)=>{
  const userToAdd = await prisma.user.create({
    data: currentUser,
  })
  return userToAdd
    
}









