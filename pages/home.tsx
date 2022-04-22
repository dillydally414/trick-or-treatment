import React from 'react';
import NavBar from '../components/NavBar';
import styled from 'styled-components';
import Color from '../styles/colors';
import Card from '../components/Card';
import { ArrowForwardSharp } from '@mui/icons-material';
import Disease from '../public/disease.svg';
import Treatment from '../public/treatment.svg';
import Add from '../public/add.svg';

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

const Container = styled.div`
  background-color: ${Color.ORANGE};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 5%;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100%;
  width: 30%;
`;

export default function Home() {
  return (
    <Container>
      <NavBar />
      <Body>
        <Main>
          <Card
            title='My Medical Information'
            body='Fill out a questionnaire to tell us about your medical needs and history.'
            icon={<ArrowForwardSharp />}
            link='/profile'
            primary
          />
        </Main>
        <Side>
          <Card
            title='Search Diseases'
            body='Search a disease to view potential treatments and medications.'
            icon={<Disease />}
            link='/disease'
          />
          <Card
            title='Search Medications'
            body='Search a medication to view associated diseases and side effects.'
            icon={<Treatment />}
            link='/treatment'
          />
          <Card
            title='Add Treatment'
            body='Share your experience with a medication with others.'
            icon={<Add />}
            link='/add'
          />
        </Side>
      </Body>
    </Container>
  );
}
