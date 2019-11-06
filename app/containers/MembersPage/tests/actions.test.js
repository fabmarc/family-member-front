import { loadMembersAction } from '../actions';
import { LOAD_MEMBERS_ACTION } from '../constants';

describe('MembersPage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: LOAD_MEMBERS_ACTION,
      };
      expect(loadMembersAction()).toEqual(expected);
    });
  });
});
