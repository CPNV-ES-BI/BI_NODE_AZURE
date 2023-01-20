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
}

module.exports.Container = Container;
