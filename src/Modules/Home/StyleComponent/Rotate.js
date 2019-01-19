import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
// keyframes returns a unique name based on a hash of the contents of the keyframes
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const RotateCom = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;


class Rotate extends Component {
  render() {
    return (
      <div>
        <RotateCom>&lt; <span></span>💅 &gt;</RotateCom>
      </div>
    )
  }
}

export default Rotate;
