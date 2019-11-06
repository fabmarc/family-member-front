/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, DEFAULT_SUCCESS_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function defaultSuccessAction() {
  return {
    type: DEFAULT_SUCCESS_ACTION,
  };
}
