/*
 *
 * MembersPage actions
 *
 */

import { LOAD_MEMBERS_ACTION, LOAD_MEMBERS_SUCCESS_ACTION } from './constants';

export function loadMembersAction() {
  return {
    type: LOAD_MEMBERS_ACTION,
  };
}

export function loadMembersSuccessAction(members) {
  return {
    type: LOAD_MEMBERS_SUCCESS_ACTION,
    members,
  };
}
