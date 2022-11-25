//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//

import rowCrud from './rowCrud'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'OptionsOwner'
//...................................................................................
//.  Main Line
//...................................................................................
export default function OptionsOwner() {
  if (debugFunStart) console.log(debugModule)
  //
  //  Process promise
  //
  const sqlTable = 'owner'
  const sqlString = `* from ${sqlTable}`
  const rowCrudparams = {
    axiosMethod: 'post',
    sqlCaller: debugModule,
    sqlTable: sqlTable,
    sqlAction: 'SELECTSQL',
    sqlString: sqlString
  }
  const myPromiseGet = rowCrud(rowCrudparams)
  //
  //  Resolve Status
  //
  myPromiseGet.then(function (data) {
    if (debugFunStart) console.log('myPromiseGet')
    debugLog('myPromiseGet Final fulfilled')
    debugLog('data ', data)
    //
    //  Load Options from Data
    //
    if (data[0]) {
      LoadOptions(data)
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
  function LoadOptions(data) {
    if (debugFunStart) console.log('LoadOptions ')
    debugLog('Data ', data)
    //
    //  Options
    //
    let Options = []
    data.forEach(item => {
      const itemObj = {
        id: item.oowner,
        title: item.otitle
      }
      Options.push(itemObj)
    })
    //
    //  Store
    //
    sessionStorage.setItem('Settings_OptionsOwner', JSON.stringify(Options))
    debugLog('Options ', Options)
  }
  //...................................................................................
}
