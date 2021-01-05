import React from 'react'
import Layout from '../components/Layout'

import {LocalPaginate} from '../components/Pagination'


const createArrayInitialArray = () => {
  return [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
}

const Pagination = () => {
  const arrayRef = React.useRef(createArrayInitialArray());

  const [paginationState, setPaginationState] = React.useState({
    pageOfItems: [],
    items: arrayRef.current
  })



  const onPageChange = async (page, pageOfItems) => {
      // update state with new page of items
      setPaginationState({...paginationState, pageOfItems: pageOfItems})
  }


  return (
    <Layout>
      <p>Pagination</p>

      {paginationState.pageOfItems.map(item =>
        <div key={item.id}>{item.name}</div>
      )}

      <LocalPaginate 
        data={paginationState.items}
        limitItems={10}
        onPageChange={onPageChange}
      />

    </Layout>
  )


}


export default Pagination