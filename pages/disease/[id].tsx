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
      }
    }).then((response) => {
      let initialName = response.data[0].name
      initialName = initialName.charAt(0).toUpperCase() + initialName.slice(1)
      setName(initialName)

      let initialDescription = response.data[0].description
      initialDescription ? initialDescription = initialDescription.charAt(0).toUpperCase() + initialDescription.slice(1) : initialDescription = 'No description provided';
      setDescription(initialDescription)

      let initialDiseaseClass = response.data[0].disease_class_name
      initialDiseaseClass = initialDiseaseClass.charAt(0).toUpperCase() + initialDiseaseClass.slice(1)
      setDiseaseClass(initialDiseaseClass)
    })

    Axios.post("http://localhost:3001/api/getKnownTreatmentOptions", {
      params: {
        diseaseId: id
      }
    }).then((response) => {
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
        )}
      </PageContainer>
    </Container>
  );
}
