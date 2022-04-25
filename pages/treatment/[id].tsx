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

export default function TreatmentDetails() {
  const router = useRouter();

  const { id } = router.query;

  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState(`Treatment`);
  const [sideEffects, setSideEffects] = useState([{ name: 'No known side effects' }]);
  const [method, setMethod] = useState('Method');
  const [brandNames, setBrandNames] = useState<TradeName[]>([]);
  const [relevantDiseases, setRelevantDiseases] = useState<DiseaseType[]>([]);

  const submitSearch = async () => {
    await Axios.post(`/api/treatment/info`, {
      params: {
        medicationId: id
      }
    }).then((response) => {
      const medication = response.data[0][0]
      let initialName = medication.name
      initialName = initialName.charAt(0).toUpperCase() + initialName.slice(1)
      setName(initialName)

      let initialMethod = medication.method
      initialMethod = initialMethod.charAt(0).toUpperCase() + initialMethod.slice(1)
      setMethod(initialMethod)
    })

    await Axios.post(`/api/treatment/side-effects`, {
      params: {
        medicationId: id
      }
    }).then((response) => {
      setSideEffects(response.data[0])
    })

    await Axios.post(`/api/treatment/brand-names`, {
      params: {
        medicationId: id
      }
    }).then((response) => {
      console.log(response);
      setBrandNames(response.data[0])
    })

    await Axios.post(`/api/treatment/relevant-diseases`, {
      params: {
        medicationId: id
      }
    }).then((response) => {
      setRelevantDiseases(response.data[0])
    })
  }

  useEffect(() => {
    const loadInfo = async () => {
      await submitSearch();
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
                <Subtitle>Method of Ingestion: {method}</Subtitle>
              </LeftCol>
              <Subtitle>
                Side Effects:
                {sideEffects.map((sideEffect) => {
                  return (
                    <SideEffects key={sideEffect.name}>
                      {sideEffect.name.charAt(0).toUpperCase() + sideEffect.name.slice(1)}
                    </SideEffects>
                  )
                })}
              </Subtitle>
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
        )}
      </PageContainer>
    </Container>
  );
}
