import React from 'react'
import {Info, Check, Bang, TransparentX, X} from '../Icons'

import {
  AlertWrapper, 
  IconWrapper, 
  ContentWrapper,
  CloseWrapper
} from './styles'


const Alert = (props) => {
  const [state, setState] = React.useState({
    show: true
  })

  const showIcon = () => {
    switch(props.type) {
      case "success":
        return <Check />
      case "error":
        return <TransparentX />
      case "info":
        return <Info />
      case "notify":
      case "warning":
        return <Bang />
      default:
        return
    }
  }
  
  return state.show && (
    <AlertWrapper {...props}>
      <IconWrapper>
        <span>
          {showIcon()}
        </span>
      </IconWrapper>
      <ContentWrapper>
        <h3>{props.title}</h3>
        <span>{props.message}</span>
      </ContentWrapper>
      <CloseWrapper>
        <span onClick={() => setState({show: !state.show})}><X/></span>
      </CloseWrapper>
    </AlertWrapper>
  
  )
}

export default Alert