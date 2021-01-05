import React from 'react'
import {useAuth} from '../components/Shared/AuthContext'
import Form from '../components/Forms'
import TextInput from '../components/Forms/TextInput'
import * as Yup from 'yup';
import styled from 'styled-components'
import Link from '../components/Link'

const SignupWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding-top: 6rem;

  button {
    width: 6rem;
    margin-top: 1rem;
  }
`

const LinkWrapper = styled.div`
  display: flex;

  a {
    margin-right: 1rem;
  }

  span {
    margin-right: 1rem;
  }
`

const Signup = (props) => {
  const authState = useAuth()



  const submit = async (data) => {
    authState.signup(data)
  }

  
  return (
    <SignupWrapper>
      <LinkWrapper><Link href="/login" render="Login" /><span>|</span><Link href="/signup" render="Signup" /></LinkWrapper>
      <Form 
        intialValues={{email: '', username: '', password: ''}} 
        validation={{
          email: Yup.string().email('Invalid email address').required('Email is required!'),
          username: Yup.string().required('Please enter your first name')
        }}
        submit={submit}
      >
        <TextInput
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />

        <TextInput
          id="username"
          type="text"
          label="User Name"
          placeholder="Enter username"
        />

        <TextInput
          id="password"
          type="password"
          label="Password"
          placeholder="Enter Password"
        />


      </Form>
    </SignupWrapper>
  )
}

export default Signup