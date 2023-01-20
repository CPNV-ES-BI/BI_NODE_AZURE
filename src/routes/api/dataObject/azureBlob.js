"use strict";

const DataObject = require("../../../models/dataobject").DataObject;

var controllers = {
  containers: async (req, res) => {
    res.json(await azureBlobClient.containers());
  },
  all: async (req, res) => {
    console.log(JSON.stringify(await DataObject.all(req.params.containerName)));
    res.json(await DataObject.all(req.params.containerName));
  },
};

module.exports = controllers;
