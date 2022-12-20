/**
 * @brief This class is designed to test the behaviour of the dataobject class.
 * @author Theo.gautier@cpnv.ch
 * @version 2022-12-07
 */

"use strict";

let DataObject = require('../src/models/DataObject.js').DataObject
let DataObjectAlreadyExistsException = require('../src/models/DataObject.js').DataObjectAlreadyExistsException
let DataObjectNotFoundException = require('../src/models/DataObject.js').DataObjectNotFoundException

let dataObject = null;
let existingDataObject = null;

//TODO REVIEW rename "existingDataObject" - it's juste a dataobject
let existingDataObjectName = 'testExistingDataObject';

beforeAll(()=>{
    //TODO REVIEW The DataObject Constructor should get the dataobject (root) name. Otherwise when you invoke create method, you do not have the object name to create.
  existingDataObject = new DataObject();
  existingDataObject.name = existingDataObjectName;//TODO Review - the DataObject will not change during the whole lifecycle of the object. Consider using constructor parameter instead of.
  existingDataObject.create();
})

afterAll(() => {
  //TODO REVIEW Avoid generating "unexpected" exception. Test before deleting (DoesExist)
  existingDataObjectName.delete();
});

beforeEach(() => {
  dataObject = new DataObject();
})

afterEach(() => {
  //TODO REVIEW Does it make sens to delete it after each test ?
  dataObject.delete();
})

//TODO REVIEW Update test signature (true / false have been replaced by or explicite expected result)
test("DoesExist_ExistsCase_True",() => {
  //given
  dataObject.name = existingDataObjectName;
  //when
  //TODO REVIEW Add comment - Event will be invoked by the assertion

  //then
  expect(dataObject.exists()).toBe(true);
});

test("DoesExist_NotExists_False", () => {
  //given
  dataObject.name = "notTestDataObject";
  //when

  //then
  expect(dataObject.exists()).toBe(false);

});

test("CreateObject_NominalCase_ObjectExists", () => {
  //given
  dataObject.name = "testNewDataObject"
  //TODO REVIEW Test if the objec doesn't exist
  //when
  dataObject.create();
  //then
  expect(dataObject.exists()).toBe(true);
});

test("CreateObject_AlreadyExists_ThrowException", () => {
  //given
  dataObject.name = "testNewDataObject";
  dataObject.create();
  //when

  //then
  expect(() => {
    dataObject.create();
  }).toThrow(DataObjectAlreadyExistsException);

});

test("CreateObject_PathNotExists_ObjectExists", () => { // TODO - understand the test
  //TODO REVIEW This test test the object creation, when the remote path (on the cloud) doesn't exists. Like the command "mkdir -p" on linux
  //given

  //when

  //then

});

test("DownloadObject_NominalCase_Downloaded", () => {
  //given

  //when

  //then
  //TODO REVIEW You should test if the file was uploaded. What about md5 checksum between original and downloaded object ?
  expect(existingDataObject.download()).toBe(true); // TODO - clarify what is expected
});

test("DownloadObject_NotExists_ThrowException", () => {
  //given
  dataObject.name = "notTestDataObject";
  //when

  //then
  //TODO REVIEW We try to download an inexisting file on the dataobject provider
  expect(() => {
    dataObject.download(); // TODO - clarify what is expected
  }).toThrow(DataObjectNotFoundException);
});

test("PublishObject_NominalCase_ObjectPublished", () => {
  //given

  //when

  //then
  //TODO REVIEW https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview
  expect(existingDataObject.publish()).toBe(true); // TODO - clarify what is expected
});

test("PublishObject_ObjectNotFound_ThrowException", () => {
  //given

  //when

  //then
  expect(() => {
    dataObject.publish();
  }).toThrow(DataObjectNotFoundException);
});

test("DeleteObject_NominalCase_ObjectDeleted", () => {
  //given
  dataObject.name = "dataObjectToDelete"
  dataObject.create();

  //when

  //then
  expect(dataObject.delete()).toBe(true);
});

test("DeleteObject_ObjectNotFound_ObjectDeleted", () => {
  //given
  dataObject.name = "notDataObjectToDelete";

  //when

  //then
  expect(dataObject.delete()).toBe(false);
});

test("All_NominalCase_ReturnAllObjects", () => {
  //given

  //when

  //then
  expect(DataObject.all()).toBeInstanceOf(Array);
});