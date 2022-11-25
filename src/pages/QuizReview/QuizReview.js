//
//  Libraries
//
import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
//
//  Sub Components
//
import QuizReviewAnswers from './QuizReviewAnswers'
import QuizHands from '../QuizHands/QuizHands'
import QuizBidding from '../QuizBidding/QuizBidding'
//
//  Common Components
//
import QuizQuestion from '../Common/QuizQuestion'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//...................................................................................
//.  Main Line
//...................................................................................
export default function QuizReview({ handlePage }) {
  if (debugLog) console.log('Start QuizReview')
  //
  //  Counts
  //
  const [countPass, setCountPass] = useState(0)
  const [countAns, setCountAns] = useState(0)
  const [countReview, setCountReview] = useState(0)
  const [mark, setMark] = useState(0)
  const [quizRow, setQuizRow] = useState(null)
  //
  //  Arrays & Index
  //
  const [arrQuest, setArrQuest] = useState([])
  const [arrAns, setArrAns] = useState([])
  const [arrAnsNum, setArrAnsNum] = useState([])
  const [ansIdx, setAnsIdx] = useState(0)
  //
  //  Signed in User
  //
  const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
  //
  //  Load the data array from the store
  //
  useEffect(() => {
    firstLoad()
    // eslint-disable-next-line
  }, [])
  //
  //  Quiz Message
  //
  let nothingToReview = false
  let reviewMessage = `Result (${mark}%) ${countPass} out of ${countAns}.`
  //
  //  No Questions to review
  //
  if (!quizRow) {
    nothingToReview = true

    countAns === 0
      ? (reviewMessage = 'No questions answered, nothing to review')
      : (reviewMessage = `Result (${mark}%) ${countPass} out of ${countAns}.  WELL DONE!!`)
  }
  //
  //  Hide/Show Previous/Next Buttons
  //
  let hidePreviousButton
  ansIdx + 1 === 1 ? (hidePreviousButton = true) : (hidePreviousButton = false)
  let hideNextButton
  ansIdx + 1 === countReview ? (hideNextButton = true) : (hideNextButton = false)

  if (debugLog) console.log('quizRow ', quizRow)
  if (debugLog) console.log('ansIdx ', ansIdx)
  if (debugLog) console.log('arrAnsNum ', arrAnsNum)
  if (debugLog) console.log('arrAns ', arrAns)
  //...................................................................................
  //.  First time data received
  //...................................................................................
  const firstLoad = () => {
    if (debugLog) console.log('firstLoad ')
    //
    //  Initialise global variables
    //
    if (debugLog) console.log('Initialise global variables')
    //
    //  Get Store Values
    //
    const Data_Questions_Quiz = JSON.parse(sessionStorage.getItem('Data_Questions_Quiz'))
    const Data_Answers = JSON.parse(sessionStorage.getItem('Data_Answers'))
    //
    //  Questions
    //
    let ArrQuestions = []
    Data_Questions_Quiz.forEach(row => {
      const rowData = { ...row }
      ArrQuestions.push(rowData)
    })
    if (debugLog) console.log('ArrQuestions ', ArrQuestions)
    setArrQuest(ArrQuestions)
    //
    //  Answers
    //
    let Ans = []
    let AnsNum = []
    let AnsPass = 0
    let AnsCount = 0
    let AnsQuestIdx = -1
    let AnsReview = 0

    Data_Answers.forEach(id => {
      AnsCount++
      AnsQuestIdx++
      //
      //  Only show failed answers ?
      //
      const ReviewSkipPass = User_Settings_User.u_skipcorrect
      if (id !== 1 || !ReviewSkipPass) {
        Ans.push(id)
        AnsNum.push(AnsQuestIdx)
        AnsReview++
      }
      if (id === 1) AnsPass++
    })
    if (debugLog) console.log('AnsReview ', AnsReview)
    if (debugLog) console.log('AnsCount ', AnsCount)
    if (debugLog) console.log('AnsPass ', AnsPass)
    if (debugLog) console.log('Ans ', Ans)
    //
    //  Set State
    //
    setCountReview(AnsReview)
    setCountAns(AnsCount)
    setCountPass(AnsPass)
    setArrAns(Ans)
    setArrAnsNum(AnsNum)
    //
    //  Mark%
    //
    if (AnsCount > 0) setMark(Math.round((100 * AnsPass) / AnsCount))
    //
    //  Nothing to review
    //
    if (AnsReview === 0) return
    //
    // Start at Answer Row 0
    //
    const AnsIdx = 0
    setAnsIdx(AnsIdx)
    const QuizIdx = AnsNum[AnsIdx]
    setQuizRow(ArrQuestions[QuizIdx])
  }
  //...................................................................................
  //.  Next Question
  //...................................................................................
  const nextQuestion = () => {
    if (debugLog) console.log('nextQuestion ')
    if (debugLog) console.log('arrQuest ', arrQuest)
    if (debugLog) console.log('ansIdx ', ansIdx)
    if (debugLog) console.log('countReview ', countReview)
    //
    //  More rows
    //
    const AnsIdx = ansIdx + 1
    if (AnsIdx < countReview) {
      const QuizIdx = arrAnsNum[AnsIdx]
      setAnsIdx(AnsIdx)
      setQuizRow(arrQuest[QuizIdx])
    }
  }
  //...................................................................................
  //.  Previous Question
  //...................................................................................
  const handlePrevious = () => {
    if (debugLog) console.log('Previous Question ')
    //
    //  More rows
    //
    if (ansIdx > 0) {
      const AnsIdx = ansIdx - 1
      const QuizIdx = arrAnsNum[AnsIdx]
      setAnsIdx(AnsIdx)
      setQuizRow(arrQuest[QuizIdx])
    }
  }

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Box sx={{ mt: 2, maxWidth: 600 }}>
        <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
          {reviewMessage}
        </Typography>
      </Box>

      {nothingToReview ? null : (
        <QuizQuestion quizRow={quizRow} quizQuestion={arrAnsNum[ansIdx] + 1} quizTotal={countAns} />
      )}
      {nothingToReview ? null : <QuizBidding qid={quizRow.qid} />}
      {nothingToReview ? null : <QuizHands qid={quizRow.qid} />}
      {nothingToReview ? null : <QuizReviewAnswers quizRow={quizRow} AnswerNum={arrAns[ansIdx]} />}

      {/* .......................................................................................... */}
      <Box sx={{ mt: 2, maxWidth: 600 }}>
        {/*.................................................................................................*/}
        {nothingToReview || hideNextButton ? null : (
          <MyButton
            type='submit'
            text='Next'
            color='primary'
            variant='contained'
            onClick={() => nextQuestion()}
          />
        )}
        {/* .......................................................................................... */}
        {nothingToReview || hidePreviousButton ? null : (
          <MyButton
            type='submit'
            text='Previous'
            color='primary'
            variant='contained'
            onClick={() => handlePrevious()}
          />
        )}
        {/* .......................................................................................... */}
        <MyButton
          type='submit'
          text='ReStart'
          color='warning'
          variant='contained'
          sx={{ float: 'right' }}
          onClick={() => {
            handlePage('PAGESTART')
          }}
        />
        {/*.................................................................................................*/}
      </Box>
    </>
  )
}
