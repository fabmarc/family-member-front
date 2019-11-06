import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import LoaderContainer, { showLoader } from 'components/LoaderContainer';

let messageFunctions = null;
const loaderRef = React.createRef();

const dispatchAction = _.memoize((dispatch, promise = true) => params => {
  const action = params;
  if (promise) {
    return new Promise((resolve, reject) => {
      action.resolve = resolve;
      action.reject = reject;
      dispatch(action);
    });
  }
  return dispatch(action);
});

export const useLoadableContainer = () => {
  const { promiseInProgress } = usePromiseTracker();
  useEffect(() => {
    showLoader(loaderRef, promiseInProgress);
  }, [promiseInProgress]);
  return [LoadableContainer, trackPromise];
};

const LoadableContainer = ({ children, blur }) => (
  <LoaderContainer ref={loaderRef} blur={blur}>
    {children}
  </LoaderContainer>
);

LoadableContainer.propTypes = {
  children: PropTypes.node,
  blur: PropTypes.bool,
};

export default mapStateToProps => PageContainer => {
  function PageContainerPattern(props) {
    const { enqueueSnackbar } = useSnackbar();
    const { dispatch } = props;

    if (!messageFunctions) {
      messageFunctions = [
        'default',
        'info',
        'success',
        'error',
        'warning',
      ].reduce((init, variant) => {
        const accum = init;
        accum[variant] = message => enqueueSnackbar(message, { variant });
        return accum;
      }, {});
    }
    return (
      <PageContainer
        {...props}
        message={messageFunctions}
        dispatch={dispatchAction(dispatch)}
      />
    );
  }

  PageContainerPattern.propTypes = {
    dispatch: PropTypes.func,
  };

  return connect(mapStateToProps)(PageContainerPattern);
};
