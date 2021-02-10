import { Router } from "express";

import LocationController from "../controllers/LocationController";

const routes = Router();

const locationController = new LocationController();

routes.post("/", locationController.create);

export default routes;
