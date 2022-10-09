const cors = require("cors");

var corsOptions = {
  origin: "*",
};

module.exports = cors(corsOptions);