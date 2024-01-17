import getStoredDocs from '../utils/getStoredDocs';

describe('getStoredDocs', () => {
  test('should return an array', async () => {
    const result = await getStoredDocs();
    expect(Array.isArray(result)).toBe(true);
  });
});
