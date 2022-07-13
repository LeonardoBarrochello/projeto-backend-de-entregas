import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../../../config/auth";
import { prisma } from "../../../database/prismaClient";


interface IAuthenticateClient {
     username : string;
     password : string;
}

interface ITokenResponse {
     user : {
         id : string;
         username : string
     }
     token : string;
}

export class AuthenticateClientUseCase {
    async execute({username , password} : IAuthenticateClient) : Promise<ITokenResponse>{
          const clientExists = await prisma.clients.findFirst({
             where : {
                 username
             }
          })

          if(!clientExists){
              throw new Error("username or password incorrect!")
          }

          const passwordMatch = await compare(password , clientExists.password);

          if(!passwordMatch) {
              throw new Error("username or password incorrect!")
          }

          console.log("secret" , config.secret_key_client)

          const token = sign({username}, config.secret_key_client! , {
                subject : clientExists.id,
                expiresIn : config.expires_date
          })

          return {
             user : {
                id : clientExists.id,
                username : clientExists.username
             },
             token
          } as ITokenResponse
    }
}