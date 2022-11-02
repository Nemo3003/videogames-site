const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json"); // don't want to override this with npm run swagger

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;