import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import { TreatmentType } from '../../types';
import { Container, PageContainer, BodyContainer } from '../../styles/CommonStyles';
import { BottomHalf, Information, Subtitle, Title, LeftCol, TopRow } from '../../styles/DetailsStyles';

export default function DiseaseDetails() {
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
                <Title>{name}</Title>
                <Subtitle>{diseaseClass}</Subtitle>
              </LeftCol>
              <Information>{description}</Information>
            </TopRow>
            <Title>Treatment Options</Title>
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