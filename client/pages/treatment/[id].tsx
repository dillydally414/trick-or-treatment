import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Result, { LearnMore } from '../../components/Result';
import { ArrowForwardSharp } from '@mui/icons-material';
import { BrandName, DiseaseType } from '../../types';
import { Container, PageContainer, BodyContainer } from '../../styles/CommonStyles';
import { TopRow, LeftCol, Title, Subtitle, Information, BottomHalf } from '../../styles/DetailsStyles';

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
  const [sideEffects, setSideEffects] = useState(['No known side effects']);
  const [method, setMethod] = useState('Method');
  const [brandNames, setBrandNames] = useState<BrandName[]>([{ name: "Aleve", id: 1, price: 10.00 }]);
  const [relevantDiseases, setRelevantDiseases] = useState<DiseaseType[]>([{ name: "Migraines", id: 1 }]);


  useEffect(() => {
    const loadInfo = async () => {
      // TODO: do database connection logic
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
                <Subtitle>{method}</Subtitle>
              </LeftCol>
              <Information>{sideEffects.join('\n')}</Information>
            </TopRow>
            <BottomHalf>
              <BrandNames>
                <Title>Brand Names</Title>
                {brandNames.map((brandName) => {
                  return <Result key={brandName.id}
                    title={brandName.name}
                    rightSide={<LearnMore>${brandName.price}</LearnMore>}
                  />
                })}
              </BrandNames>
              <RelevantDiseases>
                <Title>Relevant Diseases</Title>
                {relevantDiseases.map((disease) => {
                  return <Result key={disease.id}
                    title={disease.name}
                    link={`/disease/${disease.id}`}
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