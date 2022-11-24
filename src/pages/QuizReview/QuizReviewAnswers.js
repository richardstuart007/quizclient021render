//
//  Libraries
//
import { Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizReviewAnswer from './QuizReviewAnswer'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizReviewAnswers = props => {
  if (debugLog) console.log('Start QuizReviewAnswers')
  //
  // Deconstruct Props
  //
  const { qid, AnswerNum } = props
  if (debugLog) console.log('qid ', qid)
  if (debugLog) console.log('AnswerNum ', AnswerNum)
  //
  //  Get Choices
  //
  const Data_Qchoices = JSON.parse(sessionStorage.getItem('Data_Qchoices'))
  //
  //  Find the HandsRow for this ID
  //
  let row = Data_Qchoices.find(element => element.qcid === qid)
  if (debugLog) console.log('row ', row)
  //
  //  Load answers to array
  //
  let Answers = row.qcans
  //
  //  Text - correct/incorrect
  //
  let correct
  AnswerNum === 1 ? (correct = true) : (correct = false)
  //...................................................................................
  //  Format Panel
  //...................................................................................
  return (
    <>
      {!correct ? (
        <Typography variant='subtitle2' style={{ color: 'red' }} sx={{ marginTop: '8px' }}>
          Incorrect(red). Correct(Green).
        </Typography>
      ) : null}

      {Answers.map((answer, key) => (
        <QuizReviewAnswer key={key} answer={answer} AnswerNum={AnswerNum} FieldNum={key + 1} />
      ))}
    </>
  )
}

export default QuizReviewAnswers
