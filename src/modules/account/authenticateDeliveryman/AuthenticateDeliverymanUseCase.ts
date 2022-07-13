import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../../../config/auth";
import { prisma } from "../../../database/prismaClient";


interface IAuthenticateDeliveryman {
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

export class AuthenticateDeliverymanUseCase {
    async execute({username , password} : IAuthenticateDeliveryman) : Promise<ITokenResponse>{
          const deliverymanExists = await prisma.deliveryman.findFirst({
             where : {
                 username
             }
          })

          if(!deliverymanExists){
              throw new Error("username or password incorrect!")
          }

          const passwordMatch = await compare(password , deliverymanExists.password);

          if(!passwordMatch) {
              throw new Error("username or password incorrect!")
          }

          console.log("secret" , config.secret_key_deliveryman)

          const token = sign({username}, config.secret_key_deliveryman! , {
                subject : deliverymanExists.id,
                expiresIn : config.expires_date
          })

          return {
             user : {
                id : deliverymanExists.id,
                username : deliverymanExists.username
             },
             token
          } as ITokenResponse
    }
}