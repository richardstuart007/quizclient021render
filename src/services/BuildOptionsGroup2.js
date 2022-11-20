//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function BuildOptionsGroup2(data) {
  //
  //  Options
  //
  let Group2Options = [
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
      id: item.g2id,
      title: item.g2title
    }
    Group2Options.push(itemObj)
  })
  //
  //  Store
  //
  const Data_Options_Group2JSON = JSON.stringify(Group2Options)
  sessionStorage.setItem('Data_Options_Group2', Data_Options_Group2JSON)
  if (debugLog) console.log('Group2Options ', Group2Options)
}
