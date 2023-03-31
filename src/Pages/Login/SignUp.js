import styled from "styled-components";
import React, { useState } from "react";
import BgImage from "../../Images/bg.jpg";

const Root = styled.div`
  background-image: url(${BgImage});
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% cover;
  color: #858585;
`;
const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.1);
  width: 60%;
  padding: 20px;
  border: 1px solid hsla(0, 0%, 44%, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width:calc(50% - 10px);
`;
const Input = styled.input`
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 10px;
`;
const Label = styled.label``;
const Button = styled.button`
  background-color: #01575c;
  border: none;
  color: #fff;
  padding: 10px 40px;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
`;
const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
  margin-bottom: 10px;
`;
const Link = styled.div`
  color: #01575c;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
`;
const TextWrapper = styled.div`
  display: flex;
  color: #fff;
  font-size: 12px;
`;
const FormWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const ButtonWrapper = styled.div`
display: flex;
justify-content: right;
`;
const SignUp = () => {
  const [userName, setUserName] = useState();
  const [Password, setPassword] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Root>
      <Form>
        <Heading>SignUp</Heading>
        <FormWrapper>
          <InputWrapper>
            <Label>First Name</Label>
            <Input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
            />
          </InputWrapper>
          <InputWrapper>
            <Label>LastName</Label>
            <Input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
            />
          </InputWrapper>
        </FormWrapper>
        <FormWrapper>
        <InputWrapper>
            <Label>Group</Label>
            <Input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Email</Label>
            <Input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="email"
            />
          </InputWrapper>
        </FormWrapper>
        <FormWrapper>
        <InputWrapper>
            <Label>Password</Label>
            <Input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Confirm Password</Label>
            <Input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
          </InputWrapper>
        </FormWrapper>
        <FormWrapper>
        <InputWrapper>
            <Label>Emp Id</Label>
            <Input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Position</Label>
            <Input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
            />
          </InputWrapper>
        </FormWrapper>
        <FormWrapper>
        <InputWrapper>
            <Label>Profile pic</Label>
            <Input
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="file"
            />
          </InputWrapper>
          <InputWrapper>
           
          </InputWrapper>
        </FormWrapper>
        <TextWrapper>
          you Have an Account? <Link>Login</Link>
        </TextWrapper>
        <ButtonWrapper>
        <Button onClick={onSubmit}>SignUp</Button>
        </ButtonWrapper>
      </Form>
    </Root>
  );
};

export default SignUp;
