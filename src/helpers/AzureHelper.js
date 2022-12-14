"use strict";
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

class AzureHelper {
  constructor() {
    this.STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
    this.blobServiceClient = BlobServiceClient.fromConnectionString(this.STORAGE_CONNECTION_STRING);
  }
}

module.exports.AzureHelper = AzureHelper;
