//
//  Utilities
//
import GetBuildOptionsOwner from '../../services/GetBuildOptionsOwner'
import GetBuildOptionsGroup1Owner from '../../services/GetBuildOptionsGroup1Owner'
import GetBuildOptionsGroup2 from '../../services/GetBuildOptionsGroup2'
import GetBuildOptionsGroup3 from '../../services/GetBuildOptionsGroup3'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//...................................................................................
//.  Main Line
//...................................................................................
export default function QuizSigninInit() {
  if (debugLog) console.log(`Function: QuizSigninInit`)
  //
  //  Elapsed Time
  //
  const timerStart = new Date()
  //
  //  Set storage items
  //
  let sessionStorageItemsALL = 'Data_Options_ALL_Received'
  let sessionStorageItems = []
  sessionStorageItems.push('Data_Options_Owner_Received')
  sessionStorageItems.push('Data_Options_Group1Owner_Received')
  sessionStorageItems.push('Data_Options_Group2_Received')
  sessionStorageItems.push('Data_Options_Group3_Received')
  //
  //  Initialise storage status to FALSE
  //
  sessionStorage.setItem(sessionStorageItemsALL, false)
  for (let i = 0; i < sessionStorageItems.length; i++) {
    sessionStorage.setItem(sessionStorageItems[i], false)
  }
  //
  //  Get the Selection Options
  //
  const Promise_Owner = GetBuildOptionsOwner()
  const Promise_Group1Owner = GetBuildOptionsGroup1Owner()
  const Promise_Group2 = GetBuildOptionsGroup2()
  const Promise_Group3 = GetBuildOptionsGroup3()
  //
  //   Wait for all promises
  //
  Promise.all([Promise_Owner, Promise_Group1Owner, Promise_Group2, Promise_Group3]).then(values => {
    if (debugLog) console.log(`Promise values ALL`, values)
    promisesAllComplete()
  })
  //...................................................................................
  //.  Process completed promises
  //...................................................................................
  function promisesAllComplete() {
    if (debugLog) console.log(`Function: promisesAllComplete`)
    //
    //  Check if all completed
    //
    let ItemsALLStatus = true
    for (let i = 0; i < sessionStorageItems.length; i++) {
      const sessionItem = sessionStorageItems[i]
      const ItemStatus = JSON.parse(sessionStorage.getItem(sessionItem))
      if (debugLog) console.log(`SessionStorage(${sessionItem}) ${ItemStatus}`)
      if (!ItemStatus) {
        ItemsALLStatus = false
        if (debugLog) console.log(`SessionStorage(${sessionItem}) not received`)
        break
      }
    }
    //
    //  Data received
    //
    if (debugLog) console.log('ItemsALLStatus ', ItemsALLStatus)
    if (ItemsALLStatus) {
      const timeEnd = new Date()
      const timeDiff = timeEnd - timerStart
      if (debugLog)
        console.log(`SessionStorage(${sessionStorageItemsALL}) Elapsed Time(${timeDiff})`)
      sessionStorage.setItem(sessionStorageItemsALL, true)
    }
    //...................................................................................
  }
}
