import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  LoginContainer, ChooseLogin, OtherLogin, CurrentLogin, Form, LabelInputDiv, Label, RightLabel, Input, Submit
} from '../styles/LoginStyles';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      alert("All fields must be filled in");
    } else {
      // TODO: handle sign in logic (make sure email and password are accurate)
      router.push('/home');
    }
  }

  return (
    <LoginContainer>
      <ChooseLogin>
        <CurrentLogin>
          Sign In
        </CurrentLogin>
        <OtherLogin onClick={() => router.push('/signup')}>
          Sign Up
        </OtherLogin>
      </ChooseLogin>
      <Form onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit();
      }}>
        <LabelInputDiv>
          <Label>EMAIL</Label>
          <Input type="text" value={email} onChange={(evt) => setEmail(evt.target.value)} />
          <RightLabel>&nbsp;</RightLabel>
        </LabelInputDiv>
        <LabelInputDiv>
          <Label>PASSWORD</Label>
          <Input type={visible ? "text" : "password"} value={password} onChange={(evt) => setPassword(evt.target.value)} />
          <RightLabel onClick={() => setVisible(!visible)}>{visible ? "Hide" : "Show"}</RightLabel>
        </LabelInputDiv>
        <LabelInputDiv>
          <Label>&nbsp;</Label>
          <Submit type="submit" value="Sign in" />
        </LabelInputDiv>
      </Form>
    </LoginContainer>
  )
}