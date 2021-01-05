import React from 'react'
import Router from 'next/router'

import {useStore} from "../Shared/StoreContext";
import {useAuth} from '../Shared/AuthContext'

import Header from '~/Header';
import Sidebar from '~/Sidebar';

import SidebarLink from '~/Sidebar/Link'

import {LayoutWrapper, ChildrenWrapper} from './styles'

import {POST} from '../../lib/api'

const Layout = (props) => {
  const storeState = useStore()
  const authState = useAuth()

  if(!authState.token) return <div />

  React.useEffect(() => {
    POST('/.netlify/functions/create-visitor', {
      referrer: document.referrer,
      path: window.location.pathname
    })
  }, [])

  return (
    <LayoutWrapper sidebarOpen={storeState.state.sidebarOpen}>
   
        <Header />
     

        <Sidebar render={
          <>
            <SidebarLink href="/" render={<a>Dashboard</a>}/>
            <SidebarLink href="/analytics" render={<a>Analytics</a>}/>
            <SidebarLink href="/invoice" render={<a>Invoice</a>}/>
            <SidebarLink href="/contacts" render={<a>Contacts</a>}/>
            <SidebarLink href="/calendar" render={<a>Calendar</a>}/>
            <SidebarLink href="/charts" render={<a>Charts</a>}/>
            <SidebarLink href="/forms" render={<a>Forms</a>}/>
            <SidebarLink href="/pagination" render={<a>Pagination</a>}/>
            <SidebarLink href="/externalpagination" render={<a>External Pagination</a>}/>
            <SidebarLink href="/infinitescroll" render={<a>Infinte Scroll</a>}/>
            <SidebarLink href="/filters" render={<a>Filters</a>}/>
            <SidebarLink href="/documenteditor" render={<a>Document Editor</a>}/>
            <SidebarLink href="/changepassword" render={<a>Change Password</a>}/>
          </>
        }/>


        <ChildrenWrapper id="childrenWrapper">
          {props.children}
        </ChildrenWrapper>


    </LayoutWrapper>
  )
}

export default Layout