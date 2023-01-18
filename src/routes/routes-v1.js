"use strict";

const hellocontroller = require("../routes/api/hello/hello");
const azureBlobController = require("../routes/api/dataObject/azureBlob");

module.exports = (app) => {
  app.route("/hello").get(hellocontroller.hello);
  app.route("/containers").get(azureBlobController.containers);
};
