"use strict";

const hellocontroller = require("./api/hello/hello");
const azureBlobController = require("./api/dataObject/azureBlob");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../doc/swagger.json");

module.exports = async (app) => {
  app.route("/hello").get(hellocontroller.hello);
  app.route("/containers").get(await azureBlobController.containers);
  app.route("/containers/:containerName/blobs/all").get(await azureBlobController.all);
  app.route("/containers/:containerName/blobs/:blobName/exists").get(await azureBlobController.exists);
  app.route("/containers/:containerName/blobs/:blobName/:content").post(await azureBlobController.create);
  app.route("/containers/:containerName/blobs/:blobName").delete(await azureBlobController.delete);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
