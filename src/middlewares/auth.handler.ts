import { NextFunction, Request, Response } from 'express'

import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { FindUser } from '~/model/auth.model';
import { CreateException } from '~/utils/exceptions';
import  User from '~/type/user';



const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

export const TokenValidator = (req: Request, res: Response, next: NextFunction)=>{
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
    console.log(payload)
    next();
    
  } catch (err) {
    res.send(new CreateException(err,401))
  }
}


export const HashPassword = (req: Request, res: Response, next: NextFunction)=>{

      argon2
  .hash(req.body.password, hashingOptions)
  .then((hashedPassword) => {
    // do something with hashedPassword
    req.body.hashedPassword = hashedPassword;
    req.body.password = undefined;
    next()
  })
  .catch((err) => {
    console.log(err)
    res.send(new CreateException(err,500))
  });
};


interface RequestWithUser extends Request{
  user?: User
}

export const GetUserCredential = (req: RequestWithUser, res: Response, next: NextFunction)=>{
  FindUser(req.body).then((user)=>{
    req.user = user;
    next()
  }).catch((err)=>{
    res.status(404).send(new CreateException(err,404))
    console.log(err)
  })  
}

export const verifyPassword = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if(req.user !== undefined){
    argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        req.body.password = undefined
        const payload = { sub: req.user?.email };
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
      res.send(new CreateException(err,401))
    }); 
  }
  
}
