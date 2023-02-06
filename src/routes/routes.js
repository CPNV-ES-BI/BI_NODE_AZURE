"use strict";

const azureBlobController = require("./api/dataObject/azureBlob");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../doc/swagger.json");

module.exports = async (app) => {
  app.route("/data-objects/:id").get(await azureBlobController.all);
  app.route("/data-objects/:id").post(await azureBlobController.create);
  app.route("/data-objects/:id").delete(await azureBlobController.delete);
  app.route("/data-objects/:id/publish").put(await azureBlobController.publish);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
