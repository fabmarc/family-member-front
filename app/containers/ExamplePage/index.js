/**
 *
 * ExamplePage
 *
 */

import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import pageContainer, { useLoadableContainer } from 'utils/pageContainer';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import LayoutWrapper from 'components/LayoutWrapper';

import { makeSelectRandomValue } from './selectors';
import { defaultAction } from './actions';
import reducer from './reducer';
import saga from './saga';

const Body = styled.div`
  height: 1500px;
`;

export function ExamplePage({ dispatch, message, randomValue }) {
  const [Loadable, trackPromise] = useLoadableContainer();
  useInjectReducer({ key: 'examplePage', reducer });
  useInjectSaga({ key: 'examplePage', saga });

  useEffect(() => {
    const requests = parseInt(Math.random() * 10, 10);
    console.log('Number of Requests:', requests);
    for (let i = 1; i <= requests; i += 1) {
      trackPromise(
        dispatch(defaultAction())
          .then(() => {
            message.success(`Success - ${i}`);
          })
          .catch(error => {
            message.error(`${error.message} - ${i}`);
          }),
      );
    }
  }, []);

  return (
    <LayoutWrapper>
      <Loadable>
        <Body>
          <h1>Studies</h1>
          <h4>Random number: {randomValue}</h4>
        </Body>
      </Loadable>
    </LayoutWrapper>
  );
}

ExamplePage.propTypes = {
  dispatch: PropTypes.func,
  message: PropTypes.object,
  randomValue: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  randomValue: makeSelectRandomValue(),
});

export default compose(
  pageContainer(mapStateToProps),
  memo,
)(ExamplePage);
