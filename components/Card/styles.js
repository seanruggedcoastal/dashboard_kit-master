import styled from 'styled-components'

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${props => props.theme.foreground};
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.border};
  
  svg {
    width: 12px;
    height: 12px;
  }
`

export const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 28px;


  button {
    height: 22px;
  }
`

export const CardContent = styled.div`
  margin-top: 0.5em;
`

export const CardFooter = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 24px;
`

export const CardImage = styled.div`
  background: ${props => `url(${props.src})`};
  margin-top: 0.5em;
  background-size: cover;
  background-repeat: no-repeat;
  width: 90%;
  height: ${props => props.height ? props.height : '400px'};
`