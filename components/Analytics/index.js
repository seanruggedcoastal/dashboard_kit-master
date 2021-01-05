import React, { useState, useMemo } from 'react'

import LineChart from '~/Charts/LineChart'
import {CardWrapper, CardHeader, CardContent} from '~/Card'
import * as dateFns from "date-fns"
import {GET} from '../../lib/api'
import styled from 'styled-components'

const DataLineContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  background-color: ${props => props.theme.background};
  padding: 12px 1rem;
  @media(max-width:675px) {
    word-break: break-all;
  }
  span {
    flex: 1;

    &:first-of-type {
      max-width: 6%;
      color: ${props => props.theme.altColor};
      @media(max-width: 675px) {
        max-width: 20%;
      }
    }
  }
`


const Analytics = () => {

  const [ data, setData ] = useState(null)
  const [ date, setDate ] = useState(new Date())

  const getAnalytics = async ({month, timezone}) => {
    const resp = await GET(`/.netlify/functions/get-visitor?month=${month}&timezone=${timezone}`)

    if(resp.data && resp.data.dateData){
      resp.data.dateData = resp.data.dateData.reduce((a,b) => {
        a[b._id] = b.count
        return a
      },{})
    }

    setData(resp.data)
  }

  const Dates = (currentMonth) => {

    const dDate = new Date(currentMonth)

    const monthEnd = new Date(currentMonth)
    monthEnd.setMonth(currentMonth.getMonth()+1)
    monthEnd.setDate(1)
    monthEnd.setDate(monthEnd.getDate()-1)

    let dDay = 1
    const lastDay = monthEnd.getDate()

    const days = {
      labels: [],
      dates: []
    }

    do{

      dDate.setDate(dDay)
      days.labels.push(dDay)
      days.dates.push( dateFns.format(dDate, 'yyyy-MM-dd')  )
      dDay++;

    }while( days.labels[days.labels.length-1] < lastDay )

    return days;
  }

  const days = useMemo(() => Dates(date),[date])
  const lineChartData = useMemo(() => {

    if(!data) return {
      labels: [],
      dataSet: [
        {
          title: dateFns.format(date, 'MMMM'),
          color: 'blue',
          data: []
        }
      ]
    }

    return {
      labels: days.labels,
      dataSet: [
        {
          title: dateFns.format(date, 'MMMM'),
          color: 'blue',
          data: days.dates.map(v => data.dateData[v] || 0)
        }
      ]
    }

  },[data])


  React.useEffect(() => {
    getAnalytics({
      month: dateFns.format(date, 'yyyy-MM'),
      timezone: 'EST'
    })
  }, [ date ])

  const monthAdd = (n) => {
    const d = new Date(date)
    d.setMonth(d.getMonth()+n)
    setDate(d)
  }

  const prevMonth = () => monthAdd(-1)
  const nextMonth = () => monthAdd(1)

  return (
    <>

        <div style={{display: 'flex',justifyContent: 'space-between'}}>
          <button onClick={prevMonth}>Prev Month</button>
          <button onClick={nextMonth}>Next Month</button>
        </div>

        <LineChart
          size={{width: '100%', height: '400px'}}
          data={lineChartData} />

        
        <CardWrapper>
          <CardHeader><h3>Paths</h3></CardHeader>
          <CardContent>
            {data && data.visitorCount.path.map((item, i) => {
              return <DataLineContainer key={i}>
                <span>{item.count}</span>
                <span>{item._id}</span>
              </DataLineContainer>
            })}
          </CardContent>
        </CardWrapper>

        <CardWrapper>
          <CardHeader><h3>Referrers</h3></CardHeader>
          <CardContent>
            {data && data.visitorCount.referrer.map((item, i) => {

              if (item._id !== "") {
                return <DataLineContainer key={i}>
                  <span>{item.count}</span>
                  <span>{item._id}</span>
                </DataLineContainer>
              } else {
                return <DataLineContainer key={i}>
                  <span>{item.count}</span>
                  <span>Direct</span>
                </DataLineContainer>
              }

            })}
          </CardContent>
        </CardWrapper>

        <CardWrapper>
          <CardHeader><h3>Devices</h3></CardHeader>
          <CardContent>
            {data && data.visitorCount.device.map((item, i) => {
              return <DataLineContainer key={i}>
                <span>{item.count}</span>
                <span>{item._id}</span>
              </DataLineContainer>
            })}
          </CardContent>
        </CardWrapper>

        <CardWrapper>
          <CardHeader><h3>Country</h3></CardHeader>
          <CardContent>
            {data && data.visitorCount.country.map((item, i) => {
              return <DataLineContainer key={i}>
                <span>{item.count}</span>
                <span>{item._id}</span>
              </DataLineContainer>
            })}
          </CardContent>
        </CardWrapper>

        <CardWrapper>
          <CardHeader><h3>Browser</h3></CardHeader>
          <CardContent>
            {data && data.visitorCount.browser.map((item, i) => {
              return <DataLineContainer key={i}>
                <span>{item.count}</span>
                <span>{item._id}</span>
              </DataLineContainer>
            })}
          </CardContent>
        </CardWrapper>

    </>
  )
}

export default Analytics
