const { validate } = use("Validator");

module.exports = {
  isObjEmpty: obj => {
    return !Object.keys(obj).length;
  },
  validate: async (data, rules) => {
    const validation = await validate(data, rules);

    if (validation.fails()) {
      return false;
    }

    return true;
  },
  getTimestamp: () => {
    return new Date().getTime();
  }
};
