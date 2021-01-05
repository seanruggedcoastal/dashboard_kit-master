import React from 'react'
import styled from 'styled-components'
import {useAuth} from '../components/Shared/AuthContext'
import Form from '../components/Forms'
import TextInput from '../components/Forms/TextInput'
import * as Yup from 'yup';
import Link from '../components/Link'
import Alert from '~/Alert'

const LoginWrapper = styled.div`
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

const Login = (props) => {
  const authState = useAuth()



  const submit = async (data) => {
    authState.login(data)
  }

  
  return (
    <LoginWrapper>
      {authState.error.title ? <Alert type={alert.title === 'Success' ? 'success' : 'error'} title={authState.error.title} message={authState.error.message} /> : null}
      <LinkWrapper><Link href="/login" render="Login" /><span>|</span><Link href="/signup" render="Signup" /></LinkWrapper>
      <Form 
        intialValues={{username: '', password: ''}} 
        validation={{
          username: Yup.string().required('Please enter your first name')
        }}
        submit={submit}
      >
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
      <Link href="/forgotpassword" render="Forgot Password?" />
    </LoginWrapper>
  )
}

export default Login