//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import BuildOptionsOwner from './BuildOptionsOwner'
import getTable from './getTable'
//
//  Constants
//
const functionName = 'GetBuildOptionsOwner'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
//===================================================================================
export default function GetBuildOptionsOwner() {
  //.............................................................................
  //
  //  Set Debug State
  //
  if (debugLog) console.log('Start GetBuildOptionsOwner')
  //
  //  Process promise
  //
  const getTableparams = {
    sqlCaller: functionName,
    sqlTable: 'owner',
    sqlAction: 'SELECT',
    sqlWhere: '',
    sqlOrderByRaw: 'oowner'
  }
  const myPromiseOwner = MyQueryPromise(getTable(getTableparams))
  //
  //  Resolve Status
  //
  myPromiseOwner.then(function (data) {
    if (debugFunStart) console.log('myPromiseOwner')
    if (debugLog) console.log('myPromiseOwner data ', data)
    //
    //  Update Status
    //
    sessionStorage.setItem('Data_Options_Owner_Received', true)
    //
    //  Load Options and Store
    //
    let options = []
    if (data) {
      options = BuildOptionsOwner(data)
    }
    if (debugLog) console.log('myPromiseOwner options ', options)
    return
  })

  return myPromiseOwner
}
