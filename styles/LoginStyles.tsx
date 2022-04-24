import React from 'react';
import styled from 'styled-components';
import Color from './colors';
import Font from './fonts';

export const LoginContainer = styled.div`
  height: 100%;
`;

export const ChooseLogin = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 7.5% 0 5%;
`;

const Login = styled.button`
  background-color: transparent;
  border-color: transparent;
  font-family: ${Font.MAIN};
  font-weight: 900;
  font-size: 2rem;
  margin: 0 5%;
`;

export const CurrentLogin = styled(Login)`
  text-decoration: underline ${Color.ORANGE};
`;

export const OtherLogin = styled(Login)`
  cursor: pointer;
  opacity: 0.5;
`;

export const Form = styled.form`
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: auto;
  width: 50%;
`

export const LabelInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1% 0;
`;

export const Label = styled.label`
  font-family: ${Font.SECONDARY};
  margin-left: 0.25rem;
  opacity: 0.5;
`;

export const RightLabel = styled(Label)`
  align-self: flex-end;
  cursor: pointer;
  margin-left: auto;
  margin-right: 0.25rem;
`;

export const Input = styled.input`
  background-color: ${Color.LIGHT_GRAY};
  border: 0.1rem solid ${Color.ORANGE};
  border-radius: 0.5rem;
  font-size: 1.5rem;
  padding: 2.5%;
`;

export const Submit = styled(Input)`
  background-color: ${Color.ORANGE};
  color: white;
  cursor: pointer;
  font-family: ${Font.MAIN};
`;