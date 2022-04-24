import React from 'react';
import styled from 'styled-components';
import Color from './colors';
import Font from './fonts';

export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const Title = styled.h1`
  color: ${Color.BLACK};
  font-family: ${Font.MAIN};
  font-size: 3rem;
`;

export const Subtitle = styled.p`
  color: ${Color.DARK_GRAY};
  font-family: ${Font.SECONDARY};
  font-size: 1rem;
`;

export const Information = styled.p`
  color: ${Color.BLACK};
  font-family: ${Font.SECONDARY};
  font-size: 1.25rem;
  text-align: right;
`;

export const BottomHalf = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;