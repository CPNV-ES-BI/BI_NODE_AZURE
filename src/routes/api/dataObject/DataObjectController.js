"use strict";
const DataObjectImpl = require("../../../lib/DataObjectImpl").DataObjectImpl;
const DataObjectAlreadyExistsException = require("../../../lib/DataObjectImpl").DataObjectAlreadyExistsException;
const DataObjectPathNotFoundException = require("../../../lib/DataObjectImpl").DataObjectPathNotFoundException;
const DataObjectNotFoundException = require("../../../lib/DataObjectImpl").DataObjectNotFoundException;

let dataObjectImpl = new DataObjectImpl();

class DataObjectController {

  async download(req, res) {
    let element =
      req.query.path === undefined
        ? req.params.id
        : req.query.path + "/" + req.params.id;

    try {
      res.json(await dataObjectImpl.download(element));
    } catch (error) {
      if (error instanceof DataObjectPathNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject path not found" });
      } else if (error instanceof DataObjectNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject not found" });
      } else {
        res.status(500);
      }
    }
  }

  async create(req, res) {
    let element;
    let data;

    if (req.query.path === undefined) {
      element = req.params.id;
      data = null;
    } else {
      element = req.query.path + "/" + req.params.id;
      if(req.file !== undefined){
        data = req.file.buffer;
      }
      else {
        data = req.body.data;
      }
    }
    try {
      res.json(await dataObjectImpl.create(element, data));
    } catch (error) {
      if (error instanceof DataObjectAlreadyExistsException) {
        res.status(409);
        res.json({ error: "DataObject already exists" });
      } else {
        res.status(500);
      }
    }
  }

  async delete(req, res) {
    let element =
      req.query.path === undefined
        ? req.params.id
        : req.query.path + "/" + req.params.id;

    try {
      res.json(await dataObjectImpl.delete(element));
    } catch (error) {
      if (error instanceof DataObjectPathNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject path not found" });
      } else if (error instanceof DataObjectNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject not found" });
      } else {
        res.status(500);
      }
    }
  }

  async publish(req, res) {
    let element =
      req.query.path === undefined
        ? req.params.id
        : req.query.path + "/" + req.params.id;

    try {
      res.json(await dataObjectImpl.publish(element));
    } catch (error) {
      if (error instanceof DataObjectPathNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject path not found" });
      } else if (error instanceof DataObjectNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject not found" });
      } else {
        res.status(500);
      }
    }
  }

}

module.exports = DataObjectController;
