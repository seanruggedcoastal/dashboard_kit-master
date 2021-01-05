import React, { Component } from 'react';
import Button from '../Button'
import {MetaContainer, SingleSection, ProfileImage, ContactDetails, ActionContainer} from './styles'
import {X, Pencil} from '../Icons'




const SingleContact = (props) => {
  return (
    <MetaContainer>
      <ActionContainer>
        <Button><Pencil /></Button>
        <Button onClick={() => props.deleteContact(props.contact)}><X /></Button>
      </ActionContainer>

        <SingleSection>
          <div>
            <ProfileImage image={props.contact.image} />
          </div>
          <div>
            <h3>{props.contact.name}</h3>
            <p>Added: 15/04/2019</p>
          </div>
        </SingleSection>

        <ContactDetails>

            <div><span>Phone:</span> {props.contact.phone}</div>
            <div><span>Email:</span> {props.contact.email}</div>
            <div><span>Company:</span> {props.contact.company}</div>
            <div className="notes"><span>Notes:</span> {props.contact.notes}</div>

        </ContactDetails>

      
    </MetaContainer>
  );
}


export default SingleContact;
