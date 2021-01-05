import styled from 'styled-components'

export const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-start: 1;
  grid-column-end:   3;
  background: ${props => props.theme.foreground};
`