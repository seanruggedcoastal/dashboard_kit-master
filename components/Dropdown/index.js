import React from 'react'
import Link from 'next/link'
import {DropDown} from './styles'

const Dropdown = (props) => {

  const node = React.useRef();

  const [state, setState] = React.useState({
    show: false
  })

  const showDropDown = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    setState({
      show: false
    })
  }

  React.useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", showDropDown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", showDropDown);
    };
  }, []);


  return (
    <DropDown ref={node} style={props.style}>
      <span onClick={(e) => setState({show: !state.show})}>{props.children}</span>
    {state.show &&
      <ul>
        {props.links && props.links.map((link, i) => {
          if(!link.url && link.action) {
    
            const action = () => link.action()
            return <li key={i} onClick={() => action()}>{link.label}</li>
          } else {
            return <li key={i}><Link href={link.url} as={link.as}><a>{link.label}</a></Link></li>
          }
        })}
      </ul>
    }

      
    </DropDown>
  )
}

export default Dropdown
