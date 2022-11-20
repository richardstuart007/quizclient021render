import TableRow from '@mui/material/TableRow'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizHandsTableLineCell from './QuizHandsTableLineCell'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
const QuizHandsTableLine = props => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugLog) console.log('props ', props)
  //
  //  Destructure props
  //
  const { handObj, rowCount } = props
  if (debugLog) console.log('handObj ', handObj)
  if (debugLog) console.log('rowCount ', rowCount)

  const { position, hand } = handObj
  if (debugLog) console.log('position ', position)
  if (debugLog) console.log('hand ', hand)
  //
  //  Strip 'n' and replace with null
  //
  for (let i = 0; i < 4; i++) {
    if (hand[i] === 'n' || hand[i] === 'N') hand[i] = null
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <TableRow key={rowCount}>
      <QuizHandsTableLineCell cell='position' cellValue={position} />
      <QuizHandsTableLineCell cell='spades' cellValue={hand[0]} />
      <QuizHandsTableLineCell cell='hearts' cellValue={hand[1]} />
      <QuizHandsTableLineCell cell='diamonds' cellValue={hand[2]} />
      <QuizHandsTableLineCell cell='clubs' cellValue={hand[3]} />
    </TableRow>
  )
}

export default QuizHandsTableLine
