import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("items").insert([
    { title: "Papéis e papelão", image: "papel.png" },
    { title: "Vidros e lâmpadas", image: "vidro.png" },
    { title: "Oléo de cozinha", image: "oleo.png" },
    { title: "Eletrônicos", image: "eletronico.png" },
  ]);
}
