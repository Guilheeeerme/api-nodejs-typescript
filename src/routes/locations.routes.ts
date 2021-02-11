import { Router } from "express";

import LocationController from "../controllers/LocationController";

const routes = Router();

const locationController = new LocationController();

routes.post("/", locationController.create);
routes.get("/:id", locationController.show);
routes.get("/", locationController.index);

export default routes;
