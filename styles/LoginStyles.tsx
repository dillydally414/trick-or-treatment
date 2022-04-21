import React from 'react';
import styled from 'styled-components';

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
  font-size: 2rem;
  margin: 0 5%;
`;

export const CurrentLogin = styled(Login)`
  font-weight: bold;
  text-decoration: underline #F6A325;
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
  background-color: #E5E5E5;
  border: 0.1rem solid #F6A325;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  padding: 2.5%;
`;

export const Submit = styled(Input)`
  background-color: #F6A325;
  color: white;
  cursor: pointer;
`;