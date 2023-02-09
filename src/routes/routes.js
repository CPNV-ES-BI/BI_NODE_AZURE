"use strict";

const DataObjectController = require("./api/dataObject/DataObjectController");
const dataObjectController = new DataObjectController();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../doc/swagger.json");

module.exports = async (app) => {
  app.route("/data-objects/:id").get(dataObjectController.download);
  app.route("/data-objects/:id").post(dataObjectController.create);
  app.route("/data-objects/:id").delete(dataObjectController.delete);
  app.route("/data-objects/:id/publish").put(dataObjectController.publish);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
