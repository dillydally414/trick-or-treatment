import { Autocomplete, IconContainerProps, Rating, TextField } from '@mui/material';
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import { urlPrefix } from '../server/database';
import { BodyContainer, Container, PageContainer } from '../styles/CommonStyles';
import { DiseaseType, SideEffectType, TreatmentType } from '../types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAltOutlined,
  SentimentVerySatisfied,
} from '@mui/icons-material';
import Color from '../styles/colors';
import { useRouter } from 'next/router';

const SearchHeader = styled.h1`
  color: black;
  font-size: 32px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 2rem 0;
  width: 100%;
`;

const RatingContainer = styled.div`
  align-items: center;
  background-color: ${Color.LIGHT_GRAY};
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 30%;

  label {
    color: ${Color.BLACK} !important;
  }
`;

export const customIcons: {
  [index: number]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfied fontSize='inherit' />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfied fontSize='inherit' />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfied fontSize='inherit' />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltOutlined fontSize='inherit' />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfied fontSize='inherit' />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

type AddTreatmentProps = {
  diseases: DiseaseType[],
  treatments: TreatmentType[],
  sideEffects: SideEffectType[]
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AddTreatmentProps>> {
  const diseases = await fetch(`${urlPrefix}/api/disease/search?searchField=%`).then(async (res) => {
    if (res.status !== 200) {
      console.error(res);
    } else {
      return (await res.json())[0];
    }
  }).catch(err => console.error(err));

  console.log(diseases);

  const treatments = await fetch(`${urlPrefix}/api/treatment/search?searchField=%`).then(async (res) => {
    if (res.status !== 200) {
      console.error(res);
    } else {
      return (await res.json())[0];
    }
  }).catch(err => console.error(err));

  console.log(treatments);


  const sideEffects = await fetch(`${urlPrefix}/api/side-effect/search?searchField=%`).then(async (res) => {
    if (res.status !== 200) {
      console.error(res);
    } else {
      return (await res.json())[0];
    }
  }).catch(err => console.error(err));

  console.log(sideEffects);

  return {
    props: {
      diseases: diseases || [],
      treatments: treatments || [],
      sideEffects: sideEffects || []
    }
  }
}

export default function Add(props: AddTreatmentProps) {
  const router = useRouter();

  const [disease, setDisease] = useState<DiseaseType | null>(null);
  const [treatment, setTreatment] = useState<TreatmentType | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [sideEffects, setSideEffects] = useState<SideEffectType[]>([]);

  const isComplete = disease && treatment && startDate

  const addSideEffects = async (): Promise<boolean> => {
    if (!isComplete) return false;
    let success = true;
    for (const sideEffect of sideEffects) {
      const body = {
        did: disease.disease_id,
        mid: treatment.medication_id,
        uid: 1,
        seid: sideEffect.side_effect_id
      }
      success = success && await fetch(`/api/side-effect/add`, {
        method: "POST",
        body: JSON.stringify(body)
      }).then((response) => {
        return response.status === 200;
      });
    }
    return success;
  }

  const addTreatment = async () => {
    if (!isComplete) return;
    let success = await addSideEffects();
    const body = {
      did: disease.disease_id,
      mid: treatment.medication_id,
      uid: 1,
      rating: rating,
      start_date: startDate,
      end_date: endDate,
    }
    success = success && await fetch(`/api/treatment/add`, {
      method: "POST",
      body: JSON.stringify(body)
    }).then((response) => {
      return response.status === 200;
    });
    if (success) {
      alert('Added treatment experience successfully. Thank you for sharing!');
      router.push('/home');
    } else {
      alert('An error occurred, please try again.');
    }
  }

  return (
    <Container>
      <PageContainer>
        <NavBar />
        <BodyContainer>
          <SearchHeader>Add Treatment Experience</SearchHeader>
          <Row>
            <Autocomplete
              value={disease}
              onChange={(evt, newDisease) => setDisease(newDisease)}
              getOptionLabel={option => option.name}
              renderInput={(params) => <TextField {...params} label="Disease" />}
              options={props.diseases}
              sx={{ width: "30%", backgroundColor: Color.LIGHT_GRAY, borderRadius: '4px' }}
            />
            <Autocomplete
              value={treatment}
              onChange={(evt, newTreatment) => setTreatment(newTreatment)}
              getOptionLabel={option => option.name}
              renderInput={(params) => <TextField {...params} label="Treatment" />}
              options={props.treatments}
              sx={{ width: "30%", backgroundColor: Color.LIGHT_GRAY, borderRadius: '4px' }}
            />
          </Row>
          <Row>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(startDate) => {
                  setStartDate(startDate);
                }}
                renderInput={(params) => <TextField {...params} style={{ width: "30%", backgroundColor: Color.LIGHT_GRAY, borderRadius: '4px' }} />}
              />
              <DatePicker
                label="End Date (leave blank if current)"
                value={endDate}
                onChange={(endDate) => {
                  setEndDate(endDate);
                }}
                renderInput={(params) => <TextField {...params} style={{ width: "30%", backgroundColor: Color.LIGHT_GRAY, borderRadius: '4px' }} />}
              />
            </LocalizationProvider>
          </Row>
          <Row>
            <RatingContainer>
              <Rating
                value={rating}
                onChange={(evt, newRating) => setRating(newRating)}
                size="large"
                IconContainerComponent={IconContainer}
                highlightSelectedOnly
              />
            </RatingContainer>
            <Autocomplete
              multiple
              value={sideEffects}
              getOptionLabel={option => option.name}
              onChange={(evt, newSideEffects) => setSideEffects(newSideEffects)}
              renderInput={(params) => <TextField {...params} label="Side Effects" />}
              options={props.sideEffects}
              sx={{ width: "30%", backgroundColor: Color.LIGHT_GRAY, borderRadius: '4px' }}
            />
          </Row>
          <Row>
            {isComplete ?
              <button onClick={() => addTreatment()}>
                Submit
              </button>
              : null
            }
          </Row>
        </BodyContainer>
      </PageContainer>
    </Container>
  );
}
