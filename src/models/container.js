/**
 * @brief This class is design to manage dataobjects
 * @author theo.gautier@cpnv.ch
 * @version 2022-12-07
 */

"use strict";

const AzureBlobClient = require("../config/components/AzureBlobClient").AzureBlobClient;

class Container {

  static async all() {
    let azureBlobClient = new AzureBlobClient();
    return await azureBlobClient.containers();
  }

  static async exists(containerName) {
    let azureBlobClient = new AzureBlobClient();
    return await azureBlobClient.containerExists(containerName);
  }


}

class ContainerNotFoundException extends Error {}
module.exports.Container = Container;
module.exports.ContainerNotFoundException = ContainerNotFoundException;