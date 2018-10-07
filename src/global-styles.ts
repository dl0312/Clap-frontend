import reset from "styled-reset";
import { injectGlobal } from "./typed-components";
import { fontSize, color } from "./config/_mixin";

// tslint:disable-next-line
injectGlobal`
${reset};
@import url("https://cdnjs.cloudflare.com/ajax/libs/antd/3.6.6/antd.min.css");
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://use.fontawesome.com/releases/v5.0.13/css/all.css");
@import url("https://fonts.googleapis.com/css?family=Maven+Pro|Roboto:300:400,700|Eczar|Oswald|Playfair+Display|Hanalei+Fill|Quicksand|Open+Sans|Raleway|Anton|Do+Hyeon|Kirang+Haerang|Nanum+Gothic|Nanum+Gothic+Coding|Nanum+Myeongjo|Nanum+Pen+Script|Sunflower:300");
@import url("//cdn.jsdelivr.net/font-iropke-batang/1.2/font-iropke-batang.css");
  * {
      box-sizing: border-box;
  }
  body{
    background-color: ${color.bgColor};
    /* font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Releway"; */
    font-size: ${fontSize.normalFontSize};
    color: white;
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
  .blockHover {
  border: 2px solid gray;
}

.blockActive {
  border: 2px solid black;
}

.ql-stroke {
  stroke: #777;
  fill: transparent;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5px;
}

.ql-stroke-active {
  stroke: #333;
  fill: transparent;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
}

.ql-stroke-mitter {
  stroke: #777;
  fill: transparent;
}

.ql-stroke-mitter-active {
  stroke: #333;
  fill: transparent;
}

.ql-fill {
  fill: #777;
}

.ql-fill-active {
  fill: #333;
}

.ql-even {
  stroke: #777;
  fill: #fff;
}

.ql-even-active {
  stroke: #333;
  fill: #fff;
}


  .ql-color-label {
    fill: red;
  }


.ql-transparent {
  opacity: 0.2;
}

.ql-thin {
  stroke: #777;
  fill: transparent;
  stroke-width: 1;
}

.ql-thin-active {
  stroke: #333;
  fill: transparent;
  stroke-width: 2;
}

.toolbar-item {
  width: 25px;
  height: 25px;
  margin: 4px;
}

.toolbar-item-active {
  width: 25px;
  height: 25px;
  margin: 4px;
}

.toolbar-select {
  display: inline-block;
  margin-right: 3px;
}

.editor {
  padding: 5px;
  margin: 4px 10px 4px 5px;
}

.toolbar-item-disable > * {
  stroke: #ccc;
  cursor: not-allowed;
}

`;
