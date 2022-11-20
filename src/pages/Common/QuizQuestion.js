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
//  Components
//
import MyButton from '../../components/controls/MyButton'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function QuizQuestion(params) {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Deconstruct params
  //
  const { quizRow, quizQuestion, quizTotal = 0 } = params
  //
  //  Deconstruct row
  //
  if (debugLog) console.log('quizRow ', quizRow)
  const { qid, qkey, qdetail } = quizRow
  let hyperLink
  qdetail.substring(0, 8) === 'https://' ? (hyperLink = true) : (hyperLink = false)
  if (debugLog) console.log('hyperLink ', hyperLink)
  //
  //  Hyperlink open
  //
  const openTab = hyperlink => () => {
    if (debugLog) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //
  //  Question string
  //
  const QuestionString = `Question ${quizQuestion}/${quizTotal} (KEY: ${qkey} ID: ${qid})`
  //
  //  Uppercase the question
  //
  const qdetailUpper = qdetail.toUpperCase()
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      {/* .......................................................................................... */}
      {/* Question number and ID */}
      {/* .......................................................................................... */}
      <Typography variant='subtitle2' style={{ color: teal['A700'] }} sx={{ marginTop: '8px' }}>
        {QuestionString}
      </Typography>
      {/* .......................................................................................... */}
      {/* Hyperlink Button */}
      {/* .......................................................................................... */}
      {hyperLink && (
        <MyButton
          onClick={openTab(qdetail)}
          type='submit'
          style={{ color: 'white' }}
          size='small'
          text='Click to view the Question'
        ></MyButton>
      )}
      {/* .......................................................................................... */}
      {/* Normal Text */}
      {/* .......................................................................................... */}
      {!hyperLink && (
        <Typography
          variant='body2'
          style={{ color: 'blue' }}
          sx={{ marginTop: '8px' }}
          gutterBottom
        >
          {qdetailUpper}
        </Typography>
      )}
      {/* .......................................................................................... */}
    </>
  )
}
