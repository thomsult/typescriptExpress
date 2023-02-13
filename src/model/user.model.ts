import { ObjectId } from "mongodb";
import User from "~/type/user";
import  db  from "~/utils/db";

const collection  = db.collection('User')

export const getUsers = async ()=>{
  const users = await collection.find({}).toArray()
   return users.map((el:any)=>{
el.hashedPassword = undefined;
return el
   }) || undefined
}

export const getUserByEmail = async (email:string)=>{
    
  const query = { email: email };
  
  const user = await collection.findOne(query)
    return user
}

export const getUserById = async (id:any)=>{

  const user = await collection.findOne({ _id: new ObjectId(id) })
  console.log(user)
    return user
}
export const deleteUserByEmail = async (email:string)=>{
      const query = { email: email };
     const deleteUser = await collection.deleteOne(query);

    return deleteUser
}

export const addUser = async (currentUser:User)=>{
    const userToAdd = await collection.insertOne({
      email:currentUser.email,
      hashedPassword:currentUser.hashedPassword
    });
      return userToAdd
    
}









