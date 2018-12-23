import reset from "styled-reset";
import { injectGlobal } from "./typed-components";
import { fontSize, color } from "./config/_mixin";
import EditorDefaults from "./EditorDefaults";

// tslint:disable-next-line
injectGlobal`
${reset};
@import url("https://cdnjs.cloudflare.com/ajax/libs/antd/3.10.4/antd.min.css");
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
  color: ${color.fontColor};
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

h1,h2,h3,h4,h5,h6{
  all: unset;
}

h1{
  font-family:'Maven Pro', sans-serif;
  font-size: 30px;
  color:inherit;
}
h2{
  font-family:'Maven Pro', sans-serif;
  font-size: 21px;
  color:inherit;

}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Maven Pro', sans-serif;
  font-weight: 400;
}

hr{
  margin: 10px 0;
}

.frame{
    border: 1px solid transparent;
}

.blockHover {
  border: 1px solid ${EditorDefaults.BORDER_ISOVER_COLOR};
}

.blockActive {
  border: none;
  background-color: rgba(0, 0, 0, 0.08);
}
.draftJsEmojiPlugin__emojiSelectButton__3sPol, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu{
    margin: 0;
    padding: 0;
    width: 32px;
    height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.2em;
    font-size: 15px;
    color: #888;
    background: #fff;
    border: none;
    /* border-radius: 1.5em; */
    cursor: pointer;
}
.ant-avatar>img {
  object-fit: cover;
    width: 100%;
    height: 100%;
    display: block;
}

.ant-carousel .slick-slide {
  text-align: center;
  height: 600px;
  vertical-align: center;
  background: transparent;
  overflow: hidden;
}

.ant-table-tbody>tr>td, .ant-table-thead>tr>th {

  vertical-align: middle;
}

.ant-table-small>.ant-table-content>.ant-table-body {
  margin: 0;
}

.ant-table-small.ant-table-bordered{
  background-color: white;
}

.ant-popover-inner-content{
  padding: 9px 10px;
}
.ant-popover-title{
    padding: 10px 15px 9px;
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
  margin:8px;
  cursor: pointer;
}

.toolbar-item-active {
  width: 15px;
  height: 15px;
  margin: 8px;
  cursor: pointer;
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

.draftJsMentionPlugin__mention__29BEd, .draftJsMentionPlugin__mention__29BEd:visited {
  color: #575f67;
  cursor: pointer;
  display: inline-block;
  background: #e6f3ff;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 2px;
  text-decoration: none;
}

.draftJsMentionPlugin__mention__29BEd:hover, .draftJsMentionPlugin__mention__29BEd:focus {
  color: #677584;
  background: #edf5fd;
  outline: 0; /* reset for :focus */
}

.draftJsMentionPlugin__mention__29BEd:active {
  color: #222;
  background: #455261;
}
.draftJsMentionPlugin__mentionSuggestionsEntry__3mSwm {
  padding: 7px 10px 3px 10px;
  transition: background-color 0.4s cubic-bezier(.27,1.27,.48,.56);
}

.draftJsMentionPlugin__mentionSuggestionsEntry__3mSwm:active {
  background-color: #cce7ff;
}

.draftJsMentionPlugin__mentionSuggestionsEntryFocused__3LcTd {
  background-color: #e6f3ff;
}

.draftJsMentionPlugin__mentionSuggestionsEntryText__3Jobq {
  display: inline-block;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 368px;
  font-size: 0.9em;
  margin-bottom: 0.2em;
}

.draftJsMentionPlugin__mentionSuggestionsEntryAvatar__1xgA9 {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 2px;
}
.draftJsMentionPlugin__mentionSuggestions__2DWjA {
  border: 1px solid #eee;
  margin-top: 0.4em;
  position: absolute;
  min-width: 200px;
  max-width: 440px;
  max-height: 400px;
  overflow-y: auto;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0px 4px 30px 0px rgba(220,220,220,1);
  cursor: pointer;
  padding-top: 8px;
  padding-bottom: 8px;
  z-index: 2;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  box-sizing: border-box;
  -webkit-transform: scale(0);
          transform: scale(0);
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #e5e5e5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
}


.draftJsEmojiPlugin__emojiSelect__34S1B {
    display: inline-block;
  }
  
  .draftJsEmojiPlugin__emojiSelectButton__3sPol, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu {
    margin: 0;
    padding: 0;
    width: 32px;
    height: 30px;
    box-sizing: border-box;
    line-height: 1.2em;
    font-size: 14px;
    color: black;
    border: none;
    opacity: 0.65;
    cursor: pointer;
      transition: 0.2s ease;

  }
  
  .draftJsEmojiPlugin__emojiSelectButton__3sPol:focus, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:focus {
    outline: 0;
    /* reset for :focus */
  }
  
  .draftJsEmojiPlugin__emojiSelectButton__3sPol:hover, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:hover {
    opacity: 1;
  }
  
  .draftJsEmojiPlugin__emojiSelectButton__3sPol:active, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:active {
    color: #e6e6e6;
  }
  
  .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu {
    color: #00bcd4;
    opacity: 1;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopover__1J1s0 {
    margin-top: 10px;
    padding: 0 .3em;
    position: absolute;
    z-index: 1000;
    box-sizing: content-box;
    background: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 30px 0 gainsboro;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverClosed__3Kxxq {
    display: none;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverTitle__3tpXz {
    margin: 0 0 .3em;
    padding-left: 1em;
    height: 2.5em;
    line-height: 2.5em;
    font-weight: normal;
    font-size: 1em;
    color: #9e9e9e;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m {
    margin: 0 0 .3em;
    position: relative;
    z-index: 0;
    width: 21em;
    height: 20em;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverGroup__3zwcE {
    padding: 0 .5em;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverGroup__3zwcE:first-child .draftJsEmojiPlugin__emojiSelectPopoverGroupTitle__2pC51 {
    display: none;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverGroupTitle__2pC51 {
    margin: 1em 0;
    padding-left: .5em;
    font-weight: normal;
    font-size: 1em;
    color: #9e9e9e;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverGroupList__HQ8_y {
    margin: 0;
    padding: 0;
    display: -webkit-box;
    display: flex;
    list-style: none;
    flex-wrap: wrap;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverGroupItem__2pFOS {
    width: 2.5em;
    height: 2.5em;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverToneSelect__28bny {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverToneSelectList__haFSJ {
    margin: .3em;
    padding: .3em;
    position: absolute;
    display: -webkit-box;
    display: flex;
    list-style: none;
    border: 1px solid #e0e0e0;
    border-radius: .5em;
    background: #fff;
    box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.1);
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverToneSelectItem__2SgvL {
    width: 2.5em;
    height: 2.5em;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverToneSelectItem__2SgvL:first-child {
    border-right: 1px solid #e0e0e0;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverEntry__1ErDJ, .draftJsEmojiPlugin__emojiSelectPopoverEntryFocused__M28XS {
    padding: 0;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverEntryFocused__M28XS {
    background-color: #efefef;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverEntryIcon__1yNaC {
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverNav__1Nzd7 {
    margin: 0;
    padding: 0 .5em;
    display: -webkit-box;
    display: flex;
    width: 20em;
    list-style: none;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverNavItem__qydCX {
    width: 2.5em;
    height: 2.5em;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverNavEntry__1OiGB, .draftJsEmojiPlugin__emojiSelectPopoverNavEntryActive__2j-Vk {
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 1.2em;
    color: #bdbdbd;
    background: none;
    border: none;
    outline: none;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverNavEntryActive__2j-Vk {
    color: #42a5f5;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6 {
    position: absolute;
    right: 0;
    top: .3em;
    bottom: .3em;
    width: .25em;
    background-color: #e0e0e0;
    border-radius: .125em;
    opacity: .1;
    transition: opacity .4s;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverScrollbarThumb__jGYdG {
    background-color: #000;
    border-radius: .125em;
    cursor: pointer;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m:hover .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6 {
    opacity: .3;
  }
  
  .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6:hover,
  .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6:active {
    opacity: .6;
  }
  .draftJsEmojiPlugin__emoji__2oqBk {
    background-position: center;
    /* make sure the background the image is only shown once */
    background-repeat: no-repeat;
    background-size: contain;
    /* move it a bit further down to align it nicer with the text */
    vertical-align: middle;
  
    /*
    We need to limit the emoji width because it can be multiple characters
    long if it is a 32bit unicode. Since the proper width depends on the font and
    it's relationship between 0 and other characters it's not ideal. 1.95ch is not
    the best value, but hopefully a good enough approximation for most fonts.
    */
    display: inline-block;
    overflow: hidden;
    max-width: 1.95ch;
    /*
    Needed for iOS rendering to avoid some icons using a lot of height without
    actually needing it.
    */
    max-height: 1em;
    line-height: inherit;
    margin: -.2ex 0em .2ex;
    /*
    In the past we used opacity: 0 to hide the original Emoji icon no matter what
    system it is. Recently we switched to color: transparent since it started to
    work in recent iOS version.
    */
    color: transparent;
  
    /*
    Some SVG files (say 2764 for :heart:) don't have default width/height, thus
    may not be rendered properly on some platforms/browsers (e.g., Windows 10 +
    Chrome 61).
    */
    min-width: 1em;
  }
  .draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_ {
    padding: 5px 10px 1px 10px;
    transition: background-color 0.4s cubic-bezier(.27,1.27,.48,.56);
  }
  
  .draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_:active {
    background-color: #cce7ff;
  }
  
  .draftJsEmojiPlugin__emojiSuggestionsEntryFocused__XDntY {
    background-color: #e6f3ff;
  }
  
  .draftJsEmojiPlugin__emojiSuggestionsEntryText__2sPjk {
    display: inline-block;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 368px;
    font-size: 0.9em;
  }
  
  .draftJsEmojiPlugin__emojiSuggestionsEntryIcon__1qC2V {
    width: 1em;
    height: 1em;
    margin-left: 0.25em;
    margin-right: 0.25em;
    display: inline-block;
  }
  .draftJsEmojiPlugin__emojiSuggestions__2ffcV {
    border: 1px solid #eee;
    margin-top: 1.75em;
    position: absolute;
    min-width: 220px;
    max-width: 440px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 4px 30px 0px rgba(220,220,220,1);
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    z-index: 2;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
            flex-direction: column;
    box-sizing: border-box;
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  

`;
