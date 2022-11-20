//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function BuildOptionsGroup3(data) {
  //
  //  Options
  //
  let Group3Options = [
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
      id: item.g3id,
      title: item.g3title
    }
    Group3Options.push(itemObj)
  })
  //
  //  Store
  //
  const Data_Options_Group3JSON = JSON.stringify(Group3Options)
  sessionStorage.setItem('Data_Options_Group3', Data_Options_Group3JSON)
  if (debugLog) console.log('Group3Options ', Group3Options)
}
