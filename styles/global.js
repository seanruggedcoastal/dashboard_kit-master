import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,500,600');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Sans', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    transition: all 0.15s ease;
    transition-property: color, background-color, border;
  }
  body {
    background-color: ${props => props.theme.background};
  }
  h1, h2, h3, h4 {
    color: ${props => props.theme.normalText};
  }
  p {
    color: ${props => props.theme.normalText};
  }
  span {
    color: ${props => props.theme.normalText};
  }
  button {
    border: 0px;
    cursor: pointer;
    background: transparent;
    &:focus {
      outline: none;
    }
  }

  svg {
    path {
      fill: ${props => props.theme.mainColor}
    }
  }

  input[type=text], input[type=email], input[type=password] {
    padding: 10px;
    border: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.black};
    border-radius: 2px;
  }

  input[type=date] {
    padding: 10px;
    border: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.black};
    border-radius: 2px;
  }

  textarea {
    padding: 10px;
    border: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.black};
    border-radius: 2px;
  }

`;

export default GlobalStyle;