import { Request, Response } from "express";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";


export class FindAllAvailableController {
     async handle(request : Request , response : Response){
        const listAllDeliveriesUseCase = new FindAllAvailableUseCase()   
        const deliveries = await listAllDeliveriesUseCase.execute();
        return response.json(deliveries);
    }
}