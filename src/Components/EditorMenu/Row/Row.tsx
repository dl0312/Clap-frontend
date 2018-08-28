class Row extends Component {
  state = {
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

  addItem = name => {
    console.log(`adding name: ` + name);
  };

  render() {
    return (
      <RowBody>
        {this.state.rowItems.map((item, index) => (
          <RowItem
            key={index}
            item={item}
            array={item.array}
            handleDrop={name => this.addItem(name)}
            masterCallback={this.props.masterCallback}
          />
        ))}
      </RowBody>
    );
  }
}

export default Row;
