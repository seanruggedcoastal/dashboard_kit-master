import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  grid-area: header;
  display: flex;
  background: ${props => props.theme.foreground};
  padding-right: 22px;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.border};


  svg {
    path {
      fill: ${props => props.theme.mainColor};
    }
  }

  button {
    &:hover {
      path {
        fill: ${props => props.theme.altColor};
      }
    }
  }
`

export const Right = styled.div`
  display: flex;
  align-items: center;
  div {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`

export const Left = styled.div`
  display: flex;
  align-items: center;


`

export const SidebarButton=styled.div`
  margin-left: 1rem;
  svg {
    width: 14px;
    height: 14px;
  }
`

export const Logo = styled.div`
  // width: ${props => props.sidebarOpen ? props.theme.sidebarSize : 'auto'};
  width: ${props => props.theme.sidebarSize};
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-right: 1px solid ${props => props.theme.border};


  img {
    width: 50px;
  }
`

export const SvgWrapper = styled.div`
  border: 1px solid ${props => props.theme.border};
  padding: 6px;
  border-radius:2px;
`