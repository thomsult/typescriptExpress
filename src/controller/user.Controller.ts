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
    console.log(id)
    const user = await getUserById(Number(id))
    if(user){
        const deleteUser = await deleteUserByEmail(user.email)
        res.send({message:'DeleteUser',deleteUser})
    }else{
        res.status(404).send(new NotFoundException())
    }

})

userController.get("/", async (req: Request, res: Response)=>{
    const users = await getUsers()
    res.json(users)
})
export { userController }