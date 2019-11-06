import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the MembersPage state domain
 */
const selectMembersPageDomain = state => state.membersPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectMembers = () =>
  createSelector(
    selectMembersPageDomain,
    substate => substate.members,
  );

const makeSelectPagination = () =>
  createSelector(
    selectMembersPageDomain,
    substate => substate.pagination,
  );

/**
 * Default selector used by MembersPage
 */
const makeSelectMembersPage = () =>
  createSelector(
    selectMembersPageDomain,
    substate => substate,
  );

export default makeSelectMembersPage;
export { makeSelectMembers, makeSelectPagination };
