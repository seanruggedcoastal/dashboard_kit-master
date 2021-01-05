import styled from 'styled-components'
import { Tabs } from 'react-tabs';

export const Container = styled(Tabs)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: ${props => props.theme.foreground};
  min-height: 40em;
`;

export const MainContainer = styled.div`
  flex-basis: 68%;
  max-width: 68%;

  @media(max-width: 1030px) {
    flex-basis: 100%;
    max-width: 100%;
  }

  @media(max-width: 675px) {
    flex-basis: 100%;
    max-width: 100%;
  }
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex-basis: 30%;
  max-width: 30%;
  background: ${props => props.theme.border};
  margin-right: 1rem;

  @media(max-width: 1030px) {
    margin-right: 0;
    flex-basis: 100%;
    max-width: 100%;
  }

  @media(max-width: 675px) {
    margin-right: 0;
    flex-basis: 100%;
    max-width: 100%;
  }

  ul {
    padding: 10px 0px;
    list-style: none;

    li {
      padding: 20px 10px 20px 10px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;

    }

    .react-tabs__tab--selected {
      background-color: ${props => props.theme.blue};
      span {
        color: ${props => props.theme.white};
      }

    }
  }
`

export const SidebarImage = styled.div`
  width: 24px;
  height: 24px;
  background: ${props => props.image ? `url(${props.image})` : `gray`};
  background-size: cover;
  border-radius: 100px;
  margin-right: 10px;
`

export const SearchBar = styled.div`
  width: 100%;
  height: 38px;
  background: #f4f4f4;

  input {
    width: 100%;
    height: 100%;
    background: #ffffff;
    font-size: 14px;
    padding: 7px;
    border: 1px solid transparent;
  
    :focus {
      border: 1px solid ${props => props.theme.colorDark};
    }
  }
`;

export const MetaContainer = styled.div`

`

export const ActionContainer = styled.div`
  button {
    border: 1px solid ${props => props.theme.border};
    margin-top: 1rem;
    padding: 10px;

    &:first-child {
      border-right: 0px;
    }

    &:hover {
      svg {
        path {
          fill: ${props => props.theme.altColor};
        }
      }
    }
  }
`

export const SingleSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  margin: 2rem;

  img {
    width: 100%;
  }

  h3 {
    margin-bottom: 10px;
  }
`

export const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 999px;
  background: ${props => props.image ? `url(${props.image})` : `gray`};
  background-size: cover;
  margin-right: 1rem;
`

export const ContactDetails = styled.div`
  color: ${props => props.theme.normalText};
  margin: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 4rem;


  div {
    margin-bottom: 2rem;
    margin-right: 1rem;
    background:${props => props.theme.border};
    border-radius: 2px;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
    padding-left: 1rem;
    padding-right: 1rem;
    word-break: break-word;
    flex-basis: 30%;
    max-width: 30%;

    @media(max-width: 1030px) {
      flex-basis: 100%;
      max-width: 100%;
    }

    @media(max-width: 675px) {
      flex-basis: 100%;
      max-width: 100%;
    }

    span {
      position: absolute;
      font-size: 8px;
      top: 4px;
      left: 4px;
    }
  }

  .notes {
    width: 100%;
    min-height: 12em;
    max-width: 100%;
    flex-basis: 100%;
    align-items: flex-start;
  }
`