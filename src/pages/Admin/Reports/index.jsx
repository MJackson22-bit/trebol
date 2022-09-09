import useSWR from 'swr'
import { useState, useEffect, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  createColumnHelper,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table'

import {
  rankItem,
  compareItems
} from '@tanstack/match-sorter-utils'



const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function () {
  const { data: response, error, isloading } = useSWR('http://localhost:8000/api/Sale/Facturas/AllSales', fetcher)
  // const rerender = useReducer(() => ({}), {})[1]
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  if (isloading) {
    return <div>loading</div>
  }

  if (error) {
    return <div>error</div>
  }
  console.log(response?.data)


    const columnHelper = createColumnHelper()

  const columns = [
  columnHelper.accessor('Fecha', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('Hora', {
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Hora</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('Juego', {
    header: () => 'Juego',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  }),
  columnHelper.accessor('Sorteo', {
    header: () => <span>Sorteo</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('Sucursal', {
    header: 'Sucursal',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('Total', {
    header: 'Total',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('Usuario', {
    id: 'Usuario',
    header: 'Usuario',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('codigo', {
    header: 'codigo',
    footer: info => info.column.id,
  }),
]
  const table = useReactTable({
    data: response?.data ?? [],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false
  })


  useEffect(() => {
    if (table.getState().columnFilters[6]?.id === 'Usuario') {
      if (table.getState().sorting[6]?.id !== 'Usuario') {
        table.setSorting([{ id: 'Usuario', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  console.log(table.getHeaderGroups())

  return (
    <div>
      <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>

      <table className="table table-dark">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler()
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽'
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                          {header.column.getCanFilter()
                            ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            )
                            : null}
                        </>
                      )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function Filter ({
  column,
  table
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number'
    ? (
      <div>
        <div className="flex space-x-2">
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue)?.[0] ?? ''}
            onChange={value =>
              column.setFilterValue((old) => [value, old?.[1]])
            }
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue)?.[1] ?? ''}
            onChange={value =>
              column.setFilterValue((old) => [old?.[0], value])
            }
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
    )
    : (
      <>
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.slice(0, 5000).map((value) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? '')}
          onChange={value => column.setFilterValue(value)}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          className="w-36 border shadow rounded"
          list={column.id + 'list'}
        />
        <div className="h-1" />
      </>
    )
}

function DebouncedInput ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}
