//
//  Libraries
//
import { Paper, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function QuizSplash({ handlePage }) {
  if (debugLog) console.log('Start QuizSplash')
  //
  //  Screen Width
  //
  const ScreenSmall = JSON.parse(sessionStorage.getItem('App_Settings_ScreenSmall'))
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Paper
        sx={{
          margin: 3,
          padding: 1,
          maxWidth: 350,
          backgroundColor: 'whitesmoke',
          elevation: 12
        }}
      >
        <Grid
          container
          spacing={1}
          justify='center'
          alignItems='center'
          direction='column'
          style={{ minheight: '100vh' }}
        >
          {/*.................................................................................................*/}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant='h6' style={{ color: 'blue' }}>
              Splash Information
            </Typography>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Typography variant='subtitle2'>Developed by Richard Stuart</Typography>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Typography variant='subtitle2' sx={{ color: 'red' }}>
              Email: richardstuart007@hotmail.com
            </Typography>
          </Grid>
          {/*.................................................................................................*/}
          {ScreenSmall ? (
            <Grid item xs={12}>
              <Typography variant='subtitle2' sx={{ color: 'blue', backgroundColor: 'yellow' }}>
                Restricted Functionality on a SMALL screen
              </Typography>
            </Grid>
          ) : null}
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Typography variant='subtitle2'>Click below to REGISTER/SIGNIN</Typography>
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <MyButton
              type='submit'
              text='Continue'
              value='Submit'
              onClick={() => {
                handlePage('QuizSignin')
              }}
            />
          </Grid>
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            <Typography variant='subtitle2' sx={{ marginTop: '8px', color: 'green' }}>
              <a href='https://quizclient021renderstatic.onrender.com/'>Old Static Version</a>
            </Typography>
          </Grid>
          {/*.................................................................................................*/}
        </Grid>
      </Paper>
    </>
  )
}
