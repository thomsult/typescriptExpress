import {User,UserReply} from "~/type/user";
import prisma from "~/utils/prisma";

const RemovePassword = (user:User|null)=>{
  return {email:user?.email,id:user?.id} as UserReply || undefined
}

export const getUsers = async ()=>{
  const users = await prisma.user.findMany() as User[]
   return users.map((el)=>{
return RemovePassword(el)
   }) || undefined
}

export const getUserBy =  async (type:string,value:string,withPassword = false)=>{

  const user = await prisma.user.findFirst({
    where: {[type]:value},
  })
  return withPassword?user:RemovePassword(user)

}






export const deleteUserByEmail = async (email:string)=>{
  const deleteUser = await prisma.user.delete({
    where: { email },
  })
  return RemovePassword(deleteUser)
}

export const addUser = async (currentUser: User)=>{
  const userToAdd = await prisma.user.create({
    data: {
      email: currentUser.email,
      hashedPassword: currentUser?.hashedPassword || "",

    } ,
  })
  return userToAdd
    
}









