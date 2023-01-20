"use strict";

const AzureBlobClient = require("../../../config/components/AzureBlobClient").AzureBlobClient;

var controllers = {
  containers: async (req, res) =>{
    let azureBlobClient = new AzureBlobClient();
    console.log(JSON.stringify(await azureBlobClient.containers()));
    res.json(await azureBlobClient.containers());
  },
};

module.exports = controllers;
