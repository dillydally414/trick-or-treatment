import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import logo from '../public/logo.png';
import Image from 'next/image';
import Disease from '../public/disease.svg';
import Treatment from '../public/treatment.svg';
import Add from '../public/add.svg';
import Profile from '../public/profile.svg';
import Color from '../styles/colors';

const Container = styled.div`
  align-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  height: 10%;
  justify-content: space-between;
`

const Left = styled.div`
  align-items: center;
  background-color: ${Color.ORANGE};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 15%;

  span {
    height: 7.5% !important;
    width: 15% !important;
    top: auto !important;
    bottom: auto !important;
    right: auto !important;
    left: auto !important;
  }
`;

const Right = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: space-evenly;
`;

export default function NavBar() {
  const router = useRouter();

  return (
    <Container>
      <Left onClick={() => router.push('/home')}>
        <Image src={logo} layout='fill' objectFit='contain' />
      </Left>
      <Right>
        <Disease onClick={() => router.push('/disease')} cursor='pointer' />
        <Treatment onClick={() => router.push('/treatment')} cursor='pointer' />
        <Add onClick={() => router.push('/add')} cursor='pointer' />
        <Profile onClick={() => router.push('/profile')} cursor='pointer' />
      </Right>
    </Container>
  )
}
