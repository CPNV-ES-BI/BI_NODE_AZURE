"use strict";
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

class AzureBlobClient {
  constructor() {
    this.STORAGE_CONNECTION_STRING =
      process.env.STORAGE_CONNECTION_STRING || "";
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.STORAGE_CONNECTION_STRING
    );
  }

  async containers(){
    let iter = this.blobServiceClient.listContainers();
    let containers = [];
    containers.push(await iter.next());

    while(!containers[containers.length - 1].done){
      containers.push(await iter.next());
    }
    containers.pop(); // remove last element which is done and empty
    return containers;
  }

  async all(container){
    //create container client
    let containerClient = this.blobServiceClient.getContainerClient(container);

    //list blobs
    let iter = containerClient.listBlobsFlat(container);
    let blobs = [];
    blobs.push(await iter.next());

    while(!blobs[blobs.length - 1].done){
      blobs.push(await iter.next());
    }
    blobs.pop(); // remove last element which is done and empty
    return blobs;
  }

  async exists(container, blob){
    const containerClient = this.blobServiceClient.getContainerClient(container)
    const blobClient = containerClient.getBlobClient(blob);
    try {
        const properties = await blobClient.getProperties();
        return true;
    } catch (error) {
        if (error.statusCode === 404) {
            return false;
        } else {
            throw error;
        }
    }
  }

  async create(container, blob, content){
    const containerClient = this.blobServiceClient.getContainerClient(container);
    const blobClient = containerClient.getBlockBlobClient(blob);
    const createdBlob = await blobClient.upload(content, content.length);
    return createdBlob;
  }

  async delete(container, blob){
    const containerClient = this.blobServiceClient.getContainerClient(container);
    const blobClient = containerClient.getBlockBlobClient(blob);
    const deletedBlob = await blobClient.delete();
    return deletedBlob;
  }
}

module.exports.AzureBlobClient = AzureBlobClient;
