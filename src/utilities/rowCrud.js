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
const moduleName = 'rowCrud'
const { URL_TABLES } = require('../services/constants.js')
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
  let sqlClient = `${moduleName}/${sqlCaller}`
  //
  //  Object returned by this handler - as per server
  //
  let rtnObj = {
    rtnValue: false,
    rtnMessage: '',
    rtnSqlFunction: moduleName,
    rtnCatchFunction: '',
    rtnCatch: false,
    rtnCatchMsg: '',
    rtnRows: []
  }
  //
  //  Validate the parameters
  //
  const valid = validateProps()
  if (!valid) {
    console.log(
      `sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) Error(${rtnObj.rtnMessage})`
    )
    return rtnObj
  }
  //
  // Fetch the data
  //
  const rtnObjServer = sqlDatabase()
  //
  //  Server Returned null
  //
  if (!rtnObjServer) {
    rtnObj.rtnMessage = `Server rejected request: sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) `
    console.log(rtnObj.rtnMessage)
    return rtnObj
  }
  //
  //  Server returned no data
  //
  if (!rtnObjServer.rtnValue)
    if (debugLog)
      console.log(
        `No data received: sqlClient(${sqlClient}) Action(${sqlAction}) Table(${sqlTable}) `
      )
  //
  //  Return value from Server
  //
  if (debugLog) console.log('Server Object ', rtnObjServer)
  return rtnObjServer
  //--------------------------------------------------------------------
  //  Validate the parameters
  //--------------------------------------------------------------------
  function validateProps() {
    //
    // Check values sent
    //
    if (!sqlAction) {
      rtnObj.rtnMessage = `SqlAction parameter not passed`
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
      rtnObj.rtnMessage = `SqlAction ${sqlAction}: SqlAction not valid`
      return false
    }
    //
    //  SELECTSQL needs sqlString
    //
    if (sqlAction === 'SELECTSQL' && !sqlString) {
      rtnObj.rtnMessage = `SqlAction ${sqlAction}: sqlString not passed`
      return false
    }
    //
    //  not SELECTSQL needs table
    //
    if (sqlAction !== 'SELECTSQL' && !sqlTable) {
      rtnObj.rtnMessage = `SqlAction ${sqlAction}: sqlTable not passed`
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
      const rtnObjServer = await apiAxios(axiosMethod, URL, body)
      if (debugLog) console.log('rtnObjServer ', rtnObjServer)
      return rtnObjServer
      //
      // Errors
      //
    } catch (err) {
      console.log(err)
      return []
    }
  }
}
