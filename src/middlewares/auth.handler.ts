import { NextFunction, Request, Response } from 'express'

import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { findUser } from '~/model/auth.model';
import { CreateException } from '~/utils/exceptions';
import { getUserBy } from '~/model/user.model';




const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

export const tokenValidator = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const authorizationHeader = req.get("Authorization");
     if (authorizationHeader == null) {
      throw "Authorization header is missing";
    }

    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw "Authorization header has not the 'Bearer' type";
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const sub = payload.sub
    const user = await getUserBy("email",String(sub))
    if(user){
     next()
    }else{
     throw "Authorization header is not Valid";
    }
    
    
  } catch (err) {
    res.json(new CreateException(err,401))
  }
}


export const hashPassword = (req: Request, res: Response, next: NextFunction)=>{

      argon2
  .hash(req.body.password, hashingOptions)
  .then((hashedPassword) => {
    // do something with hashedPassword
    req.body.hashedPassword = hashedPassword;
    req.body.password = undefined;
    next()
  })
  .catch((err) => {
    res.json(new CreateException(err,500))
  });
};

export const getUserCredential = (req: Request, res: Response, next: NextFunction)=>{

  findUser(req.body).then((user)=>{
    
    req.user = user;
    next()
  }).catch((err)=>{
    res.status(404).json(new CreateException(err,404))
  })  
}

export const verifyPassword = (req: Request, res: Response, next: NextFunction) => {
  if(req.user !== undefined){
    argon2
    .verify(req.user.hashedPassword||"", req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        req.body.password = undefined
        const payload:jwt.JwtPayload  = { sub: req.user?.email||"" };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
          expiresIn: "1h",
        });
        req.body.token = token
        req.body.id = req.user?.id
        next()
      } else {
        throw "email or password is incorrect"
      }
    })
    .catch((err) => {
      
      res.json(new CreateException(err,401))
    }); 
  }
  
}
