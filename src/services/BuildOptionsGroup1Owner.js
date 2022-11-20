//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function BuildOptionsGroup1Owner(data) {
  //
  //  Options
  //
  let Group1OptionsOwner = []
  //
  //  Load other values
  //
  data.forEach(item => {
    const itemObj = {
      qowner: item.qowner,
      qgroup1: item.qgroup1,
      g1title: item.g1title
    }
    Group1OptionsOwner.push(itemObj)
  })
  //
  //  Store Update
  //
  const Data_Options_Group1OwnerJSON = JSON.stringify(Group1OptionsOwner)
  sessionStorage.setItem('Data_Options_Group1Owner', Data_Options_Group1OwnerJSON)
  if (debugLog) console.log('Group1OptionsOwner ', Group1OptionsOwner)
}
