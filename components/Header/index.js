import React from 'react'


import {HeaderWrapper, Right, Left, SidebarButton, Logo, SvgWrapper} from './styles'

import Button from '../Button'
import Dropdown from '../Dropdown'
import {Bell, SidebarIcon} from '../Icons'
import Badge from '../Badge'
import Avatar from '../Avatar'

import {useAuth} from '../Shared/AuthContext'
import {useStore} from '../Shared/StoreContext'

const Header = () => {
  const storeState = useStore()
  const authState = useAuth()


  const toggleSidebar = () => {
    return storeState.dispatch({
      type: 'TOGGLE_SIDEBAR'
    })
  }

  const logout = () => {
    return authState.logout()
  }

  return (
    <HeaderWrapper>
        <Left>
          <Logo sidebarOpen={storeState.state.sidebarOpen}>
            <h2>React Dashboard</h2>
          </Logo>
          <SidebarButton>
            <Button onClick={() => toggleSidebar()}>
            <SvgWrapper>
              <SidebarIcon />
              </SvgWrapper>
            </Button>
          </SidebarButton>
        </Left>
        <Right>

          <Dropdown links={
            [
              {label: 'Profile', url: '/'},
              {label: 'Logout', action: () => logout()}
            ]
          }>
            <SvgWrapper style={{padding: '1px 4px'}}>
              <Avatar style={{marginTop: '2px'}} image="https://pbs.twimg.com/profile_images/1041120784041664512/JBD9Peqg_400x400.jpg"/>
            </SvgWrapper>
          </Dropdown>
          
          <Dropdown links={
            [
              {label: 'Message from John', url: '/'}
            ]
          }>
            <Badge icon={Bell} type="small" border/>
          </Dropdown>

        </Right>
    </HeaderWrapper>
  )
}


export default Header
