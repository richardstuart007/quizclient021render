//
//  Utilities
//
import createOptions from '../../utilities/createOptions'
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
  sessionStorageItems.push('Data_Options_OwnerGroup_Received')
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
  const Promise_Owner = createOptions({
    cop_sqlTable: 'owner',
    cop_id: 'oowner',
    cop_title: 'otitle',
    cop_store: 'Data_Options_Owner',
    cop_received: 'Data_Options_Owner_Received'
  })
  const Promise_OwnerGroup = createOptions({
    cop_sqlTable: 'ownergroup',
    cop_owner: 'ogowner',
    cop_id: 'oggroup',
    cop_title: 'ogtitle',
    cop_store: 'Data_Options_OwnerGroup',
    cop_received: 'Data_Options_OwnerGroup_Received'
  })
  const Promise_Group2 = createOptions({
    cop_sqlTable: 'group2',
    cop_id: 'g2id',
    cop_title: 'g2title',
    cop_store: 'Data_Options_Group2',
    cop_received: 'Data_Options_Group2_Received'
  })
  const Promise_Group3 = createOptions({
    cop_sqlTable: 'group3',
    cop_id: 'g3id',
    cop_title: 'g3title',
    cop_store: 'Data_Options_Group3',
    cop_received: 'Data_Options_Group3_Received'
  })
  //
  //   Wait for all promises
  //
  Promise.all([Promise_Owner, Promise_OwnerGroup, Promise_Group2, Promise_Group3]).then(values => {
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
