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
const sqlClient = 'rowUpsert'
const { URL_TABLES } = require('./constants.js')
//
// Debug Settings
//
const debugLog = debugSettings()
//--------------------------------------------------------------------
//-  Main Line
//--------------------------------------------------------------------
export default async function rowUpsert(props) {
  if (debugLog) console.log('Start rowUpsert')
  //
  //  Deconstruct
  //
  const { sqlTable, sqlKeyName, sqlRow } = props
  if (debugLog) console.log('props: ', props)
  //
  //  Get the URL
  //
  const App_Settings_URLJSON = sessionStorage.getItem('App_Settings_URL')
  const App_Settings_URL = JSON.parse(App_Settings_URLJSON)
  if (debugLog) console.log('App_Settings_URL ', App_Settings_URL)
  //
  // Database Update
  //
  const promise = updateDatabase()
  //
  // Return promise
  //
  if (debugLog) console.log('Return promise', promise)
  return promise
  //--------------------------------------------------------------------
  //  Database Update
  //--------------------------------------------------------------------
  async function updateDatabase() {
    try {
      //
      //  Setup actions
      //
      const method = 'post'
      const body = {
        sqlClient: sqlClient,
        sqlTable: sqlTable,
        sqlAction: 'UPSERT',
        sqlKeyName: sqlKeyName,
        sqlRow: sqlRow
      }
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
      const rowReturned = resultData[0]
      if (debugLog) console.log('rowReturned ', rowReturned)
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
