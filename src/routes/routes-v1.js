"use strict";

const hellocontroller = require("../routes/api/hello/hello");
const azureBlobController = require("../routes/api/dataObject/azureBlob");

module.exports = async (app) => {
  app.route("/hello").get(hellocontroller.hello);
  app.route("/containers/:containerName/blobs/all").get(await azureBlobController.all);
  app.route("/containers").get(await azureBlobController.containers);
};
