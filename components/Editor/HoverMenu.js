import React from 'react'
import styled from 'styled-components'
import {BoldIcon, ItalicIcon, UnderlineIcon, CodeIcon} from './Icons'

const StyledMenu = styled.div`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
`

const Button = styled.span`
  cursor: pointer;
  &:not(:last-child){ margin-right: 0.5em; }

  
  svg {
    height: 20px;
    width: 20px;

    path, polygon {
      fill: ${props =>
        props.reversed
          ? props.active ? 'white' : '#aaa'
          : props.active ? 'black' : '#ccc'};
    }
  }
`


const HoverMenu = (props) => {

  const onClickMark = (event, type) => {
    const { editor } = props
    event.preventDefault()
    editor.toggleMark(type)
  }

  const renderMarkButton =(type, icon) => {
    const { editor } = props
    const { value } = editor
    const isActive = value.activeMarks.some(mark => mark.type === type)
    return (
      <Button
        reversed
        active={isActive}
        onMouseDown={event => onClickMark(event, type)}
      >
        <span>{icon}</span>
      </Button>
    )
  }

  return (
    <StyledMenu id="hoverMenu">
      {renderMarkButton('bold', <BoldIcon/>)}
      {renderMarkButton('italic', <ItalicIcon/>)}
      {renderMarkButton('underlined', <UnderlineIcon style={{top: '1px', position:'relative'}}/>)}
      {renderMarkButton('code', <CodeIcon style={{width: '25px'}}/>)}
    </StyledMenu>
  )
}

export default HoverMenu