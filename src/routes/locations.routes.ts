import { Router } from "express";
import multer from "multer";

import LocationController from "../controllers/LocationController";
import multerConfig from "../config/multer";

const routes = Router();

const upload = multer(multerConfig);

const locationController = new LocationController();

routes.post("/", locationController.create);
routes.get("/:id", locationController.show);
routes.get("/", locationController.index);
routes.put("/:id", upload.single("image"), locationController.update);

export default routes;
