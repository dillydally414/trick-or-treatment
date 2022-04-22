import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Color from '../../styles/colors';
import NavBar from '../../components/NavBar';

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

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5% 15%;
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Disease() {
  const router = useRouter();

  const { id } = router.query;

  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState(`Disease`);
  const [description, setDescription] = useState('No description provided');
  const [diseaseClass, setDiseaseClass] = useState('Disease Class');
  const [medications, setMedications] = useState<ReactElement[]>([<p key="1">medication 1</p>]);

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
          <>
            <TopRow>
              <LeftCol>
                <h1>{name}</h1>
                <p>{diseaseClass}</p>
              </LeftCol>
              <p>{description}</p>
            </TopRow>
            <h2>Treatment Options</h2>
            {medications}
          </>
        )}
      </PageContainer>
    </Container>
  );
}