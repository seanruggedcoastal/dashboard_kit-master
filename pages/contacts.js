import React from 'react'
import Layout from '../components/Layout'
import ListContacts from '../components/Contacts'

const contacts = [
  {
    id: 1,
    name: 'Dillon Raphael',
    image: 'https://pbs.twimg.com/profile_images/1041120784041664512/JBD9Peqg_400x400.jpg',
    company: 'ACNE.',
    phone: '123-456-7890',
    email: 'johndoe@gmail.com',
    notes: 'blah blah blah'
  },
  {
    id: 2,
    name: 'Kevin Yoon',
    image: 'https://pbs.twimg.com/profile_images/1008763007743209479/rU5GeG_e_400x400.jpg',
    company: 'ACNE.',
    phone: '123-456-7890',
    email: 'yookinyoon@gmail.com',
    notes: 'blah blah blah'
  }
]



const Contacts = () => {
  return (
    <Layout>
      <ListContacts contacts={contacts}/>
    </Layout>
  )
}

export default Contacts