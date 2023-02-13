import { Router } from 'express'
import { Request, Response } from 'express'
import { CreateException,NotFoundException } from '~/utils/exceptions'
import { deleteUserByEmail, getUserById,getUsers } from '~/model/user.model'
/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
const userController = Router()
 userController.delete("/:id", async( req: Request, res: Response)=>{
    const id = req.params.id
    
    const user = await getUserById(id)
    console.log(user)
    if(user){
        const deleteUser = await deleteUserByEmail(user.email)
        res.send({message:'DeleteUser',deleteUser})
    }else{
        res.status(404).send(new NotFoundException())
    }

})
userController.get("/:id", async (req: Request, res: Response)=>{
    const id = req.params.id
    const user = await getUserById(id)
    res.json(user)
})
userController.get("/", async (req: Request, res: Response)=>{
    const users = await getUsers()
    res.json(users)
})
export { userController }