import React from 'react';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
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

// TODO: add arrow icon in bottom right
const MedInfo = styled.div`
  height: 70%;
  width: 50%;
  background-color: ${Color.WHITE};
  margin-top: 4%;
  margin-left: 7.5%;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MyMedInfo = styled.h1`
  color: black;
  font-size: 32px;
`;

const MedInfoDescription = styled.p`
  color: black;
  font-size: 16px;
  justify-content: center;
  text-align: center;
`;

export default function Home() {
  return (
    <Container>
      <PageContainer>
        <NavBar />
        <MedInfo>
          <MyMedInfo>My Medical Information</MyMedInfo>
          <MedInfoDescription>Fill out a questionnaire to tell us about your medical needs and history</MedInfoDescription>
        </MedInfo>
      </PageContainer>
    </Container>
  );
}
