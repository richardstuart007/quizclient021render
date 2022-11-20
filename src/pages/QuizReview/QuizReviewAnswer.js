//
//  Libraries
//
import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { green, red } from 'material-ui-colors'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function QuizAnswer(props) {
  //
  // Deconstruct Props
  //
  const { answer, AnswerNum, FieldNum } = props
  if (debugLog) console.log(answer, AnswerNum, FieldNum)
  if (debugLog) console.log('answer ', answer)
  if (debugLog) console.log('AnswerNum ', AnswerNum)
  if (debugLog) console.log('FieldNum ', FieldNum)
  //
  //  Set Colour
  //
  //  .... Default white
  let backgroundColor = 'white'
  //  .... Correct Answer
  if (FieldNum === 1) backgroundColor = green.A100
  //  .... Bad Answer
  else if (AnswerNum === FieldNum) backgroundColor = red.A100
  //.............................................................................
  return (
    <>
      <Card
        elevation={1}
        sx={{ mt: 2, maxWidth: 600 }}
        style={{ backgroundColor: backgroundColor }}
      >
        <CardActionArea>
          <CardContent sx={{ padding: '4px' }}>
            <Typography variant='body2' color='textSecondary'>
              {answer}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}
