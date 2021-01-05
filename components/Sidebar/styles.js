import styled from 'styled-components'


export const SidebarWrapper = styled.div`
  grid-area: nav;
  display: ${props => props.sidebarOpen ? 'flex' : 'none'};
  flex-direction: column;
  background: ${props => props.theme.foreground};
  border-right: 1px solid ${props => props.theme.border};
  height: calc(100vh - 91px);

  ul {
    padding-top: 12px;
    overflow-y: auto;
    list-style: none;
    flex: 1;

    li {
      padding: 10px 10px 10px 24px;
      
      a {
        color: ${props => props.theme.normalText};
        text-decoration: none;
      }
    }

    .active {
      background-color: rgba(84, 147, 245, 0.05);
    }
  }
`

export const SettingsWrapper = styled.div`
  padding: 1rem;
  button {
    background: transparent;
    border: 0px;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      path {
        fill: ${props => props.theme.altColor};
      }
    }

    svg {
      path {
        fill: ${props => props.theme.mainColor};
      }
    }
  }

`
