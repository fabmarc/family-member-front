import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  ${props =>
    props.fullScreen
      ? css`
          height: 100vh;
          position: relative;
        `
      : css`
          position: sticky;
          bottom: 50vh;
        `}
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

Wrapper.defaultProps = {
  fullScreen: true,
};

export default Wrapper;
