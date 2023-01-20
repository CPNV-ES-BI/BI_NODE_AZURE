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
}

module.exports.AzureBlobClient = AzureBlobClient;
