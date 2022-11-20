export default function debugSettings(debug = false) {
  //
  //  Log1 Override, then return Debug_Log1 value ?
  //
  const { DEBUG_LOG1_OVERRIDE } = require('./debugConstants.js')
  const { DEBUG_LOG1 } = require('./debugConstants.js')
  if (DEBUG_LOG1_OVERRIDE) return DEBUG_LOG1
  //
  // No Override - return incomming parameter (or default of false)
  //
  return debug
}
