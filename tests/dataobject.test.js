/**
 * @brief This class is designed to test the behaviour of the dataobject class.
 * @author Theo.gautier@cpnv.ch
 * @version 2022-12-07
 */

"use strict";

let DataObject = require('../src/models/dataobject.js').DataObject
let DataObjectAlreadyExistsException = require('../src/models/dataobject.js').DataObjectAlreadyExistsException
let DataObjectNotFoundException = require('../src/models/dataobject.js').DataObjectNotFoundException

let dataObject = null;
let existingDataObject = null;

let existingDataObjectName = 'testExistingDataObject';

beforeAll(()=>{
  existingDataObject = new DataObject();
  existingDataObject.name = existingDataObjectName;
  existingDataObject.create();
})

afterAll(() => {
  existingDataObjectName.delete();
});

beforeEach(() => {
  dataObject = new DataObject();
})

afterEach(() => {
  dataObject.delete();
})

test("DoesExist_ExistsCase_True",() => {
  //given
  dataObject.name = existingDataObjectName;
  //when

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
