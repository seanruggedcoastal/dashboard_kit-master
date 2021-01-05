import React from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'
import Scroll from '../components/Scroll'

import {Pencil, Dots, ThumbsUp, BadgeIcon} from '~/Icons'
import Button from '~/Button'

import Dropdown from '~/Dropdown'
import {CardWrapper, CardHeader, CardFooter, CardContent, CardImage} from '~/Card'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const List = styled(Scroll)`
  width: 80%;
  @media(max-width: 675px) {
    width: 100%;
  }
`

//emulate api
let perPage = 2

const createArrayInitialArray = () => {
  return [...Array(perPage).keys()].map(i => ({ id: i+1 , name: 'Item ' + (i+1) }))
}

const InfiniteScroll = (props) => {

  const arrayRef = React.useRef(createArrayInitialArray());

  const [itemState, setItemState] = React.useState({
    items: arrayRef.current,
    currentPage: 1,
  })

  const handleScroll = (e) => {
    setItemState({
      items: [ ...arrayRef.current, ...itemState.items],
      currentPage: itemState.currentPage+1
    })
  }

  return (
    <Layout>
      <Wrapper>

        <List 
          currentPage={itemState.currentPage}
          pages={4}
          getMoreItems={(e) => handleScroll(e)}
        >

          {itemState.items && itemState.items.map((item, i) => (
                <CardWrapper key={i}>
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
          ))}

        </List>

      </Wrapper>
    </Layout>
  )
}


export default InfiniteScroll