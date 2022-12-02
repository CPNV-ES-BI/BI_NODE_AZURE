"use strict";

const controller = require("../src/controllers/helloController");

module.exports = (app) => {
  app.route("/hello").get(controller.hello);
};
