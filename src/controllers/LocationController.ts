import { Request, Response } from "express";
import knex from "../database";

class LocationController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    if (city && uf && items) {
      const parsedItems = <any>String(items)
        .split(",")
        .map((item) => {
          Number(item.trim());
        });

      const locations = await knex("locations")
        .join(
          "location_items",
          "locations.id",
          "=",
          "location_items.location_id"
        )
        .whereIn("location_items.item_id", parsedItems)
        .where("city", String(city))
        .where("uf", String(uf))
        .distinct()
        .select("locations.*");

      return response.status(200).json(locations);
    } else {
      const locations = await knex("locations").select("*");
      return response.status(200).json(locations);
    }
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

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const image = request.file.filename;

    const location = await knex("locations").where("id", id).first();

    if (!location) {
      return response.status(404).json({ message: "Location not found." });
    }

    await knex("locations")
      .update({ ...location, image })
      .where("id", id);

    return response.status(200).json({ ...location, image });
  }
}

export default LocationController;
