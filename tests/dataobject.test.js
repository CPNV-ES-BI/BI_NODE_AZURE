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

let DataObjectName = 'theDataObject';

beforeAll(()=>{
  dataObject = new DataObject(DataObjectName);
  dataObject.create();
})

afterAll(() => {
  if (dataObject.exists()) dataObject.delete();
});

test("All_NominalCase_ReturnAllObjects", () => {
  //given

  //when

  //then
  expect(DataObject.all()).toBeInstanceOf(Array);
});

test("CreateObject_NominalCase_ObjectExists", () => {
  //given

  let newDataObject = new DataObject("testNewDataObject");
  //when
  newDataObject.create();
  //then
  expect(newDataObject.exists()).toBe(true);
  // tear down
  newDataObject.delete();
});

test("CreateObject_AlreadyExists_ThrowException", () => {
  //given

  //when

  //then
  expect(() => {
    dataObject.create();
  }).toThrow(DataObjectAlreadyExistsException);
});

test("DoesExist_NotExists_False", () => {
  //given
  let notExistingDataObject = new DataObject("notExistingDataObject");
  //when

  //then
  expect(notExistingDataObject.exists()).toBe(false);
});

test("DoesExist_ExistsCase_True",() => {
  //given
  //when

  //then
  expect(dataObject.exists()).toBe(true);
});

test("CreateObject_PathNotExists_ObjectExists", () => { // TODO - understand the test
  //given

  //when

  //then

});

test("DownloadObject_NominalCase_Downloaded", () => {
  //given

  //when

  //then
  expect(existingDataObject.download()).toBe(true); // TODO - clarify what is expected
});

test("DownloadObject_NotExists_ThrowException", () => {
  //given
  dataObject.name = "notTestDataObject";
  //when

  //then
  expect(() => {
    dataObject.download(); // TODO - clarify what is expected
  }).toThrow(DataObjectNotFoundException);
});

test("PublishObject_NominalCase_ObjectPublished", () => {
  //given

  //when

  //then
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