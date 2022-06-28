const userController = require('./user.controller');
const {mockRequest, mockResponse} = require('jest-mock-req-res');
const userService = require('./user.service');

jest.mock('./user.service');

describe('UserController tests', () => {

  const mockData = [
    {
      "role": "user",
      "_id": "629e01fcd40d6f344077b0ab",
      "username": "tomika",
      "password": "tomika_pass",
      "email": "nemvagyokbuzi@email.hu",
      "createdAt": "2022-06-06T13:32:44.593Z",
      "updatedAt": "2022-06-06T18:35:40.799Z",
      "__v": 0
    },
    {
      "role": "user",
      "_id": "629e1041629fc7af58331f2b",
      "username": "davidke",
      "password": "davidka_pass",
      "email": "davidka@email.hu",
      "createdAt": "2022-06-06T14:33:37.529Z",
      "updatedAt": "2022-06-06T14:33:37.529Z",
      "__v": 0
    },
    {
      "role": "user",
      "_id": "62a21ec5f74e8def4330acd6",
      "username": "Kati Mama",
      "password": "katipass",
      "email": "szentivanlady@tarr.hu",
      "createdAt": "2022-06-09T16:24:37.833Z",
      "updatedAt": "2022-06-09T16:24:37.833Z",
      "__v": 0
    },
    {
      "_id": "62a24f468d1cb9c04dbe3f83",
      "username": "Juci Mama",
      "password": "jucipass",
      "email": "bogardboy@tarr.hu",
      "role": "user",
      "createdAt": "2022-06-09T19:51:34.409Z",
      "updatedAt": "2022-06-09T19:51:34.409Z",
      "__v": 0
    },
    {
      "_id": "62b775547f735bf305e2657b",
      "username": "davidka",
      "password": "davidka",
      "email": "email@email.hu",
      "role": "user",
      "createdAt": "2022-06-25T20:51:32.798Z",
      "updatedAt": "2022-06-26T12:14:04.541Z",
      "__v": 0,
      "bio": "davidka bio",
      "imageRef": "https://res.cloudinary.com/ddkxkkxdt/image/upload/v1656245642/ih10roduuzizvnteitvq.jpg"
    },
    {
      "_id": "62b814a33f8954939d65d402",
      "username": "davidka2",
      "password": "davidka2",
      "email": "email2@email.hu",
      "role": "user",
      "createdAt": "2022-06-26T08:11:15.567Z",
      "updatedAt": "2022-06-26T12:36:37.046Z",
      "__v": 0,
      "imageRef": "https://res.cloudinary.com/ddkxkkxdt/image/upload/v1656246978/ieubpnbfc8c9die6ycsf.jpg",
      "bio": "davidka 2 bio"
    }
  ];

  let response;
  let request;
  let nextFunction;

  beforeEach(() => {
    userService.__setMockData(mockData);

    response = mockResponse();
    request = mockRequest()
    nextFunction = jest.fn();
  })

  test("create() with valid data", () => {
    const testUser = {
      "username": "davidka3",
      "password": "davidka3",
      "email": "email3@email.hu"
    };

    request.body = testUser;

    return userController.create(request, response, nextFunction)
        .then(() => {
          expect(userService.create).toBeCalledWith(testUser);
          expect(response.json).toBeCalledWith(testUser);
        });


  });

  test("getAll() function test", () => {
    return userController.getAll(request, response, nextFunction)
        .then(() => {
          expect(userService.getAll).toBeCalled();
          expect(response.json).toBeCalledWith(mockData);
        })
  });

  test("getOneByEmail() with valid EMAIL", () => {
    const EMAIL = "email@email.hu";

    request.params = {
      email: EMAIL
    };


    return userController.getOneByEmail(request, response, nextFunction)
        .then(() => {
          expect(userService.getOneByEmail).toBeCalledWith(EMAIL);
          expect(response.json).toBeCalledWith(mockData.find(u => u.email === EMAIL));
        });
  });

  test("delete function test", () => {
    const USER_ID = "62b814a33f8954939d65d402";

    request.params = {
      id: USER_ID
    };

    return userController.delete(request, response, nextFunction)
        .then(() => {
          expect(userService.delete).toBeCalledWith(USER_ID);
          expect(response.json).toBeCalledWith(null);
        })
  });

  test("update function test with valid updateData", () => {
    const EMAIL = "email2@email.hu";

    const updateData = {
      "username": "pirimiri",
      // "password": "pirimire",
      "email": "csiribiri@zabszalma.hu",
      "imageRef": "https://res.cloudinary.com/ddkxkkxdt/image/upload/v1656246978/ieubpnbfc8c9die6ycsf.jpg",
      "bio": "davidka 2 bio"
    };

    request.params = {
      email: EMAIL
    };
    request.body = updateData;

    return userController.update(request, response, nextFunction)
        .then(() => {
          expect(userService.update).toBeCalledWith(EMAIL, updateData);
          expect(response.json).toBeCalledWith(updateData);
        })
  })

});
