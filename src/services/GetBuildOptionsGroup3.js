//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import BuildOptionsGroup3 from './BuildOptionsGroup3'
import getTable from './getTable'
//
//  Constants
//
const functionName = 'GetBuildOptionsGroup3'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
//===================================================================================
export default function GetBuildOptionsGroup3() {
  //.............................................................................
  //
  //  Set Debug State
  //
  if (debugLog) console.log('Start GetBuildOptionsGroup3')
  //
  //  Process promise
  //
  const getTableparams = {
    sqlCaller: functionName,
    sqlTable: 'group3',
    sqlAction: 'SELECT',
    sqlWhere: '',
    sqlOrderByRaw: 'g3id'
  }
  const myPromiseGroup3 = MyQueryPromise(getTable(getTableparams))
  //
  //  Resolve Status
  //
  myPromiseGroup3.then(function (data) {
    if (debugFunStart) console.log('myPromiseGroup3')
    if (debugLog) console.log('myPromiseGroup3 data ', data)
    //
    //  Update Status
    //
    sessionStorage.setItem('Data_Options_Group3_Received', true)
    //
    //  Load Options and Store
    //
    if (data) {
      BuildOptionsGroup3(data)
    }
    return
  })

  return myPromiseGroup3
}
