//
//  Libraries
//
import { TableBody, TableRow, TableCell, Grid } from '@mui/material'
import PreviewIcon from '@mui/icons-material/Preview'
//
//  Controls
//
import MyActionButton from '../../components/controls/MyActionButton'
import MyButton from '../../components/controls/MyButton'
import useMyTable from '../../components/controls/useMyTable'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Table Heading
//
const headCellsLarge = [
  { id: 'rid', label: 'ID' },
  { id: 'rdesc', label: 'Description' },
  { id: 'rwho', label: 'Who' },
  { id: 'rtype', label: 'Type' },
  { id: 'actions', label: 'View', disableSorting: true }
]
const headCellsSmall = [
  { id: 'rdesc', label: 'Description' },
  { id: 'actions', label: 'View', disableSorting: true }
]
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//=====================================================================================
export default function QuizRefs({ handlePage }) {
  if (debugLog) console.log('Start QuizRefs')
  //
  //  Screen Width
  //
  const ScreenSmall = JSON.parse(sessionStorage.getItem('App_Settings_ScreenSmall'))
  let headCells
  ScreenSmall ? (headCells = headCellsSmall) : (headCells = headCellsLarge)
  //
  //  Find reference link
  //
  let Data_Reflinks = []
  const Data_ReflinksJSON = sessionStorage.getItem('Data_Reflinks')
  if (Data_ReflinksJSON !== '') Data_Reflinks = JSON.parse(Data_ReflinksJSON)
  if (debugLog) console.log('Data_Reflinks ', Data_Reflinks)
  //
  //  build records from Refs & Links
  //
  let records = Data_Reflinks
  if (debugLog) console.log('records ', records)
  //.............................................................................
  //
  //  State
  //
  const filterFn = {
    fn: items => {
      return items
    }
  }
  //.............................................................................
  //
  //  Hyperlink open
  //
  const openHyperlink = hyperlink => {
    if (debugLog) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //...................................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useMyTable(
    records,
    headCells,
    filterFn
  )
  if (debugLog) console.log('recordsAfterPagingAndSorting ', recordsAfterPagingAndSorting)
  if (debugLog) console.log('records ', records)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map(row => (
            <TableRow key={row.rid}>
              {ScreenSmall ? null : <TableCell>{row.rid}</TableCell>}
              <TableCell>{row.rdesc}</TableCell>
              {ScreenSmall ? null : <TableCell>{row.rwho}</TableCell>}
              {ScreenSmall ? null : <TableCell>{row.rtype}</TableCell>}
              <TableCell>
                <MyActionButton
                  startIcon={<PreviewIcon fontSize='small' />}
                  text='View'
                  color='warning'
                  onClick={() => openHyperlink(row.rlink)}
                ></MyActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <MyButton
            text='Go Back'
            color='warning'
            onClick={() => {
              handlePage('PAGEBACK')
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}
