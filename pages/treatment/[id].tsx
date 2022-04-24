import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Color from '../../styles/colors';
import NavBar from '../../components/NavBar';
import Result from '../../components/Result';
import { ArrowForwardSharp } from '@mui/icons-material';
import { BrandName, DiseaseType } from '../../types';

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

const BottomHalf = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

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

export default function Treatment() {
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
                <DiseaseClass>{method}</DiseaseClass>
              </LeftCol>
              <Description>{sideEffects.join('\n')}</Description>
            </TopRow>
            <BottomHalf>
              <BrandNames>
                <DiseaseTitle>Brand Names</DiseaseTitle>
                {brandNames.map((brandName) => {
                  return <Result key={brandName.id}
                    title={brandName.name}
                    rightSide={<p style={{ margin: 0 }}>${brandName.price}</p>}
                  />
                })}
              </BrandNames>
              <RelevantDiseases>
                <DiseaseTitle>Relevant Diseases</DiseaseTitle>
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