import React from 'react'
import {SidebarContainer, SearchBar} from './styles'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const ContactsSidebar = (props) => {
  return (
    <SidebarContainer>
      <SearchBar>
        <input type="text" placeholder="Search Contacts" />
      </SearchBar>
      {props.children}
    </SidebarContainer>
  )
}

export default ContactsSidebar