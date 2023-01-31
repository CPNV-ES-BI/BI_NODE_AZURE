/**
 * @brief This class is designed to test the behaviour of the dataobject class.
 * @author Theo.gautier@cpnv.ch
 * @version 2022-12-07
 */

"use strict";

let DataObjectImpl = require('../src/config/components/DataObjectImpl.js').DataObjectImpl;
let DataObjectAlreadyExistsException = require('../src/config/components/DataObjectImpl.js').DataObjectAlreadyExistsException
let DataObjectNotFoundException = require('../src/config/components/DataObjectImpl.js').DataObjectNotFoundException
let DataObjectPathNotFoundException = require('../src/config/components/DataObjectImpl.js').DataObjectPathNotFoundException

let dataObject = null;

let DataObjectName = 'theDataObject';

beforeAll(async ()=>{
  dataObject = new DataObjectImpl(DataObjectName);
  let content = 'the content of the dataobject';
  if(!await dataObject.exists()) await dataObject.create(content);
})

afterAll(async () => {
  if (await dataObject.exists()) dataObject.delete();
});

test("All_NominalCase_ReturnAllObjects",async () => {
  //given

  //when

  //then
  await expect(DataObjectImpl.all()).resolves.toBeInstanceOf(Array);
});

test("CreateObject_NominalCase_ObjectExists", async () => {
  //given
  let newDataObject = new DataObjectImpl("testNewDataObject");
  //when
  await newDataObject.create("the content of the dataobject");
  //then
  await expect(newDataObject.exists()).resolves.toBe(true);
  // tear down
  await newDataObject.delete();
});

test("CreateObject_AlreadyExists_ThrowException", async () => {
  //given

  //when

  //then
  await expect(dataObject.create("the content of the dataobject")).rejects.toThrow(DataObjectAlreadyExistsException);
});

test("DoesExist_NotExists_False", async() => {
  //given
  let notExistingDataObject = new DataObjectImpl("notExistingDataObject");
  //when

  //then
  await expect(notExistingDataObject.exists()).resolves.toBe(false);
});

test("DoesExist_ExistsCase_True", async () => {
  //given

  //when

  //then
  await expect(dataObject.exists()).resolves.toBe(true);
});

test("CreateObject_PathNotExists_ObjectExists", async () => {
  //given
  let notExistingPath = "notPath";
  let newDataObject = new DataObjectImpl("testNewDataObject", notExistingPath);
  //when

  //then
  await expect(newDataObject.create("the content of the dataobject")).rejects.toThrow(DataObjectPathNotFoundException);
});

test("DownloadObject_NominalCase_Downloaded", () => {
  //given

  //when

  //then
  expect(existingDataObject.download()).toBe(true); // TODO - clarify what is expected
});

test("DownloadObject_NotExists_ThrowException", () => {
  //given
  
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

test("DeleteObject_NominalCase_ObjectDeleted", async () => {
  //given
  //await dataObject.create("the content of the dataobject");
  //when
  await dataObject.delete();
  //then
  await expect(dataObject.exists()).resolves.toBe(false);
});

test("DeleteObject_ObjectNotFound_ObjectDeleted", async () => {
  //given
  dataObject.name = "notDataObjectToDelete";

  //when

  //then
  await expect(dataObject.delete()).rejects.toThrow(DataObjectNotFoundException);
});