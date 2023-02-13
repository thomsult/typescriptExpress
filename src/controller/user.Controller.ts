import { Router } from 'express'
import { Request, Response } from 'express'
import { CreateException,NotFoundException } from '~/utils/exceptions'
import { DeleteUserByEmail, GetUserById,GetUsers } from '~/model/user.model'
/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
const UserController = Router()
UserController.delete("/:id", async( req: Request, res: Response)=>{
    const id = req.params.id
    console.log(id)
    const user = await GetUserById(Number(id))
    if(user){
        const deleteUser = await DeleteUserByEmail(user.email)
        res.send({message:'DeleteUser',deleteUser})
    }else{
        res.status(404).send(new NotFoundException())
    }

})

UserController.get("/", async (req: Request, res: Response)=>{
    const users = await GetUsers()
    res.json(users)
})
export { UserController }