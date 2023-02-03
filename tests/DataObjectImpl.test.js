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
const regexValidURL = /^https:\/\/[a-z0-9]+\.blob\.core\.windows\.net\/[a-z0-9-]+\/[a-z0-9-]+$/i;
let path = 'esbinode/theTestDataObject';

let content = 'the content of the test dataobject';

beforeAll(async ()=>{
  dataObject = new DataObjectImpl();
  if (await dataObject.doesExist(path)) dataObject.delete(path);
  await dataObject.create(path,content);
})

afterAll(async () => {
  if (await dataObject.doesExist(path)) dataObject.delete(path);
});

test("CreateObject_NominalCase_ObjectExists", async () => {
  //given
  let newDataObject = new DataObjectImpl();
  //when
  await newDataObject.create("esbinode/test",content);
  //then
  await expect(newDataObject.doesExist("esbinode/test")).resolves.toBe(true);
  // tear down
  await newDataObject.delete("esbinode/test");
});

test("CreateObject_AlreadyExists_ThrowException", async () => {
  //given

  //when

  //then
  await expect(dataObject.create(path,content)).rejects.toThrow(DataObjectAlreadyExistsException);
});

test("DoesExist_NotExists_False", async() => {
  //given
  let notExistingDataObject = new DataObjectImpl();
  //when

  //then
  await expect(notExistingDataObject.doesExist("esbinode/test2")).resolves.toBe(false);
});

test("DoesExist_ExistsCase_True", async () => {
  //given

  //when

  //then
  await expect(dataObject.doesExist(path)).resolves.toBe(true);
});

test("CreateObject_PathNotExists_ObjectExists", async () => {
  //given
  let notExistingPath = "noPath/notPath";
  let newDataObject = new DataObjectImpl();
  //when

  //then
  await expect(newDataObject.create(notExistingPath, content)).rejects.toThrow(DataObjectPathNotFoundException);
});

test("DownloadObject_NominalCase_Downloaded", async () => {
  //given

  //when

  //then
  await expect(existingDataObject.download(path)).resolves.toBe(content);
});

test("DownloadObject_NotExists_ThrowException", async () => {
  //given
  let newPath = "esbinode/ToDownload";
  //when

  //then
  await expect(dataObject.download(newPath)).rejects.toThrow(DataObjectNotFoundException);
});

test("PublishObject_NominalCase_ObjectPublished", async () => {
  //given

  //when
  let result = await existingDataObject.publish(path);
  //then
  expect(regexValidURL.test(result)).toBe(true); 
});

test("PublishObject_ObjectNotFound_ThrowException", async () => {
  //given
  let newPath = "esbinode/ToPublish";
  //when
  
  //then
  await expect(dataObject.publish(newPath)).rejects.toThrow(DataObjectNotFoundException);
});

test("DeleteObject_NominalCase_ObjectDeleted", async () => {
  //given
  let newPath = "esbinode/ToDelete";
  await dataObject.create(newPath, content);
  //when
  await dataObject.delete(newPath);
  //then
  await expect(dataObject.doesExist(newPath)).resolves.toBe(false);
});

test("DeleteObject_ObjectNotFound_ObjectDeleted", async () => {
  //given
  let newPath = "esbinode/ToDelete";
  //when

  //then
  await expect(dataObject.delete(newPath)).rejects.toThrow(DataObjectNotFoundException);
});