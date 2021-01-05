import React from 'react'
import styled from 'styled-components'
import Form from '~/Forms'
import TextInput from '~/Forms/TextInput'
import * as Yup from 'yup';
import Alert from '~/Alert'
import {POST} from '../lib/api'
import Link from '~/Link'

const ResetWrapper = styled.div`
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

const Reset = (props) => {
  const [alert, setAlert] = React.useState({
    title: '',
    message: ''
  })

  const submit = async (data) => {

    let allData = {
      token: props.token,
      password: data.password
    } 


    const resp = await POST('/.netlify/functions/reset-password', allData)
    setAlert(resp.data)
  }

  return (
    <ResetWrapper>
      {alert.title ? <Alert type={alert.title === 'Success' ? 'success' : 'error'} title={alert.title} message={alert.message} /> : null}
      <LinkWrapper><Link href="/login" render="Login" /><span>|</span><Link href="/signup" render="Signup" /></LinkWrapper>
      <h1>Change your password</h1>
      <Form 
          intialValues={{password: '', confirmPassword: ''}} 
          validation={{
            password: Yup.string().required('Please enter a new password'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
          }}
          submit={submit}
        >

          <TextInput
            id="password"
            type="password"
            label="New Password"
          />
          <TextInput
            id="confirmPassword"
            type="password"
            label="Confirm Password"
          />

        </Form>
    </ResetWrapper>
  )
}

Reset.getInitialProps = ({req, query}) => {
  return {token: query.token}
}

export default Reset