import React from 'react'
import {TimelineWrapper, TimelineItem} from './styles'

const Timeline = (props) => {
  return (
    <TimelineWrapper>
      {props.events && props.events.map((event, i) => {
        return (
          <TimelineItem last={props.events.slice(-1)[0] == event} key={i}>
          <div className="tail" />
          <div className="head" />
          <div className="content"><span>{event}</span></div>
          </TimelineItem>
        )
      })}
    </TimelineWrapper>
  )
}

export default Timeline