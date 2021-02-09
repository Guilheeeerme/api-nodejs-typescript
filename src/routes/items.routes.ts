import { Router } from "express";

import ItemController from "../controllers/ItemController";

const routes = Router();

const itemController = new ItemController();

routes.get("/", itemController.index);

export default routes;
