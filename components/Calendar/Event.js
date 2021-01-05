import React from 'react'
import styled from 'styled-components'

const EventWrapper = styled.div`

`

const Event = (props) => {
  console.log(props)
  return (
    <EventWrapper>
      {props.children}
    </EventWrapper>
  )
}

export default Event