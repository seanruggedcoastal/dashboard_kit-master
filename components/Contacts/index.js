import React from 'react'

import {TabPanel, TabList, Tab, resetIdCounter } from 'react-tabs';
import {Container, MainContainer, SidebarImage} from './styles'
import SingleContact from './Single'
import Sidebar from './Sidebar'
resetIdCounter();



const Contacts = (props) => {
  const initialState = {
    contacts: props.contacts ? props.contacts : []
  }
  
  const Store = React.createContext(initialState)
  const useStore = () => React.useContext(Store)
  
  const reducer = (state, action) => {
    switch(action.type) {
      case "GET_CONTACTS":
        return { ...state, contacts: [...action.payload]}
      case "DELETE_CONTACT":
        const contactIndex = state.contacts.findIndex(v => v.id === action.payload.id)
        if(contactIndex === -1) return state;
        const _contacts = [...state.contacts]
        _contacts.splice(contactIndex, 1)
        return {...state, contacts: [..._contacts]}
      default:
        return state;
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    return dispatch({
      type: "GET_CONTACTS",
      payload: props.contacts
    })
  }, [])

  const deleteContact = (contact) => {
    return dispatch({
      type: 'DELETE_CONTACT',
      payload: contact
    })
  }

  return (
    <Store.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      <Container>
        <Sidebar>
          <TabList>
            {state.contacts.map((contact, i) => {
              return (
                <Tab key={i}><SidebarImage image={contact.image} /><span>{contact.name}</span></Tab>
              )
            })}
          </TabList>
        </Sidebar>
        <MainContainer>
          {state.contacts.map((contact, i) => {
              return (
                <TabPanel key={i}>
                  <SingleContact contact={contact} deleteContact={deleteContact}/>
                </TabPanel>
              )
          })}
        </MainContainer>
      </Container>
    </Store.Provider>
  )
}


export default Contacts
