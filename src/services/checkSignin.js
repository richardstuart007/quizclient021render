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
const functionName = 'checkSignin'
const { URL_SIGNIN } = require('./constants.js')
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
export default async function checkSignin(props) {
  if (debugLog) console.log('Start checkSignin')
  if (debugLog) console.log('props ', props)
  //
  //  Deconstruct props
  //
  const { sqlCaller, user, password } = props
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
        password: password
      }
      const URL = App_Settings_URL + URL_SIGNIN
      if (debugLog) console.log('URL ', URL)
      //
      //  SQL database
      //
      const rtnObj = await apiAxios(method, URL, body)
      if (debugLog) console.log('rtnObj ', rtnObj)
      return rtnObj
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
