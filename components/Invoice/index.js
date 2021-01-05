import React, { Component } from 'react';
import { 
  InvoiceMetaContainer, 
  InvoiceHeaderContainer, 
  InvoiceMeta,
  InvoiceLineItemContainer,
  InvoiceLineItemHeader,
  InvoiceLineItem 
} from './styles';
import Tag from '../Tag'

const SingleInvoice = ({invoice}) => {

  const calcTotal = () => {
    return invoice.items.reduce((a, b) => {
      const accumulator = ((b.hours * b.rate) + (b.hours * b.rate) * (invoice.tax.percent/100))

      if(typeof a !== 'undefined') {
        a += accumulator
        return a
      }

    }, 0)
  }

  const calcSubTotal = () => {
    return invoice.items.reduce((a, b) => {
      const accumulator = (b.hours * b.rate)

      if(typeof a !== 'undefined') {
        a += accumulator
        return a
      }

    }, 0)
  }

  const calcTax = () => {
    return invoice.items.reduce((a, b) => {
      const accumulator = (b.hours * b.rate) * (invoice.tax.percent/100)

      if(typeof a !== 'undefined') {
        a += accumulator
        return a
      }

    }, 0)
  }

  const createTag = () => {
    switch(invoice.status) {
      case "Sent":
        return "info"
      case "Pending":
        return "alert"
      case "Paid":
        return "success"
      default:
        return
    }
  }


  return (
    <>
      <InvoiceHeaderContainer>
        <h3>{invoice.title}</h3>
        <p><Tag type={createTag()}>{invoice.status}</Tag></p>
      </InvoiceHeaderContainer>
      <InvoiceMetaContainer>
        <InvoiceMeta>
          <label>Customer Name</label>
          <input type="text" placeholder="Customer Name" />
        </InvoiceMeta>
        <InvoiceMeta>
          <label>Customer Email</label>
          <input type="text" placeholder="Customer Email" />
        </InvoiceMeta>
        <InvoiceMeta>
          <label>Billing Address</label>
          <textarea placeholder="Billing Address" />
        </InvoiceMeta>
        <InvoiceMeta>
          <label>Terms</label>
          <input type="text" placeholder="Terms" />
        </InvoiceMeta>
        <InvoiceMeta>
          <label>Created At</label>
          <input type="date" />
        </InvoiceMeta>
        <InvoiceMeta>
          <label>Due Date</label>
          <input type="date" />
        </InvoiceMeta>
      </InvoiceMetaContainer>
      <InvoiceLineItemContainer>
        <table>
        <thead>
          <tr className="tabletitle">
            <td className="item"><p>Item Description</p></td>
            <td className="Hours"><p>Hours</p></td>
            <td className="Rate"><p>Rate</p></td>
            <td className="subtotal"><p>Sub-total</p></td>
          </tr>
        </thead>
        <tbody>

          {invoice.items.map((item, i) => {
            return (
              <tr key={i} className="service">
                <td className="tableitem"><p className="itemtext">{item.description}</p></td>
                <td className="tableitem"><p className="itemtext">{item.hours}</p></td>
                <td className="tableitem"><p className="itemtext">${item.rate}</p></td>
                <td className="tableitem"><p className="itemtext">${item.hours * item.rate}</p></td>
              </tr>
            )
          })}

        </tbody>
        <thead>
        <tr className="tabletitle">
          <td></td>
          <td></td>
          <td className="Rate"><p>Subtotal</p></td>
          <td className="payment"><p>${calcSubTotal()}</p></td>
        </tr>
        <tr className="tabletitle">
          <td></td>
          <td></td>
          <td className="Rate"><p>{invoice.tax.type}</p></td>
          <td className="payment"><p>${calcTax()}</p></td>
        </tr>
        <tr className="tabletitle">
          <td></td>
          <td></td>
          <td className="Rate"><h2>Total</h2></td>
          <td className="payment"><h2>${calcTotal()}</h2></td>
        </tr>
        </thead>
      </table>
      </InvoiceLineItemContainer>
    </>
  );
}


export default SingleInvoice;
