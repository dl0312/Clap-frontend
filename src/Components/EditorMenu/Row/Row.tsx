import * as React from "react";
import styled from "styled-components";
import RowItem from "../../RowItem";

const RowBody = styled.div`
  padding: 25px;
`;

interface IProps {
  masterCallback: any;
  onClickPushNewBlock: any;
}

interface IState {
  rowItems: Array<{ array: number[] }>;
}

class Row extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      rowItems: [
        { array: [1] },
        { array: [1, 1] },
        { array: [1, 1, 1] },
        { array: [1, 1, 1, 1] },
        { array: [1, 2] },
        { array: [2, 1] },
        { array: [1, 2, 1, 2] }
      ]
    };
  }

  public addItem = (name: string) => {
    console.log(`adding name: ` + name);
  };

  public render() {
    return (
      <RowBody>
        {this.state.rowItems.map((item, index) => (
          <RowItem
            key={index}
            item={item}
            array={item.array}
            masterCallback={this.props.masterCallback}
            onClickPushNewBlock={this.props.onClickPushNewBlock}
          />
        ))}
      </RowBody>
    );
  }
}

export default Row;
