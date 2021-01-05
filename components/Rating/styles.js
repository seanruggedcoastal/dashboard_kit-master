import styled from 'styled-components'

export const RatingWrapper = styled.ul`
  list-style: none;
`

export const RatingItem = styled.li`
  margin: 0 8px 0 0;
  position: relative;
  cursor: pointer;
  display: inline-block;

  svg {
    path {
      fill: ${props => props.active ? props.theme.yellow : `#e8e8e8`};
    }
  }

  &:hover {
    svg {
      path {
        fill: ${props => props.theme.yellow};
      }
    }
  }

`