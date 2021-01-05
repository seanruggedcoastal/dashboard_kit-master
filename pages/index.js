import React from 'react'
import Layout from '~/Layout'
import Alert from '~/Alert'
import Badge from '~/Badge'
import Rating from '~/Rating'
import Timeline from '~/Timeline'
import Table from '~/Table'
import Button from '~/Button'
import Modal from '~/Modal'

import {Pencil, Dots, ThumbsUp, BadgeIcon} from '~/Icons'


import Dropdown from '~/Dropdown'
import {CardWrapper, CardHeader, CardFooter, CardContent, CardImage} from '~/Card'

const Index = () => {
  return (
    <Layout>
      <Alert type="success" title="Success" message="Your action successfuly worked!"/>
      <Alert type="error" title="Error" message="Your action failed. Please try again"/>
      <Alert type="warning" title="Warning" message="We are going down for maintenance"/>
      <Alert type="info" title="Info" message="Did you know, you can connnect"/>

      <Modal button={(showModal) => <Button onClick={showModal} type={'primary'}>Open Modal</Button>}>
        <p>Test Modal</p>
      </Modal>


    <CardWrapper>
      <CardHeader>
        <h3>This is a card</h3>
        <Button>
          <Dropdown links={[{label: 'Settings', url: '/'}]}><Dots /></Dropdown>
        </Button>
      </CardHeader>
      <CardContent>
        <p>John Doe・<span>Mar 19(14 hours ago)</span></p>
        <p>#node #react #devops #docker</p>
        <CardImage src={'https://images.pexels.com/photos/2214386/pexels-photo-2214386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} />
      </CardContent>
      <CardFooter>
        <div>
          <Button><ThumbsUp /></Button>
        </div>
        <div>
          <Button><BadgeIcon/></Button>
        </div>
      </CardFooter>
    </CardWrapper>      

      <Badge style={{marginTop: '18px'}}/>
      <Rating amount={5}/>
      
      <Timeline events={
        ['Event1', 'Event2', 'Event3']
      }/>
      

      <Table data={[
        { 
          Company: 'Sed Corporation',
          Code: '985435FA-9D02-09A1-78F5-87CF444F8390',
          Cost: 453.64,
          Date: '2013-06-16'
        },
        { 
          Company: 'CND INC.',
          Code: '985435FA-9D02-09A1-78F5-87CF444F8390',
          Cost: 453.64,
          Date: '2013-06-16'
        }
      ]}/>

      <Button disabled>Disabled</Button>
      <Button type={'primary'}>Primary</Button>
      <Button type={'danger'}>Danger</Button>
      <Button type={'default'}>Default</Button>
      <Button type={'primary'} round><Pencil /></Button>
      <Button icon={'https://cdn3.iconfinder.com/data/icons/eightyshades/512/11_Search-512.png'} />
    </Layout>
  )
}

export default Index