import React from 'react'
import Layout from '../components/Layout'
import CalendarIndex from '../components/Calendar'


// const events = [
//   {
//     id: 14,
//     title: 'Today',
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3)),
//   }
// ]

const events = [
  {
    title: 'Today',
    start: new Date()
  },
  {
    title: 'Test',
    start: new Date(2019,3,20)
  }
]


const Calendar = () => {
  return (
    <Layout>
      <CalendarIndex events={events}/>
    </Layout>
  )
}


export default Calendar