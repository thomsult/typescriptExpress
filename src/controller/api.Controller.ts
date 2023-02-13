import { Router } from 'express'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'
import { validator } from '../middlewares/validator';
import { Request, Response } from 'express'
import { createUser } from '~/model/auth.model';
import { getUserCredential, hashPassword,verifyPassword } from '~/middlewares/auth.handler';


const apiController = Router()

//validator // posttoDB // return 

apiController.post("/register",validator, hashPassword,( req: Request, res: Response)=>{
    createUser(req.body).then(()=>{
        res.send('Register')
    }).catch((err)=>{
        res.json({err:err})
        //console.log({err:err})
    })
    
})
    



apiController.post("/login",validator, getUserCredential ,verifyPassword,( req: Request, res: Response)=>{
    res.send(req.body)
})



export { apiController }