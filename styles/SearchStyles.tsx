import React from 'react';
import styled from 'styled-components';
import Color from './colors';

export const SearchInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 102%;
`;

export const SearchHeader = styled.h1`
  color: ${Color.BLACK};
  font-size: 2rem;
`;

export const SearchResults = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  width: 100%;
`;