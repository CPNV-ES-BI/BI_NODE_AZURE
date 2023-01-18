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

  containers(){
    return this.blobServiceClient.listContainers();
  }
}

module.exports.AzureBlobClient = AzureBlobClient;
