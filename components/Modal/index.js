import React from 'react'
import styled from 'styled-components'
import Button from '../Button'

const ModalRoot = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1300;
  position: fixed;
`

const ModalBackDrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  touch-action: none;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`

const ModalContentWrapper = styled.div`
  background: ${props => props.theme.foreground};
  max-width: 600px;
  max-height: calc(50% - 96px);
  padding: 1rem;
  min-width: 600px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;

  p {
    margin-bottom: 2rem;
  }

  button {
    display: block;
    margin: 0 auto;
    width: 40%;
  }
`

const Modal = ({ children, button}) => {
  const [isShown, setIsShown] = React.useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  React.useEffect(() => {
    document.getElementsByTagName("body")[0].style.overflow = `${isShown ? 'hidden' : 'auto'}`
  })

  return (
    <>
    {button(show)}
    {isShown && <ModalRoot>
      <ModalBackDrop onClick={hide}/>
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%'
      }}>
      <ModalContentWrapper>
        {children}
        <Button onClick={hide} type='primary'>Close</Button>
      </ModalContentWrapper>
      </div>
    </ModalRoot>}
    </>
  )
};

export default Modal