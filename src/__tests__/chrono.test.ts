import { getChronoDB, closeChronoDB } from '../chrono';

test('close undefined', () => {
  closeChronoDB();
});

test('get twice', () => {
  const store = getChronoDB(`/tmp/r2/test/datastore/chronoDBTest`);
  const store2 = getChronoDB(`/tmp/r2/test/datastore/chronoDBTest`);
  expect(store).toBe(store2);
  closeChronoDB();
});
