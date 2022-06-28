const articleController = require('./article.controller');
const {mockRequest, mockResponse} = require('jest-mock-req-res');
const articleService = require('./article.service');

jest.mock('./article.service');

describe('ArticleController tests', () => {

  const mockData = [
    {
      "tagList": [],
      "favoriteCount": 0,
      "_id": "62a31e4d932f27d0ebe9fe94",
      "title": "Fake New No2",
      "description": "Ez egy igazi fakeNew",
      "body": "loremimspum baconsum loremimspum loremimspum loremimspum loremimspum loremimspum loremimspum loremimspum ",
      "tags": [
        "politics",
        "tech"
      ],
      "slug": "62a31e4d932f27d0ebe9fe94-Fake-New-No1",
      "__v": 0,
      "updatedAt": "2022-06-10T14:07:04.789Z",
      "favorited": 1
    },
    {
      "tagList": [],
      "favoriteCount": 0,
      "_id": "62a31f2ed395038933178932",
      "title": "Fake New No1",
      "description": "Ez egy próba fakeNew",
      "body": "loremimspum loremimspum loremimspum loremimspum loremimspum loremimspum loremimspum loremimspum loremimspum ",
      "tags": [
        "tag1",
        "tag2"
      ],
      "createdAt": "2022-06-10T10:38:38.701Z",
      "updatedAt": "2022-06-10T10:38:38.701Z",
      "slug": "62a31f2ed395038933178932-Fake-New-No1",
      "__v": 0
    },
    {
      "tagList": [],
      "favoriteCount": 0,
      "_id": "62b82440125e1a946bb7d777",
      "title": "Barát",
      "description": "Ellenség",
      "body": "aéshéae aseialé oaegi élaoihwaeaesdf sdaf ",
      "tags": [],
      "favorited": 0,
      "createdAt": "2022-06-26T09:17:52.292Z",
      "updatedAt": "2022-06-26T09:17:52.292Z",
      "slug": "62b82440125e1a946bb7d777-Barat",
      "__v": 0
    },
    {
      "_id": "62b82d07ad1184ae58d08b57",
      "title": "negyedik cikk",
      "description": "negyedik cikkleírás",
      "body": "asá ioewfiaá wefgwsefoéih akh aweiohgaoérg werf",
      "tagList": [
        "fakenews",
        "trueNews"
      ],
      "favoriteCount": 0,
      "createdAt": "2022-06-26T09:55:19.522Z",
      "updatedAt": "2022-06-26T11:27:45.924Z",
      "slug": "62b82d07ad1184ae58d08b57-negyedik-cikk",
      "__v": 0
    },
    {
      "_id": "62b82db180a226142b9def99",
      "title": "this is new shit",
      "description": "this is new shit description",
      "body": "a aeijhaé.sekrhg afáasef akuhs",
      "tagList": [
        "fakenews"
      ],
      "favoriteCount": 0,
      "createdAt": "2022-06-26T09:58:09.614Z",
      "updatedAt": "2022-06-26T09:58:09.614Z",
      "slug": "62b82db180a226142b9def99-this-is-new-shit",
      "__v": 0
    },
    {
      "_id": "62b82eac74aad0a5809e62ac",
      "title": "this is the new shit",
      "description": "this is the new description",
      "body": "this is the new descriptionthis is the new descriptionthis is the new descriptionthis is the new description",
      "tagList": [],
      "favoriteCount": 0,
      "createdAt": "2022-06-26T10:02:20.897Z",
      "updatedAt": "2022-06-26T10:02:20.897Z",
      "slug": "62b82eac74aad0a5809e62ac-this-is-the-new-shit",
      "__v": 0
    },
    {
      "_id": "62b82f078c087d7e5afe738e",
      "title": "miért hazudsz",
      "description": "miért hazudsz desc",
      "body": "miért hazudsz body",
      "tagList": [
        "bodybody"
      ],
      "favoriteCount": 0,
      "createdAt": "2022-06-26T10:03:51.512Z",
      "updatedAt": "2022-06-26T10:03:51.512Z",
      "slug": "62b82f078c087d7e5afe738e-miert-hazudsz",
      "__v": 0
    },
    {
      "_id": "62b82f6e71263fb34a6cf594",
      "title": "new article",
      "description": "new article description",
      "body": "new article body",
      "tagList": [
        "fakeBody2"
      ],
      "favoriteCount": 0,
      "createdAt": "2022-06-26T10:05:34.483Z",
      "updatedAt": "2022-06-26T10:05:34.483Z",
      "slug": "62b82f6e71263fb34a6cf594-new-article",
      "__v": 0
    },
    {
      "_id": "62b8308bcf9d599aaffe95ba",
      "title": "Hugo a víziló",
      "description": "hugo egy nagyon barátságos élőlény",
      "body": "és róla szól a mese",
      "tagList": [],
      "favoriteCount": 0,
      "author": "davidka",
      "createdAt": "2022-06-26T10:10:19.616Z",
      "updatedAt": "2022-06-26T10:10:19.616Z",
      "slug": "62b8308bcf9d599aaffe95ba-Hugo-a-vizilo",
      "__v": 0
    }
  ];

  let response;
  let request;
  let nextFunction;

  beforeEach(() => {
    articleService.__setMockData(mockData);

    response = mockResponse();
    request = mockRequest()
    nextFunction = jest.fn();
  })

  test("create() with valid data", () => {
    const testArticle = {
      "title": "Ariel a kis hableány",
      "description": "sellő aki ember akar lenni, akinek a lány meg sellő akar lenni",
      "body": "vár ránk a főőőőőőld",
      "tagList": [],
      "author": "test user",
    };

    request.body = testArticle;
    request.user = {
      username: testArticle.author
    }

    return articleController.create(request, response, nextFunction)
        .then(() => {
          expect(articleService.create).toBeCalledWith(testArticle);
          expect(response.json).toBeCalledWith(testArticle);
        });


  });

  test("getAll() function test", () => {
    return articleController.getAll(request, response, nextFunction)
        .then(() => {
          expect(articleService.getAll).toBeCalled();
          expect(response.json).toBeCalledWith(mockData);
        })
  });

  test("getOne() with valid SLUG", () => {
    const ARTICLE_SLUG = "62b8308bcf9d599aaffe95ba-Hugo-a-vizilo";

    request.params = {
        slug: ARTICLE_SLUG
    };


    return articleController.getOne(request, response, nextFunction)
        .then(() => {
          expect(articleService.getOne).toBeCalledWith(ARTICLE_SLUG);
          expect(response.json).toBeCalledWith(mockData.find(a => a.slug === ARTICLE_SLUG));
        });
  });

  test("delete function test", () => {
    const ARTICLE_ID = "62b82f078c087d7e5afe738e";

    request.params = {
      id: ARTICLE_ID
    };

    return articleController.delete(request, response, nextFunction)
        .then(() => {
          expect(articleService.delete).toBeCalledWith(ARTICLE_ID);
          expect(response.json).toBeCalledWith(null);
        })
  });

  test("updateOne function test with valid updateData", () => {
    const ARTICLE_SLUG = "62b8308bcf9d599aaffe95ba-Hugo-a-vizilo";

    const updateData = {
      "title": "Hugo a víziló - második rész",
      "description": "hugo egy nagyon barátságos élőlény",
      "body": "és róla szól a mese, a szultán döntése",
      "tagList": [],
      "favoriteCount": 0,
      "author": "davidka",
      "createdAt": "2022-06-26T10:10:19.616Z",
      "updatedAt": "2022-06-26T10:10:19.616Z",
      "slug": "62b8308bcf9d599aaffe95ba-Hugo-a-vizilo",
      "__v": 0
    };

    request.params = {
      slug: ARTICLE_SLUG
    };
    request.body = updateData;

    return articleController.updateOne(request, response, nextFunction)
        .then(() => {
          expect(articleService.updateOne).toBeCalledWith(ARTICLE_SLUG, updateData);
          expect(response.json).toBeCalledWith(updateData);
        })
  })

});
