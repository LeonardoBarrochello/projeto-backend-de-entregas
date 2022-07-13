import { prisma } from "../../../../database/prismaClient";

interface IUpdateDelivery {
    id_deliveryman  :string ;
    id_delivery : string;
}

export class UpdateEndDateUseCase{

     async execute ( {id_delivery , id_deliveryman} : IUpdateDelivery){
          const delivery = await prisma.deliveries.updateMany({
            where :{
                 id : id_delivery,
                 id_deliveryman
            },
            data:{
                 end_at : new Date()
            },
            
         
          })

          if(delivery.count == 0){

                throw new Error("Ocorreu algum erro ao atualizar a entrega!")

          }

          return delivery;
     }
}