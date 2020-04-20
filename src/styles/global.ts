import { createGlobalStyle } from 'styled-components';
// import GithubBrackground from '../assets/github-background.svg';
// background: "#000000" url(${GithubBrackground}) no-repeat 70% top; */
export default createGlobalStyle`
  * {
    margin: 0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
  }

  body {

    -webkit-font-smoothing: antialiased;
  }

  body, input, button{
    font: 16px Roboto, sans-serif;
  }

  #root{
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button{
    cursor: pointer;
  }

`;
