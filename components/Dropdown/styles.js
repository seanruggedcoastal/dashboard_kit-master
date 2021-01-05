import styled from 'styled-components'

export const DropDown = styled.div`
  cursor: pointer;
  vertical-align: top;
  text-align: left;
  position: relative;
  overflow: visible;

  &:hover {
    color: blue;
  }


  ul {
    color: #666;
    position: absolute;
    background: ${props => props.theme.foreground};
    border: 1px solid ${props => props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    list-style: none;
    width: 140px;
    z-index: 12;
    left: -114px;
    top: 24px;

    li {
      border-bottom: 1px solid ${props => props.theme.border};
      color: ${props => props.theme.normalText};
      padding: 12px;
      font-size: 16px;
      &:hover {
        color: ${props => props.theme.altColor};
      }
      &:last-child {
        border-bottom: 0px;
      }
      
      a {
        text-decoration: none;
        color: ${props => props.theme.normalText};
        &:hover {
          color: ${props => props.theme.altColor};
        }
      }

    }
  }

`
