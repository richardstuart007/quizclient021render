//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Utilities
//
import rowCrud from '../../utilities/rowCrud'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'OptionsGroup1Owner'
//...................................................................................
//.  Main Line
//...................................................................................
export default function OptionsGroup1Owner() {
  if (debugFunStart) console.log(debugModule)
  //
  //  Received flag
  //
  sessionStorage.setItem('Data_Options_Group1Owner_Received', false)
  //
  //  Process promise
  //
  const sqlTable = 'group1'
  const sqlString =
    'qowner, qgroup1, g1title from questions join group1 on qgroup1 = g1id group by qowner, qgroup1 ,g1title order by qowner, qgroup1'
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
  myPromiseGet.then(function (rtnObj) {
    if (debugLog) console.log('myPromiseGet rtnObj ', rtnObj)
    //
    //  No data returned
    //
    if (!rtnObj.rtnValue) return
    //
    //  Load Options from Data
    //
    const data = rtnObj.rtnRows
    LoadOptions(data)
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
    if (debugLog) console.log('Data ', data)
    //
    //  Options
    //
    let Options = []
    data.forEach(item => {
      const itemObj = {
        qowner: item.qowner,
        qgroup1: item.qgroup1,
        g1title: item.g1title
      }
      Options.push(itemObj)
    })
    //
    //  Store
    //
    sessionStorage.setItem('Data_Options_Group1Owner', JSON.stringify(Options))
    //
    //  Received flag
    //
    sessionStorage.setItem('Data_Options_Group1Owner_Received', true)
  }
  //...................................................................................
}
