/**
 * @brief This class is design to manage dataobjects
 * @author theo.gautier@cpnv.ch
 * @version 2022-12-07
 */

"use strict";

class DataObject {

  name = null

  static all(){ return [] }
  exists(){}
  create(){}
  download(){}
  publish(){}
  delete(){}
}

class DataObjectAlreadyExistsException extends Error {}
class DataObjectNotFoundException extends Error {}

module.exports.DataObject = DataObject;
module.exports.DataObjectAlreadyExistsException = DataObjectAlreadyExistsException;
module.exports.DataObjectNotFoundException = DataObjectNotFoundException;
