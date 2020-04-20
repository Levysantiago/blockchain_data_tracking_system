const Database = use("Database");
require("dotenv").config();
const { TABLE_NAME } = process.env;

module.exports = {
  selectFermentations: async () => {
    return await Database.table(TABLE_NAME)
      .select("*")
      .orderBy("id", "desc");
  },

  insertFermentation: async (trxs, blockstart, blockend, timestamp) => {
    try {
      if (!trxs) {
        trxs = 0;
      }
      await Database.table(TABLE_NAME).insert({
        trxs: trxs,
        blockstart: blockstart,
        blockend: blockend,
        timestamp: timestamp,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime()
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  updateFermentation: async (trxs, blockstart, blockend, timestamp) => {
    try {
      // Selecting the last fermentation id
      const ids = await Database.table(TABLE_NAME)
        .select("id")
        .orderBy("id", "desc")
        .limit(1);

      await Database.table(TABLE_NAME)
        .where("id", ids[0].id)
        .update({
          trxs: trxs,
          blockstart: blockstart,
          blockend: blockend,
          timestamp: timestamp,
          updated_at: new Date().getTime()
        });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  removeFermentation: async id => {
    try {
      await Database.table(TABLE_NAME)
        .where("id", id)
        .delete();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  getLastFermentation: async () => {
    // Selecting the last fermentation
    const fermentations = await Database.table(TABLE_NAME)
      .select("*")
      .orderBy("id", "desc")
      .limit(1);

    if (!fermentations.length) {
      return false;
    }

    return fermentations[0];
  },

  getFermentation: async id => {
    // Selecting the last fermentation
    const fermentation = await Database.table(TABLE_NAME)
      .where("id", id)
      .select("*");

    if (!fermentation.length) {
      return false;
    }

    return fermentation[0];
  },

  isFermentationActive: async () => {
    const fermentations = await module.exports.getLastFermentation();

    if (!fermentations) {
      return false;
    }

    return !!fermentations.active;
  },

  setActiveFermentation: async value => {
    const fermentations = await module.exports.getLastFermentation();

    if (!fermentations) {
      return false;
    }

    return await Database.table(TABLE_NAME)
      .where("id", fermentations.id)
      .update("active", value);
  }
};
