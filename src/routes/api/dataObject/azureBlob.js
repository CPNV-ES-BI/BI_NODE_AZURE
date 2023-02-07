"use strict";

/*const AzureBlobClient = require("../../../config/components/DataObjectImpl").DataObjectImpl;
let dataObjectImpl = new DataObjectImpl();*/

var controllers = {
  download: async (req, res) => {
    let element;
    if (req.query.path === undefined){
      element = req.params.id
    }else{
      element = req.query.path+"/"+req.params.id
    }

    res.status(501);
    res.json({error : "Not implemented"});
    return
    
    /*try{
      dataObjectImpl.download(element);
    }catch(err){
      
    }
    */
  },
  create: async (req, res) => {
    let element;
    if (req.query.path === undefined) {
      element = req.params.id;
    } else {
      element = req.query.path + "/" + req.params.id;
    }

    console.log(JSON.stringify(req.body.data))
    res.status(501);
    res.json({ error: "Not implemented" });
    return

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
