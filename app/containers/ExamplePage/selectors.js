import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the examplePage state domain
 */
const selectExamplePageDomain = state => state.examplePage || initialState;

/**
 * Other specific selectors
 */
const makeSelectRandomValue = () =>
  createSelector(
    selectExamplePageDomain,
    substate => substate.randomValue,
  );

/**
 * Default selector used by HomePage
 */
const makeSelectHomePage = () =>
  createSelector(
    selectExamplePageDomain,
    substate => substate,
  );

export default makeSelectHomePage;
export { makeSelectRandomValue };
