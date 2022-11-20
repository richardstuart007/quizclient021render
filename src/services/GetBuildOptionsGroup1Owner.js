//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import BuildOptionsGroup1Owner from './BuildOptionsGroup1Owner'
import getTable from './getTable'
//
//  Constants
//
const functionName = 'GetBuildOptionsGroup1Owner'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
//===================================================================================
export default function GetBuildOptionsGroup1Owner() {
  //.............................................................................
  //
  //  Set Debug State
  //
  if (debugLog) console.log('Start GetBuildOptionsGroup1Owner')
  //
  //  Process promise
  //
  const getTableparams = {
    sqlCaller: functionName,
    sqlTable: 'group1',
    sqlAction: 'SELECTSQL',
    sqlString:
      'qowner, qgroup1, g1title from questions join group1 on qgroup1 = g1id group by qowner, qgroup1 ,g1title order by qowner, qgroup1'
  }
  const myPromiseGroup1Owner = MyQueryPromise(getTable(getTableparams))
  //
  //  Resolve Status
  //
  myPromiseGroup1Owner.then(function (data) {
    if (debugFunStart) console.log('myPromiseGroup1Owner')
    if (debugLog) console.log('myPromiseGroup1Owner data ', data)
    //
    //  Update Status
    //
    sessionStorage.setItem('Data_Options_Group1Owner_Received', true)
    //
    //  Load Options and Store
    //
    if (data) {
      BuildOptionsGroup1Owner(data)
    }
    return
  })

  return myPromiseGroup1Owner
}
