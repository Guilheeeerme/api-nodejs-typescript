import { Router } from "express";

import LocationController from "../controllers/LocationController";

const routes = Router();

const locationController = new LocationController();

routes.post("/", locationController.create);
routes.get("/:id", locationController.show);

export default routes;
