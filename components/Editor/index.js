import React from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value } from 'slate'
import HoverMenu from './HoverMenu'
import defaultValue from './defaultData'
import styled from 'styled-components'

const SlateEditorWrapper = styled.div`
  code {
    background-color: ${props => props.theme.border};
    font-size: 14px;
    padding: 0 0.5em;
  }
`




const Editor = (props) => {

  const [state, setState] = React.useState({
    value: Value.fromJSON(defaultValue)
  })

  const updateMenu = () => {
    const menu = document.getElementById('hoverMenu')
    if (!menu) return

    const { value } = state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  React.useEffect(() => {
    updateMenu()
  }, [state.value])

  const onChange = ({ value }) => {
    setState({ value })
  }
  
  const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  const renderEditor = (props, editor, next) => {
    const children = next()
    return (
      <React.Fragment>
        {children}
        <HoverMenu editor={editor} />
      </React.Fragment>
    )
  }

  return (
    <SlateEditorWrapper>
    <SlateEditor
      placeholder="Enter some text..."
      value={state.value}
      onChange={onChange}
      renderEditor={renderEditor}
      renderMark={renderMark}
      style={{
        height: '100%'
      }}
    />
    </SlateEditorWrapper>
  )
}

export default Editor