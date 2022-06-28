const articleService = jest.mock('./article.service');

let mockData;

articleService.create = jest.fn((articleData) => {
  return Promise.resolve(articleData);
})

articleService.getAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

articleService.getOne = jest.fn(slug => {
  return Promise.resolve(mockData.find(a => a.slug === slug));
});

articleService.delete = jest.fn((id) => {
  return Promise.resolve(null);
})

articleService.updateOne = jest.fn((slug, updateData) => {
  return Promise.resolve(updateData);
})

articleService.__setMockData = data => mockData = data;


module.exports = articleService;
