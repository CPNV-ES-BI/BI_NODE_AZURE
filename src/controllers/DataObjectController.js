/**
 * @brief This class is design to manage dataobjects
 * @author theo.gautier@cpnv.ch, helene.dubuis@cpnv.ch
 * @version 2022-12-07
 */

"use strict";

const DataObject = require("../models/DataObject");
const AzureBlobClient =
  require("../config/components/DataObjectImpl").AzureBlobClient;
require("dotenv").config();


class DataObjectController extends DataObject {
  name = null;
  path = null;
  constructor(name) {
    this.name = name;
    this.path = process.env.PATH;
  }
  static async all() {
    if (!await Container.exists(this.path)) throw new DataObjectPathNotFoundException();
    let azureBlobClient = new AzureBlobClient();
    return await azureBlobClient.all(this.path);
  }
  async exists() {
    if (!await Container.exists(this.path)) throw new DataObjectPathNotFoundException();
    let azureBlobClient = new AzureBlobClient();
    return await azureBlobClient.exists(this.path, this.name);
  }
  async create(content, path = this.PATH) {
    if (!await Container.exists(this.path)) throw new DataObjectPathNotFoundException();
    let azureBlobClient = new AzureBlobClient();
    if (await this.exists()) throw new DataObjectAlreadyExistsException();
    return await azureBlobClient.create(this.path, this.name, content);
  }

  download() { }

  publish(name) { }

  async delete() {
    if (!await Container.exists(this.path)) throw new DataObjectPathNotFoundException(
      `The path ${path} does not exist`
    );
    let azureBlobClient = new AzureBlobClient();
    if (!await this.exists()) throw new DataObjectNotFoundException(
      `The dataobject ${this.name} does not exist in ${this.path}`
    );

    return await azureBlobClient.delete(this.path, this.name);
  }
}

class DataObjectAlreadyExistsException extends Error { }
class DataObjectNotFoundException extends Error { }
class DataObjectPathNotFoundException extends Error { }

module.exports.DataObjectController = DataObjectController;
module.exports.DataObjectAlreadyExistsException = DataObjectAlreadyExistsException;
module.exports.DataObjectNotFoundException = DataObjectNotFoundException;
module.exports.DataObjectPathNotFoundException = DataObjectPathNotFoundException;
