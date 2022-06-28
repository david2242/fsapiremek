const eventController = require('./event.controller');
const {mockRequest, mockResponse} = require('jest-mock-req-res');
const eventService = require('./event.service');

jest.mock('./event.service');

describe('EventController tests', () => {

  const mockData = [
    {
      "location": {
        "zip": "aergaerg",
        "city": "grr",
        "address": "rdgdr",
        "floorDoor": "drgd"
      },
      "_id": "62b76520c036cebab298b694",
      "name": "aseereee",
      "cause": "fruska",
      "nature": "publicLocation",
      "locationCode": "",
      "public": true,
      "startTime": "2022-06-30T21:31",
      "endTime": "2022-07-02T21:31",
      "dressCode": "asdf",
      "createdAt": "2022-06-25T19:42:24.881Z",
      "updatedAt": "2022-06-25T19:42:24.881Z",
      "__v": 0
    },
    {
      "location": {
        "zip": "7000",
        "city": "Sárbogárd",
        "address": "Hősök tere",
        "floorDoor": ""
      },
      "_id": "62b7744a7f735bf305e26578",
      "name": "MMM - Sárbogárd",
      "cause": "Mindenki magyarországa legyen",
      "nature": "publicLocation",
      "locationCode": "",
      "public": true,
      "startTime": "2022-06-25T09:00",
      "endTime": "2022-06-25T12:00",
      "dressCode": "utcai öltözet",
      "createdAt": "2022-06-25T20:47:06.250Z",
      "updatedAt": "2022-06-25T20:47:06.250Z",
      "__v": 0
    }
  ];

  let response;
  let request;
  let nextFunction;

  beforeEach(() => {
    eventService.__setMockData(mockData);

    response = mockResponse();
    request = mockRequest()
    nextFunction = jest.fn();
  })

  test("create() with valid data", () => {
    const testEvent = {
      "location": {
        "zip": "aergaerg",
        "city": "grr",
        "address": "rdgdr",
        "floorDoor": "drgd"
      },
      "_id": "62b76520c036cebab298b694",
      "name": "aseereee",
      "cause": "fruska",
      "nature": "publicLocation",
      "locationCode": "",
      "public": true,
      "startTime": "2022-06-30T21:31",
      "endTime": "2022-07-02T21:31",
      "dressCode": "asdf"
    };

    request.body = testEvent;

    return eventController.create(request, response, nextFunction)
        .then(() => {
          expect(eventService.create).toBeCalledWith(testEvent);
          expect(response.json).toBeCalledWith(testEvent);
        });


  });

  test("getAll() function test", () => {
    return eventController.getAll(request, response, nextFunction)
        .then(() => {
          expect(eventService.getAll).toBeCalled();
          expect(response.json).toBeCalledWith(mockData);
        })
  });

  test("getOne() with valid ID", () => {
    const EVENT_ID = "62b7744a7f735bf305e26578";

    request.params = {
      id: EVENT_ID
    };


    return eventController.getOneById(request, response, nextFunction)
        .then(() => {
          expect(eventService.getOne).toBeCalledWith(EVENT_ID);
          expect(response.json).toBeCalledWith(mockData.find(a => a._id === EVENT_ID));
        });
  });

  test("delete function test", () => {
    const EVENT_ID = "62b82f078c087d7e5afe738e";

    request.params = {
      id: EVENT_ID
    };

    return eventController.delete(request, response, nextFunction)
        .then(() => {
          expect(eventService.delete).toBeCalledWith(EVENT_ID);
          expect(response.json).toBeCalledWith(null);
        })
  });

  test("update function test with valid updateData", () => {
    const EVENT_ID = "62b82f078c087d7e5afe738e";

    const updateData = {
      "location": {
        "zip": "7000",
        "city": "Székesfehérvár",
        "address": "rdgdr",
        "floorDoor": "drgd"
      },
      "name": "NewName",
      "cause": "fruska",
      "nature": "publicLocation",
      "locationCode": "",
      "public": true,
      "startTime": "2022-06-30T21:31",
      "endTime": "2022-07-02T21:31",
      "dressCode": "asdf"
    };

    request.params = {
      id: EVENT_ID
    };
    request.body = updateData;

    return eventController.update(request, response, nextFunction)
        .then(() => {
          expect(eventService.update).toBeCalledWith(EVENT_ID, updateData);
          expect(response.json).toBeCalledWith(updateData);
        })
  })



});
