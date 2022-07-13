import { NextFunction, Request, Response } from "express";
import { verify }  from "jsonwebtoken"
import { config } from "../config/auth";


interface IPayload {
    sub : string;
}

export async function ensureAuthenticatedClient(request : Request , response : Response , next : NextFunction)
{
      const authHeader = request.headers.authorization;

      if(!authHeader){
           return response.status(401).json({
             message : "Token missing!"
           })
      }

      const [, token] = authHeader.split(" ");

      try {
           const {sub} =  verify(token , config.secret_key_client!) as IPayload;

           request.id_client = sub;

           return next();
        
      } catch (error) {
            return response.status(401).json({
                message : "Invalid token"
            })
      }

    
}