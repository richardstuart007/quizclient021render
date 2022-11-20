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
const sqlClient = 'rowSelect'
const { URL_TABLES } = require('./constants.js')
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
export default async function rowSelect(props) {
  if (debugLog) console.log('Start rowSelect')
  //
  //  Deconstruct props
  //
  if (debugLog) console.log('props: ', props)
  const { sqlTable, sqlOrderBy, sqlWhere, sqlRows } = props
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
  if (debugLog) console.log('Return promise', promise)
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
      //
      //  sqlString
      //
      let sqlString = `* from ${sqlTable}`
      if (sqlWhere) sqlString = sqlString.concat(' ' + sqlWhere)
      if (sqlOrderBy) sqlString = sqlString.concat(' ' + sqlOrderBy)
      if (sqlRows) sqlString = sqlString.concat(' ' + sqlRows)
      //
      //  Body
      //
      const body = {
        sqlClient: sqlClient,
        sqlString: sqlString,
        sqlAction: 'SELECTSQL',
        sqlTable: sqlTable
      }
      //
      //  URL
      //
      const URL = App_Settings_URL + URL_TABLES
      if (debugLog) console.log('URL ', URL)
      //
      //  SQL database
      //
      const resultData = await apiAxios(method, URL, body)
      if (debugLog) console.log('data returned ', resultData)
      //
      // No data
      //
      if (!resultData[0]) {
        throw Error('No data received')
      }
      //
      // Return data
      //
      if (debugLog) console.log('Return Data', resultData)
      return resultData
      //
      // Errors
      //
    } catch (err) {
      console.log(err.message)
      return null
    }
  }
}
