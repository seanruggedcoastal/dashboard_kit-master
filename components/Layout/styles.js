import styled from 'styled-components'


export const LayoutWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "nav content content";
  grid-template-rows: auto 1fr;
  grid-template-columns: ${props => props.sidebarOpen ? `${props.theme.sidebarSize} 1fr ${props.theme.sidebarSize}` : '0 1fr'};
  height: 100vh;
  
  

  @media(max-width: 675px) {
    overflow-x: hidden;
    grid-template-columns: ${props => props.sidebarOpen ? `${props.theme.sidebarSize} 100% ${props.theme.sidebarSize}` : '0 1fr'};
  }

`

export const ChildrenWrapper = styled.div`
  grid-area: content;
  padding: 1rem;
  overflow-x: hidden;

  @media(max-width: 675px) {
    overflow-y: scroll;
    
    -webkit-overflow-scrolling: touch;
  }

`


