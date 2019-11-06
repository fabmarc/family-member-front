import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import LoaderIndicator from '../LoaderIndicator';

const LoaderWrapper = styled.div`
  position: relative;
`;

const BlurryWrapper = styled.div`
  ${props =>
    props.loading &&
    css`
      filter: blur(3px);
    `};
`;

const BlockingOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`;

export const showLoader = (loaderRef, flag) => {
  if (loaderRef && loaderRef.current) loaderRef.current.showLoader(flag);
};

export const hideLoader = loaderRef => {
  if (loaderRef && loaderRef.current) loaderRef.current.showLoader(false);
};

class LoaderContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: 0 };
  }

  increaseLoading = () => {
    this.setState(({ loading }) => {
      let count = loading;
      count += 1;
      return { loading: count };
    });
  };

  decreaseLoading = () => {
    this.setState(({ loading }) => {
      let count = loading;
      count -= 1;
      if (count < 0) count = 0;
      return { loading: count };
    });
  };

  showLoader = (flag = true, timeout = 300000) =>
    new Promise(resolve => {
      if (flag) this.increaseLoading();
      else this.decreaseLoading();
      clearTimeout(this.loadingTimeout);
      if (flag) this.loadingTimeout = this.hideLoader(resolve, timeout);
      else if (resolve) resolve();
    });

  hideLoader = (resolve, timeout = 0) =>
    setTimeout(() => {
      this.decreaseLoading();
      if (resolve) resolve();
    }, timeout);

  render() {
    const { loading } = this.state;
    const { children, blur } = this.props;
    return (
      <LoaderWrapper>
        <BlurryWrapper loading={loading && blur}>{children}</BlurryWrapper>
        {(loading && <LoaderIndicator fullScreen={false} />) || undefined}
        {(loading && <BlockingOverlay />) || undefined}
      </LoaderWrapper>
    );
  }
}

LoaderContainer.propTypes = {
  children: PropTypes.node,
  blur: PropTypes.bool,
};

LoaderContainer.defaultProps = {
  blur: false,
};

export default LoaderContainer;
