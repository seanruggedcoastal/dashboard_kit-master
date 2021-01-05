import React from 'react'
import {RatingWrapper, RatingItem} from './styles'
import {Star} from '../Icons'

const Rating = (props) => {

  const [ratingSelected, setRating] = React.useState(1)

  const changeRating = (rating) => {
    setRating(rating)
  }

  return (
    <RatingWrapper>
      {[...Array(props.amount)].map((n, i) => (
        <RatingItem key={i} active={i < ratingSelected} onClick={(e) => {
          e.preventDefault() 
          changeRating(i + 1)
        }}>
          <Star />
        </RatingItem>
      ))}

    </RatingWrapper>
  )
}

export default Rating