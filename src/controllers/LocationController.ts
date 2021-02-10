import { Request, Response } from "express";
import knex from "../database";

class LocationController {
  async create(request: Request, response: Response) {
    const {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const location = {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const transaction = await knex.transaction();

    await transaction("locations").insert(location);

    const ids = await transaction("locations").select(["id"]);
    const location_id = ids[ids.length - 1].id;

    const locationItems = items.map((item_id: number) => {
      const selectedItem = transaction("items").where("id", item_id).first();

      if (!selectedItem) {
        return response.status(404).json({ message: "Item not found." });
      }

      return {
        item_id,
        location_id,
      };
    });

    await transaction("location_items").insert(locationItems);

    await transaction.commit();

    return response.json({
      id: location_id,
      ...location,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const location = await knex("locations").where("id", id).first();

    if (!location) {
      return response.status(404).json({ message: "Location not found." });
    }

    const items = await knex("items")
      .join("location_items", "items.id", "=", "location_items.item_id")
      .where("location_items.location_id", id)
      .select(["items.title"]);

    return response.status(200).json({ location, items });
  }
}

export default LocationController;
