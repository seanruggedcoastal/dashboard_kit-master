import React from 'react'
import {AvatarWrapper} from './styles'

const Avatar = (props) => {
  return (
    <AvatarWrapper {...props} image={props.image}/>
  )
}

export default Avatar