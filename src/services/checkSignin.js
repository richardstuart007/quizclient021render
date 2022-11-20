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
  const { sqlCaller, email, password } = props
  let sqlClient = `${functionName}/${sqlCaller}`
  //
  //  Get the URL
  //
  const App_Settings_URL = JSON.parse(sessionStorage.getItem('App_Settings_URL'))
  if (debugLog) console.log('App_Settings_URL ', App_Settings_URL)
  //
  // Fetch the data
  //
  const promise = fetchItems()
  //
  // Return promise
  //
  return promise
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
        email: email,
        password: password
      }
      const URL = App_Settings_URL + URL_SIGNIN
      if (debugLog) console.log('URL ', URL)
      //
      //  SQL database
      //
      let resultData = []
      resultData = await apiAxios(method, URL, body)
      //
      // No data
      //
      if (!resultData || !resultData[0]) {
        console.log(`No data received: sqlClient(${sqlClient}) Email(${email}) Table(userspwd)`)
        return []
      }
      //
      // Return data
      //
      if (debugLog) console.log('Return Data', resultData)
      return resultData[0]
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
