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
import MyQueryPromise from '../../services/MyQueryPromise'
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
  email: '',
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
  //  Get User
  //
  const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
  if (debugLog) console.log('User_Settings_User ', User_Settings_User)
  if (User_Settings_User) initialFValues.email = User_Settings_User.u_email
  if (debugLog) console.log('initialFValues ', initialFValues)
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
    //  email
    //
    if ('email' in fieldValues) {
      temp.email = validateEmail(fieldValues.email) ? '' : 'Email is not a valid format'
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
  function validateEmail(email) {
    if (debugFunStart) console.log('validateEmail')
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
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
    const { email, password } = values
    setForm_message('Validating')
    //
    //  Process promise
    //
    const params = {
      sqlCaller: debugModule,
      email: email,
      password: password
    }
    const myPromiseSignin = MyQueryPromise(checkSignin(params))
    //
    //  Resolve Status
    //
    myPromiseSignin.then(function (user) {
      if (debugLog) console.log('user ', user)
      if (user.u_id) {
        setForm_message('Signin being processed')
        ProcessSignIn(user)
      } else {
        setForm_message('KEEP TRYING (else REGISTER first)')
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
    //  Initialise storage status
    //
    sessionStorage.setItem('Data_Options_Owner_Received', false)
    sessionStorage.setItem('Data_Options_Group1Owner_Received', false)
    sessionStorage.setItem('Data_Options_Group2_Received', false)
    sessionStorage.setItem('Data_Options_Group3_Received', false)
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
          <Grid
            container
            spacing={1}
            justify='center'
            alignItems='center'
            direction='column'
            // style={{ minheight: '100vh' }}
          >
            {/*.................................................................................................*/}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant='h6' style={{ color: 'blue' }}>
                SignIn Page
              </Typography>
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MyInput
                name='email'
                label='email'
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
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
