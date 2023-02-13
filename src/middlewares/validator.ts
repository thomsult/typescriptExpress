import { NextFunction, Request, Response } from 'express'
import { BadRequestException } from '~/utils/exceptions'


interface bodyPost {
    email:String,
    password:string
}
export const validator = (req: Request, res: Response, next: NextFunction)=>{
    const {email,password} = req.body as bodyPost
    ///Regex a implémenter
    
    const errors = [];

    for (const [key, value] of Object.entries({email,password})) {
    if (value == null){
        errors.push({ field: key, message: "This field is required" })
    }else if (value.length >= 255){
        errors.push({ field: key, message: "Should contain less than 255 characters" });
    }
  }
if (errors.length) {
    throw new BadRequestException(errors)
} else {
  next();
}

}