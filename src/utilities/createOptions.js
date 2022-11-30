//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Utilities
//
import rowCrud from './rowCrud'
//
// Debug Settings
//
const debugLog = debugSettings(true)
const debugModule = 'createOptions'
//...................................................................................
//.  Main Line
//...................................................................................
export default function createOptions(props) {
  const { cop_sqlTable, cop_id, cop_title, cop_store, cop_received } = props
  if (debugLog) console.log(props)
  //
  //  Received flag
  //
  sessionStorage.setItem(cop_received, false)
  //
  //  Process promise
  //
  const sqlString = `* from ${cop_sqlTable}`
  const rowCrudparams = {
    axiosMethod: 'post',
    sqlCaller: debugModule,
    sqlTable: cop_sqlTable,
    sqlAction: 'SELECTSQL',
    sqlString: sqlString
  }
  const myPromiseGet = rowCrud(rowCrudparams)
  //
  //  Resolve Status
  //
  myPromiseGet.then(function (data) {
    if (debugLog) console.log('data ', data)
    //
    //  Load Options from Data
    //
    if (data[0]) {
      LoadOptions(data, cop_id, cop_title, cop_store, cop_received)
    }
    return
  })
  //
  //  Return Promise
  //
  return myPromiseGet
  //...................................................................................
  //.  Load Options
  //...................................................................................
  function LoadOptions(data, cop_id, cop_title, cop_store, cop_received) {
    if (debugLog) console.log('Data ', data)
    if (debugLog) console.log('cop_store ', cop_store)
    //
    //  Options
    //
    let Options = []
    data.forEach(item => {
      const itemObj = {
        id: item[cop_id],
        title: item[cop_title]
      }
      Options.push(itemObj)
    })
    //
    //  Store
    //
    sessionStorage.setItem(cop_store, JSON.stringify(Options))
    //
    //  Received flag
    //
    sessionStorage.setItem(cop_received, true)
  }
  //...................................................................................
}
