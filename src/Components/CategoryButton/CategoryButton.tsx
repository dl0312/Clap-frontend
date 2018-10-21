import React from "react";
import styled from "styled-components";
import CategorySelection from "../CategorySelection";
import onClickOutside from "react-onclickoutside";

const CategoryButtonContainer = styled.div``;

const Button = styled.i`
  position: absolute;
  right: 20px;
  top: 25px;
  opacity: 0.2;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

const CategorySelectionContainer = styled.div`
  position: absolute;
  z-index: 999;
  width: 400px;
  height: 500px;
  right: 10px;
  top: 60px;
  background-color: transparent;
`;

interface IProps {
  addIdToState: any;
  deleteIdToState: any;
  selectedCategories: any;
}

interface IState {
  isOpen: boolean;
}

class CategoryButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  public render() {
    const { addIdToState, deleteIdToState, selectedCategories } = this.props;
    const { isOpen } = this.state;
    return (
      <CategoryButtonContainer>
        <Button
          className="fas fa-search fa-2x"
          onClick={() =>
            this.setState({
              isOpen: !isOpen
            })
          }
        />
        {isOpen && (
          <CategorySelectionContainer>
            <CategorySelection
              type="CATEGORY"
              addIdToState={addIdToState}
              deleteIdToState={deleteIdToState}
              selectedCategories={selectedCategories}
            />
          </CategorySelectionContainer>
        )}
      </CategoryButtonContainer>
    );
  }
}

export default onClickOutside(CategoryButton);
