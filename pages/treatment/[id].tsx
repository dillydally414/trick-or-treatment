import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Result, { LearnMore } from '../../components/Result';
import { ArrowForwardSharp } from '@mui/icons-material';
import { TradeName, DiseaseType } from '../../types';
import { Container, PageContainer, BodyContainer } from '../../styles/CommonStyles';
import { TopRow, LeftCol, Title, Subtitle, Information, SideEffects, BottomHalf } from '../../styles/DetailsStyles';
import Axios from 'axios';
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';

const RightCol = styled.div`
  dispaly: flex;
  flex-direction: column;
`

const BrandNames = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const RelevantDiseases = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 50%;
`;

type TreatmentDetailsProps = {
  name: string,
  sideEffects: { name: string }[],
  method: string,
  brandNames: TradeName[],
  relevantDiseases: DiseaseType[]
}

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<TreatmentDetailsProps>> {
  const id = params?.id;
  let name = "Treatment"
  let sideEffects = [{ name: 'No known side effects' }]
  let method = "Method"
  let brandNames: TradeName[] = []
  let relevantDiseases: DiseaseType[] = []

  if (id) {
    await fetch(`${process.env.VERCEL_URL}/api/treatment/info?medicationId=${id}`).then(async (response) => {
      const medication = (await response.json())[0][0]
      name = medication.name
      name = name.charAt(0).toUpperCase() + name.slice(1)

      method = medication.method
      method = method.charAt(0).toUpperCase() + method.slice(1)
    })

    await fetch(`${process.env.VERCEL_URL}/api/treatment/side-effects?medicationId=${id}`).then(async (response) => {
      sideEffects = (await response.json())[0]
    })

    await fetch(`${process.env.VERCEL_URL}/api/treatment/brand-names?medicationId=${id}`).then(async (response) => {
      brandNames = (await response.json())[0]
    })

    await fetch(`${process.env.VERCEL_URL}/api/treatment/relevant-diseases?medicationId=${id}`).then(async (response) => {
      relevantDiseases = (await response.json())[0]
    })
  }

  return {
    props: {
      name: name,
      sideEffects: sideEffects,
      method: method,
      brandNames: brandNames,
      relevantDiseases: relevantDiseases
    }
  }
}

export default function TreatmentDetails({ name, sideEffects, method, brandNames, relevantDiseases }: TreatmentDetailsProps) {

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <BodyContainer>
          <TopRow>
            <LeftCol>
              <Title>{name}</Title>
              <Subtitle>Method of Ingestion: {method}</Subtitle>
            </LeftCol>
            <RightCol>
              <Subtitle>
                Side Effects:
              </Subtitle>
              {sideEffects.map((sideEffect) => {
                return (
                  <SideEffects key={sideEffect.name}>
                    {sideEffect.name.charAt(0).toUpperCase() + sideEffect.name.slice(1)}
                  </SideEffects>
                )
              })}
            </RightCol>
          </TopRow>
          <BottomHalf>
            <BrandNames>
              <Title>Brand Names</Title>
              {brandNames.map((brandName) => {
                return <Result
                  key={`brand_${brandName.trade_name_id}`}
                  title={brandName.name.charAt(0).toUpperCase() + brandName.name.slice(1)}
                  rightSide={<LearnMore>${brandName.price}</LearnMore>}
                />
              })}
            </BrandNames>
            <RelevantDiseases>
              <Title>Relevant Diseases</Title>
              {relevantDiseases.map((disease) => {
                return <Result
                  key={`disease_${disease.disease_id}`}
                  title={disease.name.charAt(0).toUpperCase() + disease.name.slice(1)}
                  link={`/disease/${disease.disease_id}`}
                  rightSide={<ArrowForwardSharp style={{ margin: 0 }} />}
                />
              })}
            </RelevantDiseases>
          </BottomHalf>
        </BodyContainer>
      </PageContainer>
    </Container>
  );
}
