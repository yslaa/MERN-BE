const { RESOURCE } = require("../constants/index.js");

const lookup = (from, localField, as, nestedLookup = []) => ({
  $lookup: {
    from,
    localField,
    foreignField: RESOURCE.ID,
    as,
    pipeline: nestedLookup,
  },
});

module.exports = { lookup };
