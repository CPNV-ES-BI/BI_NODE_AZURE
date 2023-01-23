"use strict";

const DataObject = require("../../../models/dataobject").DataObject;
const Container = require("../../../models/container").Container;

var controllers = {
  containers: async (req, res) => {
    res.json(await Container.all());
  },
  all: async (req, res) => {
    res.json(await DataObject.all(req.params.containerName));
  },
  exists: async (req, res) => {
    let dataObject = new DataObject(req.params.blobName, req.params.containerName);
    res.json(await dataObject.exists());
  },
  create: async (req, res) => {
    let dataObject = new DataObject(req.params.blobName, req.params.containerName);
    res.json(await dataObject.create(req.params.content));
  },
  delete: async (req, res) => {
    let dataObject = new DataObject(req.params.blobName, req.params.containerName);
    res.json(await dataObject.delete());
  },
};

module.exports = controllers;
