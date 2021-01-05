import React from 'react'
import {useTheme} from '../Shared/ThemeContext'
import styled from 'styled-components'

const StyledSvg = styled.svg`

`


const Moon = (props) => {
  const themeState = useTheme()
  return (
    <StyledSvg darkmode={themeState.dark} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM6 11V6V1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" />
    </StyledSvg>
  )
}

export default Moon;