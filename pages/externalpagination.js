import React from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {ExternalPaginate} from '../components/Pagination'



const Pagination = (props) => {

  const [paginationState, setPaginationState] = React.useState({
    pageOfItems: props.items,
    items: props.items
  })

  const [paginateState, setPaginateState] = React.useState({
    totalItems: props.meta.total_objects,
    totalPages: props.meta.total_pages
  })

  const [curPage, setCurPage] = React.useState(1)

  const paginateChange = async (page) => {


    if (page == 0) {
      page = 1
    } else {
      setCurPage(page)

      const res = await axios.get(`https://reqres.in/api/users?page=${page}`)

      const totalItems = res.data.total
      const totalPages = res.data.total_pages

      setPaginationState({ items:res.data.data, pageOfItems: res.data.data })
      setPaginateState({ totalItems: totalItems, totalPages: totalPages })
    }

  }


  return (
    <Layout>
      <p>Pagination</p>
      {paginationState.pageOfItems.map((item, i) =>
        <div key={i}>
          <p>{item.email}</p>
        </div>
      )}

      <ExternalPaginate
        totalItems={paginateState.totalItems}
        totalPages={paginateState.totalPages}
        curPage = {curPage}
        paginateChange={(e) => paginateChange(e)}
      />

    </Layout>
  )


}

Pagination.getInitialProps = async () => {

  const req = await axios.get(`https://reqres.in/api/users?page=1`)


  return {
    meta: {
      total_objects: req.data.total,
      total_pages: req.data.total_pages
    },
    items: req.data.data
  }
}


export default Pagination