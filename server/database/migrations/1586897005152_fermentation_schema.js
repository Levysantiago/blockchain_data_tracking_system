"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");
require("dotenv").config();
const { TABLE_NAME } = process.env;

class FermentationSchema extends Schema {
  up() {
    this.create(TABLE_NAME, table => {
      table.increments();
      table.int("trxs");
      table.string("blockstart");
      table.string("blockend");
      table.date("timestamp");
      table.boolean("active").default(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("fermentations");
  }
}

module.exports = FermentationSchema;
