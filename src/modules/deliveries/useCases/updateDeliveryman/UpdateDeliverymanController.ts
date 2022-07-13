import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";


export class UpdateDeliveryController {
    async handle(request : Request , response:Response){
             const { id_deliveryman } = request;
             const {id : id_delivery} = request.params;
             const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();
             const delivery = await updateDeliverymanUseCase.execute({id_delivery,id_deliveryman});
             return response.json(delivery);
    }

}