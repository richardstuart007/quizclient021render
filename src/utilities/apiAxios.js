//
//  Libraries
//
import axios from 'axios'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
//
// methods - post(get), post(update), delete(delete), post(upsert)
//
export default async function apiAxios(method, url, data) {
  try {
    if (debugLog) console.log(`url(${url}) method(${method})`)
    const response = await axios({
      method: method,
      url: url,
      data: data
    })
    if (debugLog) console.log(response)
    //
    //  Errors
    //
    if (response.status < 200 || response.status >= 300)
      throw Error('Did not receive expected data')
    //
    //  Return rows
    //
    return response.data
    //
    //  Catch Error
    //
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
    return null
  }
}
