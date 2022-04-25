import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  LoginContainer, ChooseLogin, OtherLogin, CurrentLogin, Form, LabelInputDiv, Label, RightLabel, Input, Submit
} from '../styles/LoginStyles';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible1, setVisible1] = useState(false);
  const [confirmPW, setConfirmPW] = useState('');
  const [visible2, setVisible2] = useState(false);

  const handleSubmit = () => {
    if (!email || !password || !confirmPW) {
      alert("All fields must be filled in");
    } else if (password !== confirmPW) {
      alert("Passwords must match");
    } else {
      // TODO: handle sign up logic (make sure email is not already in database)
      router.push('/home');
    }
  }

  return (
    <LoginContainer>
      <ChooseLogin>
        <OtherLogin onClick={() => router.push('/signin')}>
          Sign In
        </OtherLogin>
        <CurrentLogin>
          Sign Up
        </CurrentLogin>
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
          <Input type={visible1 ? "text" : "password"} value={password} onChange={(evt) => setPassword(evt.target.value)} />
          <RightLabel onClick={() => setVisible1(!visible1)}>{visible1 ? "Hide" : "Show"}</RightLabel>
        </LabelInputDiv>
        <LabelInputDiv>
          <Label>CONFIRM PASSWORD</Label>
          <Input type={visible2 ? "text" : "password"} value={confirmPW} onChange={(evt) => setConfirmPW(evt.target.value)} />
          <RightLabel onClick={() => setVisible2(!visible2)}>{visible2 ? "Hide" : "Show"}</RightLabel>
        </LabelInputDiv>
        <LabelInputDiv>
          <Label>&nbsp;</Label>
          <Submit type="submit" value="Sign up" />
        </LabelInputDiv>
      </Form>
    </LoginContainer>
  )
}
