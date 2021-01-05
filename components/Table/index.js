import React from 'react'
import styled from 'styled-components'
import {LocalPaginate} from '~/Pagination'

const TableContainer = styled.div`
  overflow: auto;
`

const TableWrapper = styled.table`
  table-layout: auto;
  border-collapse: collapse;
  border-left: 1px solid ${props => props.theme.border};
  border-right: 1px solid ${props => props.theme.border};
  border-top: 1px solid ${props => props.theme.border};
`

const TableHeader = styled.thead`
  background: ${props => props.theme.foreground};
  color: ${props => props.theme.normalText};

  tr {
    th {
      padding: 0.5rem 1rem;
      font-weight: bold;
      display: table-cell;
    }
  }
`

const TableBody = styled.tbody`
  color: ${props => props.theme.normalText};
  background: ${props => props.theme.foreground};
  
  tr {
    td {
      padding: 0.5rem 1rem;
      border: 1px solid #e2e8f0;
      display: table-cell;
    }
  }
`




const Table = (props) => {
  const [dataHeaders, setDataHeaders] = React.useState([])
  const [data, setData] = React.useState()
  const [paginationState, setPaginationState] = React.useState({
    pageOfItems: [],
    items: props.data
  })



  const getHeaders = async () => {
    let headers = []

    await props.data.map((item, i) => {
      Object.keys(item).map((value) => {
        if(!headers.includes(value)) {
          headers = [...headers, value]
        }
      })
    })

    setDataHeaders([...headers])
  }

  const onPageChange = async (page, pageOfItems) => {
    // update state with new page of items
    setPaginationState({...paginationState, pageOfItems: pageOfItems})
  }


  React.useEffect(() => {
    getHeaders()

  }, [])

  return (
    <>
    <TableContainer>

    <TableWrapper>
      <TableHeader>
        <tr>
          {dataHeaders && dataHeaders.length && dataHeaders.map((header,i) => {
            return <th key={i}>{header}</th>
          })}
        </tr>
      </TableHeader>

      {paginationState.pageOfItems.length && paginationState.pageOfItems.map((dataItem, i) => {
        return <TableBody key={i}>
          <tr>
          {Object.entries(dataItem).map((values, _i) => {
            let [key, value] = values
            return <td key={_i} className="item" data-head={`${key}`}>{typeof(value) !== 'object' ? value : JSON.stringify(value)}</td>
          })}
          </tr>

        </TableBody>
      })}



    </TableWrapper>
    </TableContainer>
    <LocalPaginate 
        data={paginationState.items}
        limitItems={10}
        onPageChange={onPageChange}
      />
    </>
  )
}

export default Table
