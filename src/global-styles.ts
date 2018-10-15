import reset from "styled-reset";
import { injectGlobal } from "./typed-components";
import { fontSize, color } from "./config/_mixin";
import EditorDefaults from "./EditorDefaults";

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
  strong{
    font-weight: bolder;
  }
  h1{
    font-family:'Maven Pro', sans-serif;
    font-size: 30px;
      color:inherit;
      line-height: 25px;
  }
  h2{
    font-family:'Maven Pro', sans-serif;
    font-size: 21px;
          color:inherit;

  }
  hr{
    margin: 10px 0;
  }
.frame{
    border: 1px solid transparent;
}
.container{
    border: 1px solid transparent;
}
  .blockHover {
  border: 1px solid ${EditorDefaults.BORDER_ISOVER_COLOR};
}

.blockActive {
  border: 1px solid ${EditorDefaults.BORDER_SELECT_COLOR};
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
  width: 15px;
  height: 15px;
  margin: 8px;
}

.toolbar-item-active {
  width: 15px;
  height: 15px;
  margin: 8px;
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

.markdown-body table {
    display: table;
    width: 100%;
    overflow: auto;
    background-color: #777;
}

.markdown-body tbody {
   width: 100%;
}

.markdown-body table, .markdown-body pre {
    margin-top: 0;
}

.markdown-body table {
    border-spacing: 0;
    border-collapse: collapse;
}

.markdown-body * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.markdown-body * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.markdown-body table tr {
    background-color: #222;
    border-top: 1px solid #c6cbd1;
}

.markdown-body table tr:nth-child(2n) {
    background-color: #333;
}

.markdown-body table th, .markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

.markdown-body td {
  min-width: 75px;
}


.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}


`;
