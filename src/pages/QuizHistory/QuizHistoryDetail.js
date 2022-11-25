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
import QuizReviewAnswers from '../QuizReview/QuizReviewAnswers'
import QuizHands from '../QuizHands/QuizHands'
import QuizBidding from '../QuizBidding/QuizBidding'
//
//  Common Components
//
import QuizQuestion from '../Common/QuizQuestion'
//
// Debug Settings
//
const debugLog = debugSettings()
//...................................................................................
//.  Main Line
//...................................................................................
export default function QuizHistoryDetail({ handlePage }) {
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
  if (debugLog) console.log('Start QuizHistoryDetail')
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
  //  No data to review
  //
  if (!quizRow) {
    if (debugLog) console.log('Waiting for data')
    if (countAns === 0) {
      return (
        <>
          <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
            Waiting for data
          </Typography>
        </>
      )
    } else {
      return (
        <>
          <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>
            Result ({mark}%) {countPass} out of {countAns}. WELL DONE !!
          </Typography>
        </>
      )
    }
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
  function firstLoad() {
    if (debugLog) console.log('firstLoad ')
    //
    //  Get Row Values
    //
    const row = JSON.parse(sessionStorage.getItem('Data_Hist_Row'))
    if (debugLog) console.log('Data_Hist_Row ', row)
    updateSelection(row)
  }
  //...................................................................................
  //.  Update Selection
  //...................................................................................
  function updateSelection(row) {
    if (debugLog) console.log('updateSelection')
    //
    //  Get Stored Data
    //
    const Data_Hist_Row_Join = JSON.parse(sessionStorage.getItem('Data_Hist_Row_Join'))
    if (debugLog) console.log('Data_Hist_Row_Join ', Data_Hist_Row_Join)

    const Data_Questions_Quiz = JSON.parse(sessionStorage.getItem('Data_Questions_Quiz'))
    const Hist_r_ans = row.r_ans
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

    Hist_r_ans.forEach(id => {
      AnsCount++
      AnsQuestIdx++
      //
      //  Only show failed answers ?
      //
      let ReviewSkipPass = User_Settings_User.u_skipcorrect
      //
      //  BUGS!
      //
      ReviewSkipPass = false
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
  function nextQuestion() {
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
  function handlePrevious() {
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
          Result ({mark}%) {countPass} out of {countAns}
        </Typography>
      </Box>
      <QuizQuestion quizRow={quizRow} quizQuestion={arrAnsNum[ansIdx] + 1} quizTotal={countAns} />
      <QuizBidding qid={quizRow.qid} />
      <QuizHands qid={quizRow.qid} />
      <QuizReviewAnswers quizRow={quizRow} AnswerNum={arrAns[ansIdx]} />

      <Box sx={{ mt: 2, maxWidth: 600 }}>
        {hideNextButton ? null : (
          <MyButton
            type='submit'
            text='Next'
            color='primary'
            variant='contained'
            onClick={() => nextQuestion()}
          />
        )}
        {/* .......................................................................................... */}
        {hidePreviousButton ? null : (
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
          text='Back'
          color='warning'
          variant='contained'
          sx={{ float: 'right' }}
          onClick={() => {
            handlePage('PAGEBACK')
          }}
        />
        {/* .......................................................................................... */}
      </Box>
    </>
  )
}
