import React from 'react'

const Cell = (props) => {
  console.log(props)
  return (
    <div style={{background: 'green', width: '100%', borderRight: '1px solid white'}}>
      {props.children}
    </div>
  )
}

export default Cell