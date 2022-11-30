//
//  Utilities
//
import apiAxios from './../utilities/apiAxios'
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
export default async function registerUser(props) {
  if (debugLog) console.log('Start registerUser')
  if (debugLog) console.log('props ', props)
  //
  //  Deconstruct props
  //
  const {
    sqlCaller,
    user,
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
  const rtnObj = fetchItems()
  return rtnObj
  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  async function fetchItems() {
    try {
      //
      //  Setup actions
      //
      const method = 'post'
      let body = {
        sqlClient: sqlClient,
        user: user,
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
      const resultData = await apiAxios(method, URL, body)
      if (debugLog) console.log('resultData ', resultData)
      return resultData
      //
      // Errors
      //
    } catch (err) {
      console.log(err)
      return []
    }
  }
  //--------------------------------------------------------------------
}
