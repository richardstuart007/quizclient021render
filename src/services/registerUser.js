//
//  Utilities
//
import apiAxios from './apiAxios'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Constants
//
const functionName = 'registerUser'
const { URL_REGISTER } = require('./constants.js')
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//--------------------------------------------------------------------
//-  Main Line
//--------------------------------------------------------------------
export default async function registerUser(props, { setForm_message }) {
  if (debugLog) console.log('Start registerUser')
  if (debugLog) console.log('props ', props)
  //
  //  Deconstruct props
  //
  const {
    sqlCaller,
    email,
    password,
    name,
    fedid,
    fedcountry,
    dftmaxquestions,
    dftowner,
    showprogress,
    showscore,
    sortquestions,
    skipcorrect,
    admin
  } = props
  let sqlClient = `${functionName}/${sqlCaller}`
  //
  //  Get the URL
  //
  const App_Settings_URL = JSON.parse(sessionStorage.getItem('App_Settings_URL'))
  if (debugLog) console.log('App_Settings_URL ', App_Settings_URL)
  //
  // Fetch the data
  //
  const promise = fetchItems({ setForm_message })
  //
  // Return promise
  //
  if (debugLog) console.log('Return Promise', promise)
  return promise
  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  async function fetchItems({ setForm_message }) {
    try {
      //
      //  Setup actions
      //
      const method = 'post'
      let body = {
        sqlClient: sqlClient,
        email: email,
        password: password,
        name: name,
        fedid: fedid,
        fedcountry: fedcountry,
        dftmaxquestions: dftmaxquestions,
        dftowner: dftowner,
        showprogress: showprogress,
        showscore: showscore,
        sortquestions: sortquestions,
        skipcorrect: skipcorrect,
        admin: admin
      }
      const URL = App_Settings_URL + URL_REGISTER
      if (debugLog) console.log('URL ', URL)
      //
      //  SQL database
      //
      const data = await apiAxios(method, URL, body)
      if (debugLog) console.log('Data ', data)
      //
      // No data
      //
      if (!data) {
        const message = data
        setForm_message('Error Registering Email')
        console.log(message)
        return null
      }
      //
      //  Data found
      //
      return data[0]
      //
      // Errors
      //
    } catch (err) {
      setForm_message('Error Registering Email')
      return null
    }
  }
  //--------------------------------------------------------------------
}
