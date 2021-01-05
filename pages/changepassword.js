import React from 'react'
import Layout from '~/Layout'
import Form from '~/Forms'
import TextInput from '~/Forms/TextInput'
import * as Yup from 'yup';
import {CardWrapper, CardContent, CardHeader} from '~/Card'
import styled from 'styled-components'
import {POST} from '../lib/api'
import {useAuth} from '~/Shared/AuthContext'
import Alert from '~/Alert'


const SettingsWrapper = styled.div`

button {
  margin-top: 1rem;
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

const Settings = () => {
  const [alert, setAlert] = React.useState(false)
  const authState = useAuth()


  const submit = async (data) => {

    const allData = {
      user: authState.user,
      oldPassword: data.oldPassword,
      password: data.password
    }

    await POST('/.netlify/functions/change-password', allData, authState.token)
    setAlert(true)
  }

  return (
    <Layout>
      {alert ? <Alert type="success" message="Password Updated" /> : null}
      <SettingsWrapper>
      <CardWrapper>
        <CardHeader>
          <h1>Change Password</h1>
        </CardHeader>

        <CardContent>
          <Form 
          intialValues={{oldPassword: '', password: '', confirmPassword: ''}} 
          validation={{
            oldPassword: Yup.string().required('Please enter your current password'),
            password: Yup.string().required('Please enter a new password'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
          }}
          submit={submit}
        >

          <TextInput
            id="oldPassword"
            type="password"
            label="Current Password"
          />
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
        </CardContent>

      </CardWrapper>
      </SettingsWrapper>
    </Layout>
  )
}

export default Settings