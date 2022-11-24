//
//  Libraries
//
import { Typography } from '@mui/material'
import { teal } from 'material-ui-colors'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizPanelCard from './QuizPanelCard'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function QuizPanel({ qid, handleSelect }) {
  if (debugLog) console.log('Start QuizPanel')
  //
  //  Get Choices
  //
  const Data_Qchoices = JSON.parse(sessionStorage.getItem('Data_Qchoices'))
  //
  //  Find the HandsRow for this ID
  //
  let row = Data_Qchoices.find(element => element.qcid === qid)
  //
  //  Answers array
  //
  let Answers = []
  let j = 0
  for (let i = 0; i < row.qcans.length; i++) {
    let answer = row.qcans[i]
    loadAnswers(answer)
  }
  //
  //  Sort the Answers by the random sort id
  //
  Answers.sort((a, b) => (a.random > b.random ? 1 : -1))
  if (debugLog) console.log(Answers)
  //...................................................................................
  //  Load Answers array with answer element
  //...................................................................................
  function loadAnswers(answer) {
    if (answer) {
      j++
      const ansObj = {
        random: Math.random(),
        id: j,
        details: answer
      }
      Answers.push(ansObj)
    }
  }
  //...................................................................................
  //  Format Panel
  //...................................................................................
  return (
    <>
      <Typography variant='subtitle2' style={{ color: teal['A700'] }} sx={{ marginTop: '16px' }}>
        CLICK on your answer below
      </Typography>
      {Answers.map((answer, id) => (
        <QuizPanelCard key={id} answer={answer} handleSelect={handleSelect} />
      ))}
    </>
  )
}
