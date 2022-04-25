import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import { DiseaseType, TreatmentType } from '../../types';
import { Container, PageContainer, BodyContainer } from '../../styles/CommonStyles';
import { BottomHalf, Information, Subtitle, Title, LeftCol, TopRow } from '../../styles/DetailsStyles';
import Axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

type DiseaseDetailsProps = {
  name: string,
  description: string,
  diseaseClass: string,
  medications: TreatmentType[]
}

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<DiseaseDetailsProps>> {
  const id = params?.id;
  let name = "Disease"
  let description = "No description provided"
  let diseaseClass = "Disease class"
  let medications: TreatmentType[] = []

  if (id) {
    console.log(process.env.VERCEL_URL)
    await fetch(`http${process.env.NODE_ENV === "development" ? '' : 's'}://${process.env.VERCEL_URL}/api/disease/info?diseaseId=${id}`).then(async (response) => {
      const disease: DiseaseType = (await response.json())[0][0]
      name = disease.name
      name = name.charAt(0).toUpperCase() + name.slice(1)
      if (disease.description) {
        description = disease.description
        description = description.charAt(0).toUpperCase() + description.slice(1)
      }
      diseaseClass = disease.disease_class_name
      diseaseClass = diseaseClass.charAt(0).toUpperCase() + diseaseClass.slice(1)
    });

    await fetch(`${process.env.VERCEL_URL}/api/disease/treatment-options?diseaseId=${id}`).then(async (response) => {
      medications = (await response.json())[0]
    })
  }

  return {
    props: {
      name: name,
      description: description,
      diseaseClass: diseaseClass,
      medications: medications
    }
  }
}

export default function DiseaseDetails({ name, description, diseaseClass, medications }: DiseaseDetailsProps) {

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <BodyContainer>
          <TopRow>
            <LeftCol>
              <Title>{name}</Title>
              <Subtitle>Disease Class: {diseaseClass}</Subtitle>
            </LeftCol>
            <Information>{description}</Information>
          </TopRow>
          <Title>Treatment Options</Title>
          {medications.map((medication) => {
            return <Result
              key={medication.medication_id}
              title={medication.name.charAt(0).toUpperCase() + medication.name.slice(1)}
              link={`/treatment/${medication.medication_id}`}
            />
          })}
        </BodyContainer>
      </PageContainer>
    </Container>
  );
}
