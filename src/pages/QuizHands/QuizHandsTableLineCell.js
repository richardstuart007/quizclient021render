import TableCell from '@mui/material/TableCell'
//
//  Libraries
//
import { Typography, Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//...................................................................................
//.  Main Line
//...................................................................................
const QuizHandsTableLineCell = props => {
  if (debugLog) console.log('props ', props)
  //
  //  Destructure props
  //
  const { cell, cellValue } = props
  if (debugLog) console.log('cell ', cell)
  if (debugLog) console.log('cellValue ', cellValue)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      {/* .......................................................................................... */}
      {/*  Suit                                                                               */}
      {/* .......................................................................................... */}
      <TableCell key={cell} sx={{ padding: '0px' }}>
        <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
          <Grid item>
            <Typography variant='body2'>{cellValue}</Typography>
          </Grid>

          {/* .......................................................................................... */}
        </Grid>
      </TableCell>
      {/* .......................................................................................... */}
    </>
  )
}

export default QuizHandsTableLineCell
