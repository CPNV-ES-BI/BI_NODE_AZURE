"use strict";

const hellocontroller = require("../src/controllers/helloController");
const azureBlobController = require("../src/controllers/azureBlobController");

module.exports = (app) => {
  app.route("/hello").get(hellocontroller.hello);
  app.route("/containers").get(azureBlobController.containers);
};
