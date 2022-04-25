import React from 'react';
import styled from 'styled-components';
import Color from './colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 120%;
  padding: 0;
`;

export const PageContainer = styled.div`
  height: 100%;
  background-color: ${Color.ORANGE};
`;

export const BodyContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5% 10%;
`;