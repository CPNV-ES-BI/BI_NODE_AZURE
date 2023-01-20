/**
 * @brief This class is design to manage dataobjects
 * @author theo.gautier@cpnv.ch
 * @version 2022-12-07
 */

"use strict";

const AzureBlobClient =
  require("../config/components/AzureBlobClient").AzureBlobClient;

class DataObject {

  name = null
  constructor(name) {
    this.name = name;
  }
  static async all(containerName){
    let azureBlobClient = new AzureBlobClient();
    return await azureBlobClient.all(containerName);
  }
  exists(){}
  create(name){}
  download(){}
  publish(name){}
  delete(){}
}

class DataObjectAlreadyExistsException extends Error {}
class DataObjectNotFoundException extends Error {}

module.exports.DataObject = DataObject;
module.exports.DataObjectAlreadyExistsException = DataObjectAlreadyExistsException;
module.exports.DataObjectNotFoundException = DataObjectNotFoundException;
