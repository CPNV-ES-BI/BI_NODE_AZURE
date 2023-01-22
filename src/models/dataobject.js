/**
 * @brief This class is design to manage dataobjects
 * @author theo.gautier@cpnv.ch
 * @version 2022-12-07
 */

"use strict";

const AzureBlobClient =
  require("../config/components/AzureBlobClient").AzureBlobClient;

class DataObject {

  name = null;
  containerName = null;
  constructor(name, containerName) {
    this.name = name;
    this.containerName = containerName;
  }
  static async all(containerName){
    let azureBlobClient = new AzureBlobClient();
    return await azureBlobClient.all(containerName);
  }
  async exists(){
    let azureBlobClient = new AzureBlobClient();
    return await azureBlobClient.exists(this.containerName, this.name);
  }
  async create(content){
    let azureBlobClient = new AzureBlobClient();
    if(await this.exists()) throw new DataObjectAlreadyExistsException();
    return await azureBlobClient.create(this.containerName, this.name, content);
  }

  download(){}

  publish(name){}

  async delete(){
    let azureBlobClient = new AzureBlobClient();
    if(!await this.exists()) throw new DataObjectNotFoundException(
      `The dataobject ${this.name} does not exist in the container ${this.containerName}`
    );

    return await azureBlobClient.delete(this.containerName, this.name);
  }
}

class DataObjectAlreadyExistsException extends Error {}
class DataObjectNotFoundException extends Error {}

module.exports.DataObject = DataObject;
module.exports.DataObjectAlreadyExistsException = DataObjectAlreadyExistsException;
module.exports.DataObjectNotFoundException = DataObjectNotFoundException;
