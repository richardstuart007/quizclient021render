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
const QuizPanel = ({ quizRow, handleSelect }) => {
  if (debugLog) console.log('Start QuizPanel')
  //
  //  Deconstruct row
  //
  if (debugLog) console.log('quizRow ', quizRow)
  const { qcorrect, qbad1, qbad2, qbad3 } = quizRow
  //
  //  Answers array
  //
  let Answers = []
  let j = 0
  loadAnswers(qcorrect)
  loadAnswers(qbad1)
  loadAnswers(qbad2)
  loadAnswers(qbad3)
  //
  //  Load Answers array with answer element
  //
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
  //
  //  Sort the Answers by the random sort id
  //
  Answers.sort((a, b) => (a.random > b.random ? 1 : -1))
  if (debugLog) console.log(Answers)
  //...................................................................................
  //  Format Panel
  //...................................................................................
  return (
    <>
      <Typography variant='subtitle2' style={{ color: teal['A700'] }} sx={{ marginTop: '16px' }}>
        CLICK on your answer below
      </Typography>
      {Answers.map((answer, key) => (
        <QuizPanelCard key={key} answer={answer} handleSelect={handleSelect} />
      ))}
    </>
  )
}

export default QuizPanel
