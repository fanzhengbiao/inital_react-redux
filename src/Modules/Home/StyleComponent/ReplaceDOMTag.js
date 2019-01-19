import React, { Component } from 'react'
import styled from 'styled-components'
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
// We're replacing the <button> tag with an <a> tag, but reuse all the same styles
const Link = Button.withComponent('a')

// Use .withComponent together with .extend to both change the tag and use additional styles
const TomatoLink = styled(Link)`
  color: tomato;
  border-color: tomato;
`;


class ReplaceDOMTag extends Component {
  render() {
    return (
      <div>
        <Button>Normal Button</Button>
        <Link>Normal Link</Link>
        <TomatoLink>Tomato Link</TomatoLink>
      </div>
    )
  }
}

export default ReplaceDOMTag;
