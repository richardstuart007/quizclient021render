//
//  Libraries
//
import { useState, useEffect } from 'react'
import { Paper, Grid, Typography } from '@mui/material'
//
//  Utilities
//
import QuizSigninInit from './QuizSigninInit'
import checkSignin from '../../services/checkSignin'

//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'QuizSignin'
//
//  Initial Values
//
const initialFValues = {
  user: '',
  password: ''
}
//
let ALLReceived
//...................................................................................
//.  Main Line
//...................................................................................
export default function QuizSignin({ handlePage }) {
  if (debugFunStart) console.log('QuizSignin')
  //
  //  Get User (Previous, if any)
  //
  const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
  if (User_Settings_User) initialFValues.user = User_Settings_User.u_user
  //
  //  Load Data Options
  //
  useEffect(() => {
    GetBuildOptions()
    // eslint-disable-next-line
  }, [])
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //
  //  Interface to Form
  //
  const { values, errors, setErrors, handleInputChange } = useMyForm(initialFValues, true, validate)
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  function validate(fieldValues = values) {
    if (debugFunStart) console.log('validate')
    let temp = { ...errors }
    //
    //  user
    //
    if ('user' in fieldValues) {
      temp.user = fieldValues.user.length !== 0 ? '' : 'This field is required.'
    }
    //
    //  password
    //
    if ('password' in fieldValues) {
      temp.password = fieldValues.password.length !== 0 ? '' : 'This field is required.'
    }
    //
    //  Set the errors
    //
    setErrors({
      ...temp
    })

    if (fieldValues === values) return Object.values(temp).every(x => x === '')
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  function FormSubmit(e) {
    if (debugFunStart) console.log('FormSubmit')
    if (validate()) {
      FormUpdate()
    }
  }
  //...................................................................................
  //.  Update
  //...................................................................................
  function FormUpdate() {
    if (debugFunStart) console.log('FormUpdate')
    //
    //  Deconstruct values
    //
    const { user, password } = values
    setForm_message('Validating')
    //
    //  Process promise
    //
    const params = {
      sqlCaller: debugModule,
      user: user,
      password: password
    }
    const myPromiseSignin = checkSignin(params)
    //
    //  Resolve Status
    //
    myPromiseSignin.then(function (rtnObj) {
      if (debugLog) console.log('rtnObj ', rtnObj)
      //
      //  Valid ?
      //
      const rtnValue = rtnObj.rtnValue
      if (debugLog) console.log('rtnValue ', rtnValue)
      if (rtnValue) {
        const Usersrow = rtnObj.rtnRows[0]
        if (debugLog) console.log('Usersrow ', Usersrow)
        setForm_message('Signin being processed')
        ProcessSignIn(Usersrow)
      } else {
        //
        //  Error
        //
        let message
        rtnObj.rtnCatch ? (message = rtnObj.rtnCatchMsg) : (message = rtnObj.rtnMessage)
        if (debugLog) console.log(message)
        setForm_message(message)
      }
      return
    })
    return myPromiseSignin
  }
  //...................................................................................
  //.  Process User Signin
  //...................................................................................
  function ProcessSignIn(user) {
    if (debugFunStart) console.log('ProcessSignIn')
    //
    //  All received ?
    //
    ALLReceived = JSON.parse(sessionStorage.getItem('Data_Options_ALL_Received'))
    if (debugFunStart) console.log('ALLReceived ', ALLReceived)
    //
    //  Not all data received - error
    //
    if (!ALLReceived) {
      setForm_message('Unable to load ALL Options - Error')
      return
    }
    //
    //  User Info
    //
    sessionStorage.setItem('User_Settings_User', JSON.stringify(user))
    sessionStorage.setItem('User_Settings_UserAdmin', JSON.stringify(user.u_admin))
    sessionStorage.setItem('User_Settings_UserSwitch', JSON.stringify(false))
    //
    //  Signed In
    //
    sessionStorage.setItem('User_Settings_SignedIn', true)
    //
    //  Start Page
    //
    handlePage('PAGESTART')
  }
  //...................................................................................
  //.  Data Options
  //...................................................................................
  function GetBuildOptions() {
    if (debugFunStart) console.log('GetBuildOptions')
    //
    //  Data Options already exist - return
    //
    ALLReceived = JSON.parse(sessionStorage.getItem('Data_Options_ALL_Received'))
    if (debugFunStart) console.log('ALLReceived ALREADY', ALLReceived)
    if (ALLReceived) return

    //
    //  Get the Selection Options
    //
    QuizSigninInit()
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm>
        <Paper
          sx={{
            margin: 1,
            padding: 1,
            maxWidth: 400,
            backgroundColor: 'whitesmoke'
          }}
        >
          <Grid container spacing={1} justify='center' alignItems='center' direction='column'>
            {/*.................................................................................................*/}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant='h6' style={{ color: 'blue' }}>
                SignIn Page
              </Typography>
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='user'
                label='Registered user'
                value={values.user}
                onChange={handleInputChange}
                error={errors.user}
                sx={{ minWidth: '300px' }}
              />
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='password'
                label='password'
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
                sx={{ minWidth: '300px' }}
              />
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <Typography style={{ color: 'red' }}>{form_message}</Typography>
            </Grid>

            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyButton
                text='SignIn'
                onClick={() => {
                  FormSubmit()
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        {/*.................................................................................................*/}
        <Grid item xs={12}>
          <MyButton
            color='warning'
            onClick={() => {
              handlePage('QuizRegister')
            }}
            text='Register'
          />
        </Grid>
        {/*.................................................................................................*/}
      </MyForm>
    </>
  )
}
