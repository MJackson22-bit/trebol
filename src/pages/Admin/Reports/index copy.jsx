import useSWR from 'swr'
import DataTable from 'react-data-table-component'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function () {
  const { data: response, error, isloading } = useSWR('http://localhost:8000/api/Sale/Facturas/AllSales', fetcher)

  if (isloading) {
    return <div>loading</div>
  }

  if (error) {
    return <div>error</div>
  }

  const columns = Object
    .keys(response?.data[0] ?? {})
    .map((key) => ({
      name: key,
      selector: row => row[key],
      sortable: true
    }))

  return (
    <DataTable
      columns={columns}
      data={response?.data ?? []}
      direction="auto"
      fixedHeaderScrollHeight="1000px"
      pagination
      paginationPerPage={15}
      responsive
    />
  )
}
