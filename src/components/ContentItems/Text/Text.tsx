import * as React from "react";
import styled from "styled-components";

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = change => {
    // const operation = change.operations.toJS();
    this.props.handleOnChange(change, this.props.index, "TEXT", "TEXT_CHANGE");
  };

  render() {
    return (
      <TextContainer
        textColor={this.props.item.textColor}
        textAlign={
          this.props.item.textAlign ? this.props.item.textAlign : "left"
        }
        className="markdown-body"
      >
        <Editor
          style={{
            color: "rgba(0,0,0,1)",
            fontFamily: "Nanum Gotic",
            wordBreak: "break-word"
          }}
          schema={this.props.schema}
          value={this.props.value}
          readOnly={false}
          onChange={this.onChange}
          renderNode={this.props.renderNode}
          renderMark={this.props.renderMark}
          autoCorrect={false}
          spellCheck={false}
          plugins={plugins}
        />
      </TextContainer>
    );
  }
}
