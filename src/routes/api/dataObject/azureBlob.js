"use strict";

const DataObjectImpl = require("../../../config/components/DataObjectImpl").DataObjectImpl;
const DataObjectAlreadyExistsException  = require("../../../config/components/DataObjectImpl").DataObjectAlreadyExistsException;
const DataObjectPathNotFoundException   = require("../../../config/components/DataObjectImpl").DataObjectPathNotFoundException;
const DataObjectNotFoundException       = require("../../../config/components/DataObjectImpl").DataObjectNotFoundException;

let dataObjectImpl = new DataObjectImpl();

var controllers = {
  download: async (req, res) => {
    let element;

    if (req.query.path === undefined){
      element = req.params.id
    }else{
      element = req.query.path+"/"+req.params.id
    }
    
    try{
      dataObjectImpl.download(element);
    }catch(error){
      if(error instanceof DataObjectPathNotFoundException){
        res.status(404);
        res.json({error : "DataObject path not found"});
      }else if(error instanceof DataObjectNotFoundException){
        res.status(404);
        res.json({error : "DataObject not found"});
      }else{
        res.status(500);
      }
    }
    
  },
  create: async (req, res) => {
    let element;
    let data;
    if (req.query.path === undefined) {
      element = req.params.id;
      data = null;
    } else {  
      element = req.query.path + "/" + req.params.id;
      data = req.body.data;
    }

    try {
      res.json(await dataObjectImpl.create(element,data));
    } catch (error) {
      if (error instanceof DataObjectAlreadyExistsException) {
        res.status(409);
        res.json({ error: "DataObject already exists" });
      } else { 
        res.status(500);
      }
    }
  },
  delete: async (req, res) => {
    let element;

    if (req.query.path === undefined) {
      element = req.params.id;
    } else {
      element = req.query.path + "/" + req.params.id;
    }

    try{
      res.json(await dataObjectImpl.delete(element));
    } catch (error) {
      if (error instanceof DataObjectNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject not found" });;
      } else { 
        res.status(500);
      }
    }
  },
  publish: async (req, res) => {
    let element;

    if (req.query.path === undefined) {
      element = req.params.id;
    } else {
      element = req.query.path + "/" + req.params.id;
    }

    try{
      res.json(await dataObjectImpl.publish(element));
    } catch (error) {
      if (error instanceof DataObjectNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject not found" });
      } else if (error instanceof DataObjectPathNotFoundException) {
        res.status(404);
        res.json({ error: "DataObject path not found" });
      } else {
        res.status(500);
      }
    }
  },
};

module.exports = controllers;
