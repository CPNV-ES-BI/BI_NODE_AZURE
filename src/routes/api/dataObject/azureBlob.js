"use strict";

const AzureBlobClient = require("../../../config/components/AzureBlobClient").AzureBlobClient;

var controllers = {
  containers: async (req, res) => {
    let azureBlobClient = new AzureBlobClient();
    res.json(await azureBlobClient.containers());
  },
  all: async (req, res) => {
    let azureBlobClient = new AzureBlobClient();
    console.log(JSON.stringify(await azureBlobClient.all(req.params.containerName)));
    res.json(await azureBlobClient.all(req.params.containerName));
  },
};

module.exports = controllers;
