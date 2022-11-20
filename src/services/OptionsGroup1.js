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
const debugModule = 'OptionsGroup1'
//...................................................................................
//.  Main Line
//...................................................................................
export default function OptionsGroup1() {
  if (debugFunStart) console.log(debugModule)
  //
  //  Process promise
  //
  const props = {
    sqlTable: 'group1'
  }
  const myPromiseGet = MyQueryPromise(rowSelect(props))
  //
  //  Resolve Status
  //
  myPromiseGet.then(function (data) {
    if (debugFunStart) console.log('myPromiseGet')
    if (debugLog) console.log('myPromiseGet Final fulfilled')
    if (debugLog) console.log('data ', data)
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
    if (debugLog) console.log('Data ', data)
    //
    //  Options
    //
    let Options = []
    data.forEach(item => {
      const itemObj = {
        id: item.g1id,
        title: item.g1title
      }
      Options.push(itemObj)
    })
    //
    //  Store
    //
    sessionStorage.setItem('Settings_OptionsGroup1', JSON.stringify(Options))
    if (debugLog) console.log('Options ', Options)
  }
  //...................................................................................
}
