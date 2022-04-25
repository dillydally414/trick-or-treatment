import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Color from '../styles/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

const PageContainer = styled.div`
  height: 100%;
  background-color: ${Color.ORANGE};
`;

const SearchInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchHeader = styled.h1`
  color: black;
  font-size: 32px;
`;

export default function Profile() {
  return (
    <Container>
      <PageContainer>
        <NavBar />
        <p>Profile page</p>
      </PageContainer>
    </Container>
  );
}
