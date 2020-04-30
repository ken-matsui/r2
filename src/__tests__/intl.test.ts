// @ts-ignore
import { getConfigRoot } from '../configUtil';

// @ts-ignore
getConfigRoot = jest.fn().mockImplementation(() => {
  throw new Error();
});

test('intl catch', () => {
  expect(() => require('../intl')).not.toThrow();
});
