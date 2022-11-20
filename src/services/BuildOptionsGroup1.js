//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function BuildOptionsGroup1(data) {
  //
  //  Options
  //
  let Group1Options = [
    {
      id: 'All',
      title: 'All'
    }
  ]
  //
  //  Load other values
  //
  data.forEach(item => {
    const itemObj = {
      id: item.g1id,
      title: item.g1title
    }
    Group1Options.push(itemObj)
  })
  //
  //  Store
  //
  const Data_Options_Group1JSON = JSON.stringify(Group1Options)
  sessionStorage.setItem('Data_Options_Group1', Data_Options_Group1JSON)
  if (debugLog) console.log('Group1Options ', Group1Options)
}
