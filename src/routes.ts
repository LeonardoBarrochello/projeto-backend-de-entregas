import { Router } from "express";
import { ensureAuthenticatedClient } from "./middlewares/ensureAuthenticatedClient";
import { ensureAuthenticatedDeliveryman } from "./middlewares/ensureAuthenticatedDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/findAllDeliveries/FindAllDeliveiresController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliveryController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesController";


const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliveryController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();


// rotas cliente
routes.post("/clients" , createClientController.handle);
routes.get("/clients/deliveries" , ensureAuthenticatedClient, findAllDeliveriesController.handle);

// autenticação
routes.post("/deliveryman/auth" , authenticateDeliverymanController.handle);
routes.post("/clients/auth" , authenticateClientController.handle);

// entregas

routes.post("/delivery" , ensureAuthenticatedClient , createDeliveryController.handle);
routes.get("/delivery/available" , ensureAuthenticatedDeliveryman , findAllAvailableController.handle);
routes.put("/delivery/updateDeliveryman/:id" , ensureAuthenticatedDeliveryman , updateDeliverymanController.handle);
routes.put("/delivery/updateEndDate/:id" , ensureAuthenticatedDeliveryman , updateEndDateController.handle);

//rotas entregador
routes.post("/deliveryman" , createDeliverymanController.handle);
routes.get("/deliveryman/deliveries" , ensureAuthenticatedDeliveryman ,findAllDeliveriesDeliverymanController.handle);


export { routes }