const Database = use("Database");
require("dotenv").config();
const { TABLE_NAME } = process.env;

module.exports = {
  selectFermentation: async () => {
    return await Database.table(TABLE_NAME).select("*");
  },
  insertFermentation: async (trxs, blockstart, blockend, timestamp) => {
    try {
      await Database.table(TABLE_NAME).insert({
        trxs: trxs,
        blockstart: blockstart,
        blockend: blockend,
        timestamp: timestamp
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
