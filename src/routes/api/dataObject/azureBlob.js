"use strict";

const AzureBlobClient = require("../../../config/components/AzureBlobClient").AzureBlobClient;

var controllers = {
  containers: (req, res) => {
    let azureBlobClient = new AzureBlobClient();
    res.json(azureBlobClient.containers());
  },
};

module.exports = controllers;
