import React from 'react'
import Layout from '~/Layout'
import Invoice from '~/Invoice'

const invoices = [
  {
    title: 'Invoice #1',
    status: 'Sent',
    currency: 'USD',
    items: [
      {
        description: 'Communication',
        hours: 5,
        rate: 75
      },
      {
        description: 'Asset Gathering',
        hours: 3,
        rate: 75
      },
      {
        description: 'Website',
        hours: 12,
        rate: 100
      }
    ],
    tax: {
      type: 'HST',
      percent: 13
    }
  },
  {
    title: 'Invoice #2',
    status: 'Paid',
    currency: 'USD',
    items: [
      {
        description: 'Communication',
        hours: 5,
        rate: 75
      },
      {
        description: 'Asset Gathering',
        hours: 3,
        rate: 75
      }
    ],
    tax: {
      type: 'HST',
      percent: 13
    }
  }
]

const Invoices = () => {
  return (
    <Layout>
      <Invoice invoice={invoices[0]}/>
    </Layout>
  )
}

export default Invoices