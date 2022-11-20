//
//  Libraries
//
import { useState, useEffect } from 'react'
import { LinearProgress, Typography, Box } from '@mui/material'
import { teal } from 'material-ui-colors'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizLinearProgress = props => {
  const { count, total, text } = props
  //
  //  State
  //
  const [progress, setProgress] = useState(0)
  //
  //  Set active step
  //
  useEffect(() => {
    if (total > 0) setProgress(Math.round((100 * count) / total))
  }, [count, total])

  if (debugLog) console.log('count ', count)
  if (debugLog) console.log('total ', total)
  if (debugLog) console.log('progress ', progress)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Typography variant='subtitle2' style={{ color: teal['A700'] }} sx={{ marginTop: '8px' }}>
        {text}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1, maxWidth: 600 }}>
          <LinearProgress variant='determinate' value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant='body2' color='textSecondary'>{`${progress}%`}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default QuizLinearProgress
