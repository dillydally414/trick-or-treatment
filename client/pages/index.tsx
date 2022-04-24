import React from 'react';
import styled from 'styled-components';
import logo from '../public/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Color from '../styles/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

const TopHalf = styled.div`
  align-items: center;
  background-color: ${Color.ORANGE};
  display: flex;
  height: 60%;
  justify-content: center;

  span {
    height: inherit !important;
  }
`;

const BottomHalf = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 40%;
  justify-content: center;
`;

const H3 = styled.h3`
  text-align: center;
`;

const P = styled.p`
  text-align: center;
`;

const Continue = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  height: fit-content;
  margin: auto 2.5% 2.5%;
  width: fit-content;
`;

const ContinueText = styled(P)`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

export default function Launch() {
  const router = useRouter();

  const onContinue: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    // TODO: Change this back once finished testing
    // router.push('/signup');
    router.push('/disease');
  }

  return (
    <Container>
      <TopHalf>
        <Image src={logo} layout='fill' objectFit='contain' />
      </TopHalf>
      <BottomHalf>
        <H3>Explore success rates of medications for various diseases</H3>
        <P>Share your story and hear about others&rsquo; experiences with medications</P>
        <Continue onClick={onContinue}>
          <ContinueText>Continue &gt;</ContinueText>
        </Continue>
      </BottomHalf>
    </Container>
  )
}
