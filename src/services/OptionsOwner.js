//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import rowSelect from './rowSelect'
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
  //  SQL server
  //
  const props = {
    sqlTable: 'owner'
  }
  const myPromiseGet = MyQueryPromise(rowSelect(props))
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
