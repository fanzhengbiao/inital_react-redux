import React, { Component } from 'react'
import styled from 'styled-components'
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;


class ChildNodeProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNameValue: '@value',
    }
  }

  render() {
    const { inputNameValue } = this.state;

    return (
      <div>
        <Input placeholder="@placeholder" type="text" />
        <Input
          type="text"
          value={inputNameValue}
          ref={ref => this.inputName = ref}
          onChange={e => this.setState({ inputNameValue: e.target.value })}
        />
      </div>
    )
  }
}

export default ChildNodeProps;
