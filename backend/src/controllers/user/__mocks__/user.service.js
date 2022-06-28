const userService = jest.mock('./user.service');

let mockData;

userService.create = jest.fn((userData) => {
  return Promise.resolve(userData);
})

userService.getAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

userService.getOneByEmail = jest.fn(email => {
  return Promise.resolve(mockData.find(u => u.email === email));
});

userService.delete = jest.fn((id) => {
  return Promise.resolve(null);
})

userService.update = jest.fn((id, updateData) => {
  return Promise.resolve(updateData);
})

userService.__setMockData = data => mockData = data;


module.exports = userService;
