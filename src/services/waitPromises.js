//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Constants
//
const { WAIT } = require('../services/constants')
const { WAIT_MAX_TRY } = require('../services/constants')
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
//...................................................................................
//.  Main Line
//...................................................................................
export default function waitPromises(props) {
  if (debugFunStart) console.log(`Function: waitPromises`)
  if (debugLog) console.log('props ', props)
  //
  //  Deconstruct props
  //
  const {
    sessionStorageItemsALL,
    sessionStorageItems,
    timerWaitInterval = WAIT,
    timerMaxTry = WAIT_MAX_TRY
  } = props
  //
  //  Wait
  //
  const timerStart = new Date()
  let timerTotalWait = 0
  let timerTotalTries = 0
  const myInterval = setInterval(myTimer, timerWaitInterval)
  //...................................................................................
  //.  Timer
  //...................................................................................
  function myTimer() {
    //
    //  Check if all completed
    //
    let ItemsALLStatus = true
    for (let i = 0; i < sessionStorageItems.length; i++) {
      const sessionItem = sessionStorageItems[i]
      const ItemStatus = JSON.parse(sessionStorage.getItem(sessionItem))
      if (!ItemStatus) {
        ItemsALLStatus = false
        if (debugLog) console.log(`SessionStorage(${sessionItem}) not received`)
        break
      }
    }
    //
    //  Data received
    //
    if (ItemsALLStatus) {
      const timeEnd = new Date()
      const timeDiff = timeEnd - timerStart
      if (debugLog)
        console.log(`SessionStorage(${sessionStorageItemsALL}) Elapsed Time(${timeDiff})`)
      clearInterval(myInterval)
      sessionStorage.setItem(sessionStorageItemsALL, true)
      return
    }
    //
    //  Waited enough
    //
    if (timerTotalTries >= timerMaxTry) {
      if (debugLog)
        console.log(`SessionStorage(${sessionStorageItemsALL}) Timed out(${timerTotalWait})`)
      clearInterval(myInterval)
      return
    }
    //
    //  Wait some more
    //
    timerTotalWait = timerTotalWait + timerWaitInterval
    timerTotalTries++
  }
  //...................................................................................
}
