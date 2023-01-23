"use strict";

const DataObject = require("../../../models/dataobject").DataObject;
const Container = require("../../../models/container").Container;

var controllers = {
  containers: async (req, res) => {
    try {
        res.json(await Container.all());
    } catch (error) {
        res.status(500);
    }
  },
  all: async (req, res) => {
    try {
        res.json(await DataObject.all(req.params.containerName));
    } catch (error) {
      if(error.constructor.name == "ContainerNotFoundException"){
        res.status(404);
        res.json({error : error.constructor.name});
      } else 
        res.status(500);
    }
  },
  exists: async (req, res) => {
    let dataObject = new DataObject(req.params.blobName, req.params.containerName);
    try {
      res.json(await dataObject.exists());
    } catch (error) {
      if(error.constructor.name == "ContainerNotFoundException" || error.constructor.name == "DataObjectNotFoundException"){
        res.status(404);
        res.json({error : error.constructor.name});
      } else
        res.status(500);
    }
    
  },
  create: async (req, res) => {
    let dataObject = new DataObject(req.params.blobName, req.params.containerName);
    try {
      res.json(await dataObject.create(req.params.content));
    } catch (error) {
      if(error.constructor.name == "ContainerNotFoundException"){
        res.status(404);
        res.json({error : error.constructor.name});
      } else if(error.constructor.name == "DataObjectAlreadyExistsException"){
        res.status(409);
        res.json({error : error.constructor.name});
      } else
          res.status(500);
    }
  },
  delete: async (req, res) => {
    let dataObject = new DataObject(req.params.blobName, req.params.containerName);
    try{
      res.json(await dataObject.delete());
    } catch (error) {
      if(error.constructor.name == "ContainerNotFoundException" || error.constructor.name == "DataObjectNotFoundException"){
        res.status(404);
        res.json({error : error.constructor.name});
      } else
      res.status(500);
    }
  },
};

module.exports = controllers;
