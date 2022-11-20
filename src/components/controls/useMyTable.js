//
//  Libraries
//
import { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(1),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(0.5)
    },
    '& tbody td': {
      fontWeight: '300',
      padding: theme.spacing(0.5)
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer'
    }
  }
}))
//
// Debug Settings
//
const debugLog = debugSettings()
//=====================================================================================
export default function useMyTable(records, headCells, filterFn, startPage0, setStartPage0) {
  if (debugLog) console.log('Start Function:  useMyTable')
  if (debugLog) console.log('records ', records)
  if (debugLog) console.log('headCells ', headCells)
  if (debugLog) console.log('startPage0 ', startPage0)
  //
  //  Styles
  //
  const classes = useStyles()
  //
  //  State
  //
  const pages = [10, 100, 200]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()
  //
  //  Start at Page 0
  //
  if (startPage0) {
    if (debugLog) console.log('setPage(0) ')
    setPage(0)
    setStartPage0(false)
    if (debugLog) console.log('setStartPage0(false) ')
  }
  //.....................................................................................
  //. Table Container
  //.....................................................................................
  const TblContainer = props => <Table className={classes.table}>{props.children}</Table>
  //.....................................................................................
  //. Table Header
  //.....................................................................................
  const TblHead = props => {
    //
    //  Sort
    //
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)
    }
    //
    //  Table Header Row
    //
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(headCell.id)
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }
  //.....................................................................................
  //.  Change Page
  //.....................................................................................
  const handleChangePage = (event, newPage) => {
    if (debugLog) console.log('handleChangePage ')
    setPage(newPage)
  }
  //.....................................................................................
  //.  Change Rows per page
  //.....................................................................................
  const handleChangeRowsPerPage = event => {
    if (debugLog) console.log('Start Function: handleChangeRowsPerPage ')
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  //.....................................................................................
  //.  Pagination
  //.....................................................................................
  const TblPagination = () => (
    <TablePagination
      component='div'
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage='RPP'
    />
  )
  //.....................................................................................
  //.  Sort Functions
  //.....................................................................................
  function stableSort(array, comparator) {
    if (debugLog) console.log('Start Function: stableSort ')
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  //.....................................................................................
  //.  Filter, Slice a page, sort
  //.....................................................................................
  const recordsAfterPagingAndSorting = () => {
    if (debugLog) console.log('Start Function: recordsAfterPagingAndSorting ')
    return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    )
  }
  //.....................................................................................
  //.  Return Values
  //.....................................................................................
  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  }
}
