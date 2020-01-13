import mockingoose from 'mockingoose';

import UserModel from '../../src/models/User';

describe('test mongoose User model', () => {
  test('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      email: 'john@example.com',
      password: 'password',
      role: 'hr',
    };

    const { password, ...returnDoc } = _doc;

    mockingoose(UserModel).toReturn(_doc, 'findOne');

    return UserModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(returnDoc);
    });
  });
});
