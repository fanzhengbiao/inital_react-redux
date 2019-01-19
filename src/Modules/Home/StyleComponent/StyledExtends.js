import React, { Component } from 'react'
import styled from 'styled-components'
// The Button from the last section without the interpolations
const ButtonComp = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// We're extending Button with some extra styles
const TomatoButton = styled(ButtonComp)`
  color: '#fff';
  backgroud: '#333',
  border-color: tomato;
`;


class StyledExtends extends Component {
  render() {
    return (
      <div>
        <ButtonComp>Normal Button</ButtonComp>
        <TomatoButton>Tomato Button</TomatoButton>
      </div>
    )
  }
}

export default StyledExtends;
