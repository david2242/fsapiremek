const eventService = jest.mock('./event.service');

let mockData;

eventService.create = jest.fn((eventData) => {
  return Promise.resolve(eventData);
})

eventService.getAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

eventService.getOne = jest.fn(id => {
  return Promise.resolve(mockData.find(a => a._id === id));
});

eventService.delete = jest.fn((id) => {
  return Promise.resolve(null);
})

eventService.update = jest.fn((id, updateData) => {
  return Promise.resolve(updateData);
})

eventService.__setMockData = data => mockData = data;


module.exports = eventService;
