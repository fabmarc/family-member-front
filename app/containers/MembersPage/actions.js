/*
 *
 * MembersPage actions
 *
 */

import {
  LOAD_MEMBERS_ACTION,
  LOAD_MEMBERS_SUCCESS_ACTION,
} from './constants';

export function loadMembersAction(page = 1) {
  return {
    type: LOAD_MEMBERS_ACTION,
    page,
  };
}

export function loadMembersSuccessAction(members, pagination) {
  return {
    type: LOAD_MEMBERS_SUCCESS_ACTION,
    pagination,
    members,
  };
}
