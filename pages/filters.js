import React from 'react'
import Layout from '~/Layout'
import Filter from '~/Filters'

const Filters = () => {

  return (
    <Layout>
      <p>Filters</p>
      <Filter 
        items={[
          {title: 'item 1', type: 'beginner'},
          {title: 'item 2', type: 'beginner'},
          {title: 'item 3', type: 'advanced'}
        ]}
        filters={[
          'Beginner',
          'Advanced'
        ]}
      />
    </Layout>
  )
}

export default Filters