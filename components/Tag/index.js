import React from 'react'
import styled from 'styled-components'

const TagWrapper = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 999px;
  ${(props) => {
    switch(props.type) {
      case "success":
        return `color: ${props.theme.white}; background-color: ${props.theme.green};`
      case "notify":
      case "warning":
        return `color: ${props.theme.white}; background-color: ${props.theme.yellow};`
      case "error":
      case "alert":
        return `color: ${props.theme.white}; background-color: ${props.theme.red};`
      case "info":
      default:
        return `color: ${props.theme.white}; background-color: ${props.theme.blue};`
    }
  }}
`

const Tag = (props) => {
  return (
    <TagWrapper type={props.type}>
      {props.children}
    </TagWrapper>
  )
}

export default Tag