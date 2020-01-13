import { hashPassword, comparePassword } from '../../src/services/password';

const password = 'password';
const hash = '$2b$10$FeMG1txVUv/M6d.DZXwc0eMftlzN/TERjTUaz7XM/ukw1rWYD696y';

describe('test password service', () => {
  test('should return hash password', async done => {
    const hash = await hashPassword(password);
    expect(hash).not.toEqual(password);
    done();
  });

  test('should verify hash password', async done => {
    const result = await comparePassword(password, hash);
    expect(result).toBeTruthy();
    done();
  });
});
