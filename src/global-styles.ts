import reset from 'styled-reset';
import { injectGlobal } from './typed-components';

// tslint:disable-next-line
injectGlobal`
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.0.13/css/all.css");
@import url("https://fonts.googleapis.com/css?family=Maven+Pro|Roboto:300:400,700|Eczar|Oswald|Playfair+Display|Hanalei+Fill|Quicksand|Open+Sans|Raleway|Anton|Do+Hyeon|Kirang+Haerang|Nanum+Gothic|Nanum+Gothic+Coding|Nanum+Myeongjo|Nanum+Pen+Script|Sunflower:300");
@import url("//cdn.jsdelivr.net/font-iropke-batang/1.2/font-iropke-batang.css");
  ${reset};
  * {
      box-sizing: border-box;
  }
  body{
      font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
  a{ 
      color:inherit;
      text-decoration:none;
  }
  input,
  button{&:focus,&:active{outline:none}
  }
  h1,h2,h3,h4,h5,h6{
      font-family:'Maven Pro', sans-serif;
  }
`;
