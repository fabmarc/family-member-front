/*
 *
 * ExamplePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_SUCCESS_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const examplePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_SUCCESS_ACTION:
        draft.randomValue = Math.random() * 1000;
        break;
    }
  });

export default examplePageReducer;
