import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Color from '../styles/colors';
import { ArrowForwardSharp } from '@mui/icons-material';

const ResultContainer = styled.div`
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-color: ${Color.BLACK};
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
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const RightSide = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const LearnMore = styled.p`
  color: ${Color.DARK_GRAY};
  font-size: 0.75rem;
  margin: 0;
  text-align: right;
`;

export default function Result(props: { title: string, rightSide?: ReactElement, link?: string }) {
  const router = useRouter();

  return (
    <ResultContainer onClick={() => { props.link && router.push(props.link) }} title={props.link ? 'link' : undefined}>
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