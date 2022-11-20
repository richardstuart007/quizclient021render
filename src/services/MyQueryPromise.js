//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//=====================================================================================
function MyQueryPromise(promise) {
  if (debugLog) console.log('Start MyQueryPromise')

  if (promise.isFulfilled) return promise

  // Set initial state
  let isPending = true
  let isRejected = false
  let isFulfilled = false

  // Observe the promise, saving the fulfillment in a closure scope.
  let result = promise.then(
    function (v) {
      isFulfilled = true
      isPending = false
      if (debugLog) console.log(typeof v, v)
      return v
    },
    function (e) {
      isRejected = true
      isPending = false
      if (debugLog) console.log(typeof e, e)
      throw e
    }
  )

  result.isFulfilled = function () {
    return isFulfilled
  }
  result.isPending = function () {
    return isPending
  }
  result.isRejected = function () {
    return isRejected
  }
  if (debugLog) console.log(typeof result, result)
  return result
}

export default MyQueryPromise
