import { Router } from 'express'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'
import { validator } from '../middlewares/validator';
import { Request, Response } from 'express'
import { CreateUser } from '~/model/auth.model';
import { GetUserCredential, HashPassword,verifyPassword } from '~/middlewares/auth.handler';


const ApiController = Router()

//validator // posttoDB // return 

ApiController.post("/register",validator, HashPassword,( req: Request, res: Response)=>{
    CreateUser(req.body).then(()=>{
        res.send('Register')
    }).catch((err)=>{
        res.json({err:err})
        //console.log({err:err})
    })
    
})
    



ApiController.post("/login",validator, GetUserCredential ,verifyPassword,( req: Request, res: Response)=>{
    res.send(req.body)
})



export { ApiController }