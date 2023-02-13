import { Router } from 'express'
import { Request, Response } from 'express'
import { CreateException,NotFoundException } from '~/utils/exceptions'
import { deleteUserByEmail, getUserBy,getUsers } from '~/model/user.model'
import { UserReply } from '~/type/user'
/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
const userController = Router()
 userController.delete("/:id", async( req: Request, res: Response)=>{
    const id = req.params.id
    
    const user = await getUserBy("id",id)
    if(user){
        const deleteUser = await deleteUserByEmail(user.email)
        res.json({message:'DeleteUser',deleteUser})
    }else{
        res.status(404).json(new NotFoundException())
    }

})
userController.get("/:id", async (req: Request, res: Response)=>{
    const id = req.params.id
    const user = await getUserBy("id",id)
    if(user){
        res.json(user)
    }else{
        res.status(404).json(new NotFoundException())
    }
})
userController.get("/", async (req: Request, res: Response)=>{
    const users = await getUsers()
    res.json(users)
})
export { userController }