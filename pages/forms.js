import React from 'react'
import Layout from '../components/Layout'
import Form from '../components/Forms'
import TextInput from '../components/Forms/TextInput'
import Group from '../components/Forms/Group'
import Checkbox from '../components/Forms/Checkbox'
import FileUpload from '../components/Forms/FileUpload'
import GalleryUpload from '../components/Forms/GalleryUpload'
import ImageUpload from '../components/Forms/ImageUpload'
import Select from '../components/Forms/Select'
import Toggle from '../components/Forms/Toggle'
import * as Yup from 'yup';

const Forms = () => {
  const users = [
    {"name": "Yoon"},
    {"name": "John Doe"}
  ]

  const submit = async (data) => {
    console.log(data)
  }

  return (
    <Layout>
      <Form 
        intialValues={{email: '', firstName: '', users: [], power: true}} 
        validation={{
          email: Yup.string().email('Invalid email address').required('Email is required!'),
          firstName: Yup.string().required('Please enter your first name')
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
          id="firstName"
          type="text"
          label="First Name"
          placeholder="Enter Your First Name"
        />

        <Toggle id="power" label="Power" />

        <Select
          id="type"
          type="select"
          label="Type"
          options={[
            "devices",
            "plumbing",
            "accessories",
            "sensors",
            "software"
          ]}
        />

        <Group name="users" label="Users">
          {users.map((user,i) => {
            return <Checkbox key={i} name="users" value={user} label={user.name} />
          })}
        </Group>
        

        <FileUpload
          id="url"
          accept="application/pdf"
          label="PDF File Upload"
        />

        <GalleryUpload
          id="gallery"
          label="Gallery"
        />

        <ImageUpload
          id="imageUpload"
          label="Image Upload"
        />

      </Form>
    </Layout>
  )
}


export default Forms