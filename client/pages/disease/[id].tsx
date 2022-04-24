import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import { TreatmentType } from '../../types';
import { Container, PageContainer, BodyContainer } from '../../styles/CommonStyles';
import { BottomHalf, Information, Subtitle, Title, LeftCol, TopRow } from '../../styles/DetailsStyles';
import Axios from 'axios';

export default function DiseaseDetails() {
  const router = useRouter();

  const { id } = router.query;

  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState(`Disease`);
  const [description, setDescription] = useState('No description provided');
  const [diseaseClass, setDiseaseClass] = useState('Disease Class');
  const [medications, setMedications] = useState<TreatmentType[]>([]);

  const submitSearch = () => {
    Axios.post("http://localhost:3001/api/getDiseaseInfo", {
      params: {
        diseaseId: id
      }}).then((response) => {
        setName(response.data[0].name)
        setDescription(response.data[0].description)
        setDiseaseClass(response.data[0].disease_class_name)
      })

    Axios.post("http://localhost:3001/api/getKnownTreatmentOptions", {
      params: {
        diseaseId: id
      }}).then((response) => {
        setMedications(response.data)
      })
  }

  useEffect(() => {
    const loadInfo = async () => {
      submitSearch();
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
              return <Result key={medication.medication_id}
                title={medication.name}
                link={`/treatment/${medication.medication_id}`}
              />
            })}
          </BodyContainer>
        )}
      </PageContainer>
    </Container>
  );
}
