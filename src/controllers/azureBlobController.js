"use strict";

const AzureBlobClient = require("../lib/azureBlobClient").AzureBlobClient;

var controllers = {
  containers: (req, res) => {
    let azureBlobClient = new AzureBlobClient();
    res.json(azureBlobClient.containers());
  },
};

module.exports = controllers;
