import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
  ${(props) => {
    switch(props.type) {
      case "primary":
      case "submit":
        return `
          background-color: ${props.theme.blue};
          border: 1px solid #1461D2;
          color: ${props.theme.white};
          width: 8rem;
          padding-top: 10px;
          padding-bottom: 10px;
          border-radius: 2px;
          box-shadow: 0 1px 1px 0 rgba(19, 31, 21, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
          &:hover {
            box-shadow: 0 1px 1px 0 rgba(22, 29, 37, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
            background-image: linear-gradient(0deg, #0E55BD 0%, #0F5BCA 100%);
          }
        `
      case "danger":
        return `
          background-color: ${props.theme.red};
          border: 1px solid #CF3E25;
          color: ${props.theme.white};
          width: 8rem;
          padding-top: 10px;
          padding-bottom: 10px;
          border-radius: 2px;
          box-shadow: 0 1px 1px 0 rgba(19, 31, 21, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
          &:hover {
            box-shadow: 0 1px 1px 0 rgba(22, 29, 37, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
            background-image: linear-gradient(0deg, #E6492D 0%, #DB472D 100%);
          }
        `
      case "default":
        return `
        background-color: #38B249;
        border: 1px solid #2D9C3C;
        color: ${props.theme.white};
        width: 8rem;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 2px;
        background-image: linear-gradient(0deg, #34AA44 0%, #38B249 100%);
        box-shadow: 0 1px 1px 0 rgba(19, 31, 21, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
        &:hover {
          box-shadow: 0 1px 1px 0 rgba(22, 29, 37, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
          background-image: linear-gradient(0deg, #2CA13C 2%, #2FAE40 100%);
        }
      `
      default:
        return
    }
  }}

  ${props => props.disabled && `
    color: #D8D8D8;
    background-color: #f7f7f7;
    border: 1px solid #e9e9e9;
    cursor: not-allowed;
    width: 8rem;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 2px;
  `}

  ${props => props.round && `
    width: 35px;
    padding: 0;
    font-size: 14px;
    border-radius: 50%;
    height: 35px;
  `}

  svg {
    path {
      fill: ${props => props.type && props.theme.white};
    }
  }


`

const Button = (props) => {
  return (
    <ButtonWrapper {...props}>{props.children}</ButtonWrapper>
  )
}

export default Button