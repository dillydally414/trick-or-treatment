import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const CardContainer = styled.div`
  align-items: ${props => props.title ? 'center' : 'flex-start'};
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-items: center;
  margin: 1rem;
`;

const TextContainer = styled.div`
  align-items: ${props => props.title ? 'center' : 'flex-start'};
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 0 2%;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: auto;
  padding: 2.5%;
  width: 100%;
`;

const Title = styled.h1`
  color: black;
  font-size: ${props => props.title ? '2rem' : '1rem'};
  margin: 2% 0;
`;

const Description = styled.p`
  color: black;
  font-size: ${props => props.title ? '1rem' : '0.75rem'};
  justify-content: center;
  margin: 0;
  text-align: ${props => props.title ? 'center' : 'left'};
`;

export default function Card(props: { title: string, body: string, icon: ReactElement, link: string, primary?: boolean }) {
  const router = useRouter();

  return (
    <CardContainer onClick={() => router.push(props.link)} title={props.primary ? 'primary' : undefined}>
      <TextContainer title={props.primary ? 'primary' : undefined}>
        <Title title={props.primary ? 'primary' : undefined}>{props.title}</Title>
        <Description title={props.primary ? 'primary' : undefined}>{props.body}</Description>
      </TextContainer>
      <IconContainer>{props.icon}</IconContainer>
    </CardContainer>
  )
}