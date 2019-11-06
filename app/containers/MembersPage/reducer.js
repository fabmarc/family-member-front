/*
 *
 * MembersPage reducer
 *
 */
import produce from 'immer';
import { LOAD_MEMBERS_SUCCESS_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const membersPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MEMBERS_SUCCESS_ACTION:
        draft.pagination = action.pagination;
        draft.members = action.members;
        break;
    }
  });

export default membersPageReducer;
