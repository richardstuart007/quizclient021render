//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function BuildOptionsOwner(data) {
  if (debugLog) console.log('Data Options Owner ', data)
  //
  //  Options
  //
  let OwnerOptions = []
  let itemObj = {
    id: '',
    title: ''
  }
  //
  //  Default ALL ?
  //
  const ShowAllOwner = false
  if (debugLog) console.log('ShowAllOwner ', ShowAllOwner)
  if (ShowAllOwner) {
    itemObj = {
      id: 'All',
      title: 'All'
    }
    OwnerOptions.push(itemObj)
  }
  //
  //  Load other values
  //
  data.forEach(item => {
    itemObj = {
      id: item.oowner,
      title: item.otitle
    }
    OwnerOptions.push(itemObj)
  })
  //
  //  Store
  //
  const Data_Options_OwnerJSON = JSON.stringify(OwnerOptions)
  sessionStorage.setItem('Data_Options_Owner', Data_Options_OwnerJSON)
  if (debugLog) console.log('OwnerOptions ', OwnerOptions)
  //
  //  Return data
  //
  if (debugLog) console.log('Data_Options_OwnerJSON ', Data_Options_OwnerJSON)
  return Data_Options_OwnerJSON
}
