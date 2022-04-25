import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Color from '../styles/colors';
import { ArrowForwardSharp } from '@mui/icons-material';
import Font from '../styles/fonts';

const ResultContainer = styled.div`
  align-items: center;
  background-color: white;
  border: 0.1rem solid ${Color.BLACK};
  border-radius: 0.5rem;
  cursor: ${props => props.title ? 'pointer' : 'default'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;
  width: 100%;
`;

const Title = styled.h1`
  color: ${Color.BLACK};
  font-family: ${Font.MAIN};
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const RightSide = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const LearnMore = styled.p`
  color: ${Color.DARK_GRAY};
  font-family: ${Font.SECONDARY};
  font-size: 0.75rem;
  margin: 0;
  text-align: right;
`;

export default function Result(props: { title: string, rightSide?: ReactElement, link?: string }) {
  const router = useRouter();

  return (
    <ResultContainer
      onClick={() => { props.link && router.push(props.link) }}
      title={props.link ? 'link' : undefined}
    >
      <Title>{props.title}</Title>
      {props.rightSide ? props.rightSide : (
        <RightSide>
          <LearnMore>Learn more</LearnMore>
          <ArrowForwardSharp style={{ color: Color.DARK_GRAY }} />
        </RightSide>
      )}
    </ResultContainer>
  )
}