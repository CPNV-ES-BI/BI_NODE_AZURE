"use strict";
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();
const DataObject = require('../../models/DataObject');


class DataObjectImpl extends DataObject {
  constructor() {
    super();
    this.STORAGE_CONNECTION_STRING =
      process.env.STORAGE_CONNECTION_STRING || "";
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.STORAGE_CONNECTION_STRING);
  }

  #isContainer(path) {
    return path.split("/").length === 1;
  }

  #getContainerClient(path) {
    if(this.#isContainer(path)) {
      return this.blobServiceClient.getContainerClient(path);
    } else {
      const containerName = path.split("/")[0];
      return this.blobServiceClient.getContainerClient(containerName);
    }
  }
  
  async doesExist(path) {
    const containerClient = this.blobServiceClient.getContainerClient(path);
    if(this.#isContainer(path)) {
      return await containerClient.exists();
    } else {
      if(await !containerClient.exists()) throw new DataObjectPathNotFoundException();
      const blobName = path.substring(path.indexOf('/') + 1);
      const blobClient = containerClient.getBlockBlobClient(blobName);
      return await blobClient.exists();
    }
  }

  async create(path = DataObjectImpl.PATH, content) {
   /*  const containerClient = this.blobServiceClient.getContainerClient(path);
    if(await !containerClient.exists()) throw new DataObjectPathNotFoundException();
    const blobClient = containerClient.getBlockBlobClient(this.name);
    if(await this.exists(this.name)) throw new DataObjectAlreadyExistsException();
    const createdBlob = await blobClient.upload(content, content.length);
    return createdBlob; */
  }

  async delete() {
    /* const containerClient = this.blobServiceClient.getContainerClient(this.PATH);
    if(await !containerClient.exists()) throw new DataObjectPathNotFoundException();
    const blobClient = containerClient.getBlockBlobClient(this.name);
    if(await !this.exists(this.name)) throw new DataObjectNotFoundException();
    const deletedBlob = await blobClient.delete();
    return deletedBlob; */
  }
}


class DataObjectAlreadyExistsException extends Error {}
class DataObjectNotFoundException extends Error {}
class DataObjectPathNotFoundException extends Error {}

module.exports.DataObjectImpl = DataObjectImpl;
module.exports.DataObjectAlreadyExistsException = DataObjectAlreadyExistsException;
module.exports.DataObjectNotFoundException = DataObjectNotFoundException;
module.exports.DataObjectPathNotFoundException = DataObjectPathNotFoundException;
