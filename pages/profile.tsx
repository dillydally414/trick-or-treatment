import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Color from '../styles/colors';
import { BodyContainer, Container, PageContainer } from '../styles/CommonStyles';
import { Subtitle } from '../styles/DetailsStyles';
import { SearchHeader } from '../styles/SearchStyles';

export default function Profile() {
  return (
    <Container>
      <PageContainer>
        <NavBar />
        <BodyContainer>
          <SearchHeader>My Information</SearchHeader>
          <Subtitle>
            This page is not currently implemented in our prototype.
          </Subtitle>
          <Subtitle>
            Though many interesting behaviors rely on the presence of users, for the prototype we wanted to prioritize the other functionalities present.
          </Subtitle>
          <Subtitle>
            You can see these other functionalities by clicking on the different icons in the nav bar.
          </Subtitle>
          <Subtitle>
            Additionally, the queries involving user-specific data are present in our report.
          </Subtitle>
        </BodyContainer>
      </PageContainer>
    </Container>
  );
}
