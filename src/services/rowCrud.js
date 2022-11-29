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
const functionName = 'rowCrud'
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
export default async function rowCrud(props) {
  if (debugLog) console.log('Start rowCrud')
  //
  //  Deconstruct
  //
  const {
    sqlCaller,
    axiosMethod = 'post',
    sqlAction = 'SELECT',
    sqlTable,
    sqlString,
    sqlWhere,
    sqlRow,
    sqlKeyName,
    sqlOrderBy,
    sqlOrderByRaw
  } = props
  if (debugLog) console.log('props: ', props)
  let sqlClient = `${functionName}/${sqlCaller}`
  //
  //  Validate the parameters
  //
  const valid = validateProps()
  let errMessage = ''
  if (!valid) {
    console.log(
      `sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) Error(${errMessage})`
    )
    return []
  }
  //
  // Fetch the data
  //
  const rtnRows = sqlDatabase()
  return rtnRows
  //--------------------------------------------------------------------
  //  Validate the parameters
  //--------------------------------------------------------------------
  function validateProps() {
    //
    // Check values sent
    //
    if (!sqlAction) {
      errMessage = `SqlAction parameter not passed`
      return false
    }
    //
    //  Validate sqlAction type
    //
    if (
      sqlAction !== 'DELETE' &&
      sqlAction !== 'EXIST' &&
      sqlAction !== 'SELECTSQL' &&
      sqlAction !== 'SELECT' &&
      sqlAction !== 'INSERT' &&
      sqlAction !== 'UPDATE' &&
      sqlAction !== 'UPSERT'
    ) {
      errMessage = `SqlAction ${sqlAction}: SqlAction not valid`
      return false
    }
    //
    //  SELECTSQL needs sqlString
    //
    if (sqlAction === 'SELECTSQL' && !sqlString) {
      errMessage = `SqlAction ${sqlAction}: sqlString not passed`
      return false
    }
    //
    //  not SELECTSQL needs table
    //
    if (sqlAction !== 'SELECTSQL' && !sqlTable) {
      errMessage = `SqlAction ${sqlAction}: sqlTable not passed`
      return false
    }
    //
    //  Valid
    //
    return true
  }
  //--------------------------------------------------------------------
  //  Database SQL
  //--------------------------------------------------------------------
  async function sqlDatabase() {
    try {
      //
      //  Body
      //
      const body = {
        sqlClient: sqlClient,
        sqlTable: sqlTable,
        sqlAction: sqlAction,
        sqlString: sqlString,
        sqlWhere: sqlWhere,
        sqlRow: sqlRow,
        sqlKeyName: sqlKeyName,
        sqlOrderBy: sqlOrderBy,
        sqlOrderByRaw: sqlOrderByRaw
      }
      //
      //  Base URL
      //
      const App_Settings_URL = JSON.parse(sessionStorage.getItem('App_Settings_URL'))
      if (debugLog) console.log('App_Settings_URL ', App_Settings_URL)
      //
      //  Full URL
      //
      const URL = App_Settings_URL + URL_TABLES
      if (debugLog) console.log('URL ', URL)
      if (debugLog) console.log(`sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) `)
      //
      //  SQL database
      //
      const rtnObj = await apiAxios(axiosMethod, URL, body)
      if (debugLog) console.log('rtnObj ', rtnObj)
      //
      //  Server Returned null
      //
      if (!rtnObj) {
        console.log(
          `Server rejected request: sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) `
        )
        return []
      }
      //
      //  Data received
      //
      const rtnValue = rtnObj.rtnValue
      if (rtnValue) {
        const rtnRows = rtnObj.rtnRows
        return rtnRows
      }
      //
      //  Server returned no data
      //
      console.log(
        `No data received: sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) `
      )
      return []
      //
      // Errors
      //
    } catch (err) {
      console.log(err)
      return []
    }
  }
}
