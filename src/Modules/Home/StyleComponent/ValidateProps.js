import React, { Component } from 'react'
import styled from 'styled-components'
const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? '#ddd' : '#palevioletred'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid #eee;
  border-radius: 3px;
`;


class ValidateProps extends Component {
  render() {
    return (
      <div>
        <Button>Normal</Button>
        <Button primary>Primary</Button>
      </div>
    )
  }
}

export default ValidateProps;
