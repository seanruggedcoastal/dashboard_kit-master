import React from 'react'
import {BadgeWrapper, CountWrapper, SvgWrapper} from './styles'

const Badge = (props) => {
  const Icon = props.icon
  return (
    <BadgeWrapper type={props.type} {...props}>
      {/* {!props.border && props.icon ? <Icon /> : <a/>} */}
      {(props.icon && props.border) ? <SvgWrapper><Icon /></SvgWrapper> : (props.icon) ? <Icon /> : <a />}
      <CountWrapper type={props.type} border={props.border}>999+</CountWrapper>
    </BadgeWrapper>
  )
}

export default Badge