import { signPayload, verifyToken } from '../../src/services/jwt';

const payload = { id: '507f191e810c19729de860ea' };
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxOTFlODEwYzE5NzI5ZGU4NjBlYSIsImlhdCI6MTU3Nzk2NTUwOCwiZXhwIjozMTU1OTM0NjE2fQ.C2kEK2lyG_Oclik0OVjGA75IIOUJw9A1E8qAWTtMTaI';

describe('test JWT service', () => {
  test('should return JWT token', async done => {
    const token = await signPayload(payload);
    expect(token).toBeTruthy();
    done();
  });

  test('should verify JWT token', async done => {
    const decryptPayload: any = await verifyToken(token);
    expect(decryptPayload).toBeTruthy();
    expect(decryptPayload.id).toEqual(payload.id);
    done();
  });
});
