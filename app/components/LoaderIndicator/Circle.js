import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const circleFadeDelay = keyframes`
  0%,
  39%,
  100% {
    opacity: 0;
  }
  
  40% {
    opacity: 1;
  }
`;

const Circle = props => {
  const CirclePrimitive = styled.div`
    width: 40px;
    height: 40px;
    position: absolute;
    ${props.rotate &&
      css`
        -webkit-transform: rotate(${props.rotate}deg);
        -ms-transform: rotate(${props.rotate}deg);
        transform: rotate(${props.rotate}deg);
      `}
    &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: #999;
      border-radius: 100%;
      animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
      ${props.delay &&
        css`
          -webkit-animation-delay: ${props.delay}s;
          animation-delay: ${props.delay}s;
        `};
    }
  `;
  return <CirclePrimitive />;
};

Circle.propTypes = {
  delay: PropTypes.number,
  rotate: PropTypes.number,
};

export default Circle;
