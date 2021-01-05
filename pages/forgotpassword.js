import React from 'react'
import styled from 'styled-components'
import Form from '~/Forms'
import TextInput from '~/Forms/TextInput'
import * as Yup from 'yup';
import Alert from '~/Alert'
import {POST} from '../lib/api'
import Link from '~/Link'

const ForgotWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding-top: 6rem;
  font-family: 'IBM Plex Sans', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
  
  button {
    width: 6rem;
    margin-top: 1rem;
    cursor: pointer;
  }

  input[type=text], input[type=email], input[type=password] {
    padding: 10px;
    border: 1px solid #ebedf0;
    color: #454f5b;
    border-radius: 2px;
  }

  input[type=date] {
    padding: 10px;
    border: 1px solid #ebedf0;
    color: #454f5b;
    border-radius: 2px;
  }

  textarea {
    padding: 10px;
    border: 1px solid #ebedf0;
    color: #454f5b;
    border-radius: 2px;
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

const Forgot = () => {
  const [alert, setAlert] = React.useState(false)

  const submit = async (data) => {

    await POST('/.netlify/functions/forgot-password', data)

    setAlert(true)
  }

  return (
    <ForgotWrapper>
      {alert ? <Alert type="success" message="Password reset instructions sent to your email" /> : null}
      <LinkWrapper><Link href="/login" render="Login" /><span>|</span><Link href="/signup" render="Signup" /></LinkWrapper>
      <h1>Forgot Password</h1>
     
      <Form 
          intialValues={{email: ''}} 
          validation={{
            email: Yup.string().required('Please enter your email')
          }}
          submit={submit}
        >

          <TextInput
            id="email"
            type="text"
            label="Enter your email"
          />


          </Form>
    </ForgotWrapper>
  )
}

export default Forgot