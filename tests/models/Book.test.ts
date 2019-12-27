import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import BookModel from '../../src/models/Book';

describe('test mongoose User model', () => {
  test('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'name',
      author: 'author',
    };

    mockingoose(BookModel).toReturn(_doc, 'findOne');

    return BookModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});
