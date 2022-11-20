//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import BuildOptionsGroup2 from './BuildOptionsGroup2'
import getTable from './getTable'
//
//  Constants
//
const functionName = 'GetBuildOptionsGroup2'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
//===================================================================================
export default function GetBuildOptionsGroup2() {
  //.............................................................................
  //
  //  Set Debug State
  //
  if (debugLog) console.log('Start GetBuildOptionsGroup2')
  //
  //  Process promise
  //
  const getTableparams = {
    sqlCaller: functionName,
    sqlTable: 'group2',
    sqlAction: 'SELECT',
    sqlWhere: '',
    sqlOrderByRaw: 'g2id'
  }
  const myPromiseGroup2 = MyQueryPromise(getTable(getTableparams))
  //
  //  Resolve Status
  //
  myPromiseGroup2.then(function (data) {
    if (debugFunStart) console.log('myPromiseGroup2')
    if (debugLog) console.log('myPromiseGroup2 data ', data)
    //
    //  Update Status
    //
    sessionStorage.setItem('Data_Options_Group2_Received', true)
    //
    //  Load Options and Store
    //
    if (data) {
      BuildOptionsGroup2(data)
    }
    return
  })

  return myPromiseGroup2
}
