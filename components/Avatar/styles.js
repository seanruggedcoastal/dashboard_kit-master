import styled from 'styled-components'

export const AvatarWrapper = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 99px;
  display: inline-block;
  background: ${props => props.image ? `url(${props.image})` : props.theme.background};
  background-size: cover;
`