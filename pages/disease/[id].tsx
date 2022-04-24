import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Color from '../../styles/colors';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import { TreatmentType } from '../../types';

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

const BodyContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5% 10%;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const DiseaseTitle = styled.h1`
  color: ${Color.BLACK};
  font-size: 3rem;
`;

const DiseaseClass = styled.p`
  color: ${Color.DARK_GRAY};
  font-size: 1rem;
`;

const Description = styled.p`
  color: ${Color.BLACK};
  font-size: 1.25rem;
  text-align: right;
`;

export default function Disease() {
  const router = useRouter();

  const { id } = router.query;

  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState(`Disease`);
  const [description, setDescription] = useState('No description provided');
  const [diseaseClass, setDiseaseClass] = useState('Disease Class');
  const [medications, setMedications] = useState<TreatmentType[]>([{ name: "Aspirin", id: 1 }]);

  useEffect(() => {
    const loadInfo = async () => {
      // do database connection logic
      setLoaded(true);
    }
    if (typeof id === "string") {
      loadInfo();
    }
  }, [id])

  return (
    <Container>
      <PageContainer>
        <NavBar />
        {!loaded ? <h1>Loading...</h1> : (
          <BodyContainer>
            <TopRow>
              <LeftCol>
                <DiseaseTitle>{name}</DiseaseTitle>
                <DiseaseClass>{diseaseClass}</DiseaseClass>
              </LeftCol>
              <Description>{description}</Description>
            </TopRow>
            <DiseaseTitle>Treatment Options</DiseaseTitle>
            {medications.map((medication) => {
              return <Result key={medication.id}
                title={medication.name}
                link={`/treatment/${medication.id}`}
              />
            })}
          </BodyContainer>
        )}
      </PageContainer>
    </Container>
  );
}