import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLoading } from '../context/LoadingContext';
// SVG에 대한 스타일을 정의
const pawAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const Paw = styled.svg`
  width: 1em;
  height: 1em;
  fill: currentColor;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: rotate(90deg) translate(-50%, 0%);
  font-size: 100px;
  width: 1em;
  height: 3em;
  color: #ed6436;
  z-index: 99999;

  .paw {
    width: 1em;
    height: 1em;
    animation: ${pawAnimation} 2050ms ease-in-out infinite;
    opacity: 0;

    &:nth-child(odd) {
      transform: rotate(-10deg);
    }

    &:nth-child(even) {
      transform: rotate(10deg) translate(125%, 0);
    }

    &:nth-child(1) {
      animation-delay: 1s;
    }
    &:nth-child(2) {
      animation-delay: 0.75s;
    }
    &:nth-child(3) {
      animation-delay: 0.5s;
    }
    &:nth-child(4) {
      animation-delay: 0.25s;
    }
    &:nth-child(5) {
      animation-delay: 0s;
    }
    &:nth-child(6) {
      animation-delay: -0.25s;
    }
  }
`;

const Loader = () => {
    const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }
  
    return (
      <LoaderContainer className="ajax-loader">
        {[...Array(6)].map((_, i) => (
          <Paw key={i} className="paw">
            <use xlinkHref="#paw" />
          </Paw>
        ))}
      </LoaderContainer>
    );
  };

export default Loader;