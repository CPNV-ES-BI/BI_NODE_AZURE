"use strict";
const { BlobServiceClient, BlobSASPermissions, StorageSharedKeyCredential, generateBlobSASQueryParameters } = require("@azure/storage-blob");
require("dotenv").config();
const DataObject = require('../../models/DataObject');


class DataObjectImpl extends DataObject {
  constructor() {
    super();
    this.STORAGE_CONNECTION_STRING =
      process.env.STORAGE_CONNECTION_STRING || "";
    this.ACCOUNT_NAME = process.env.ACCOUNT_NAME || "";
    this.KEY = process.env.KEY || "";
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.STORAGE_CONNECTION_STRING);
  }

  #isContainer(path) {
    return path.split("/").length === 1;
  }

  async #getContainer(path) {
    if (this.#isContainer(path)) {
      return await this.blobServiceClient.getContainerClient(path);
    } else {
      const containerName = path.split("/")[0];
      return await this.blobServiceClient.getContainerClient(containerName);
    }
  }

  async doesExist(path) {
    const containerClient = await this.#getContainer(path);
    try {
      const containerExist = await containerClient.exists();
      if (this.#isContainer(path)) return containerExist;
      if (!containerExist) throw new DataObjectPathNotFoundException();
    }
    catch (error) {
      if (error.statusCode === 404) {
        throw new DataObjectPathNotFoundException();
      } else {
        throw error;
      }
    }
    const blobName = path.substring(path.indexOf('/') + 1);
    const blobClient = await containerClient.getBlockBlobClient(blobName);

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

  async #createContainer(path) {
    const containerClient = await this.#getContainer(path);
    const containerExist = await containerClient.exists();
    if (containerExist) throw new DataObjectAlreadyExistsException();
    const createdContainer = await containerClient.create();
    return createdContainer;
  }

  async #createBlob(path, content) {
    const containerClient = await this.#getContainer(path.split("/")[0]);
    const blobName = path.substring(path.indexOf('/') + 1);
    const blobClient = await containerClient.getBlockBlobClient(blobName);
    return await blobClient.upload(content, content.length);
  }

  async create(path, content) {
    if (await this.doesExist(path))
      throw new DataObjectAlreadyExistsException();
    if (this.#isContainer(path)) {
      return await this.#createContainer(path);
    } else {
      return await this.#createBlob(path, content);
    }
  }

  async delete(path) {
    if (!(await this.doesExist(path)))
      throw new DataObjectNotFoundException();
    else if (this.#isContainer(path)) {
      const containerClient = await this.#getContainer(path);
      return await containerClient.delete();
    } else {
      const containerClient = await this.#getContainer(path.split("/")[0]);
      const blobName = path.substring(path.indexOf('/') + 1);
      const blobClient = await containerClient.getBlockBlobClient(blobName);
      return await blobClient.delete();
    }
  }

  async download(path) {
    if (this.#isContainer(path)) throw new DataObjectPathNotFoundException();
    if (!(await this.doesExist(path))) throw new DataObjectNotFoundException();
    const containerClient = await this.#getContainer(path.split("/")[0]);
    const blobName = path.substring(path.indexOf('/') + 1);
    const blobClient = await containerClient.getBlockBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
    async function streamToBuffer(readableStream) {
      return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
          chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
          resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
      });
    }
    return downloaded.toString();
  }

  async publish(path) {
    if (this.#isContainer(path)) throw new DataObjectPathNotFoundException();
    if (!(await this.doesExist(path))) throw new DataObjectNotFoundException();
    const cerds = new StorageSharedKeyCredential(this.ACCOUNT_NAME, this.KEY);
    const containerName = path.split("/")[0];
    const containerClient = await this.#getContainer(path.split("/")[0]);
    const blobName = path.substring(path.indexOf('/') + 1);
    const blobClient = await containerClient.getBlockBlobClient(blobName);

    const blobSAS = generateBlobSASQueryParameters({
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("r"),
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 86400)
      },
      cerds
    ).toString();

    const sasUrl = `${blobClient.url}?${blobSAS}`;
    return sasUrl;
  }
}


class DataObjectAlreadyExistsException extends Error { }
class DataObjectNotFoundException extends Error { }
class DataObjectPathNotFoundException extends Error { }

module.exports.DataObjectImpl = DataObjectImpl;
module.exports.DataObjectAlreadyExistsException = DataObjectAlreadyExistsException;
module.exports.DataObjectNotFoundException = DataObjectNotFoundException;
module.exports.DataObjectPathNotFoundException = DataObjectPathNotFoundException;
