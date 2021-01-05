import React from 'react'
import {Pencil, Dots, ThumbsUp, BadgeIcon} from '~/Icons'
import Button from '~/Button'

import Dropdown from '~/Dropdown'
import {CardWrapper, CardHeader, CardFooter, CardContent, CardImage} from '~/Card'
import styled from 'styled-components'

const FilterWrapper = styled.div`
  margin: 1rem 0;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;

  @media(max-width: 675px) {
    grid-template-columns: 1fr;
  }
`

const LabelWrapper = styled.label`
  margin-right: 0.5em;
  cursor: pointer;
  padding: 0.5em 1em;
  border-radius: 2px;
  background: ${props => props.active ? props.theme.altColor : props.theme.foreground};
  border: 1px solid ${props => props.active ? props.theme.altColor : props.theme.border};

  input {
    display: none;
  }

  span {
    color: ${props => props.active ? props.theme.white : props.theme.normalText};
  }

`

const Filters = (props) => {
  const [state, setState] = React.useState({
    items: props.items ? props.items : [],
    setItems: [],
    selectedFilters: []
  })

  const handleFilterChange = (e) => {
    if(!e.target.checked && state.selectedFilters.includes(e.target.value)) {
      let newFilters = state.selectedFilters.filter(item => item !== e.target.value)
      setState({
        ...state,
        selectedFilters: newFilters
      })
    } else {
      setState({
        ...state,
        selectedFilters: [...state.selectedFilters, e.target.value]
      })
    }

  }

  const activeBoolean = React.useRef()


  React.useEffect(() => {
    setState({
      ...state,
      setItems: state.selectedFilters.length ? state.items.filter(item => state.selectedFilters.includes(item.type)) : state.items
    })
  }, [state])


  return (
    <>
      <FilterWrapper>
        {props.filters && props.filters.map((filter, i) => {
          return <LabelWrapper onChange={handleFilterChange} active={state.selectedFilters.includes(filter.toLowerCase())}key={i}>
          <input type="checkbox" value={filter.toLowerCase()} />
          <span>{filter}</span>
        </LabelWrapper>
        })}
      </FilterWrapper>

      <Wrapper>
        {state.setItems && state.setItems.map((item, i) => {
          return <CardWrapper key={i}>
          <CardHeader>
            <h3>This is a card</h3>
            <Button>
              <Dropdown links={[{label: 'Settings', url: '/'}]}><Dots /></Dropdown>
            </Button>
          </CardHeader>
          <CardContent>
            <p>John Doe・<span>Mar 19(14 hours ago)</span></p>
            <p>#node #react #devops #docker</p>
            <CardImage src={'https://images.pexels.com/photos/2214386/pexels-photo-2214386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} />
          </CardContent>
          <CardFooter>
            <div>
              <Button><ThumbsUp /></Button>
            </div>
            <div>
              <Button><BadgeIcon/></Button>
            </div>
          </CardFooter>
        </CardWrapper> 
        })}
      </Wrapper>
    </>
  )
}

export default Filters