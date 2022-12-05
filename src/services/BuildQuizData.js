//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import rowCrud from './../utilities/rowCrud'
import randomSort from './../utilities/randomSort'
//
//  Constants
//
const functionName = 'BuildQuizData'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'BuildQuizData'
//...................................................................................
//.  Main Line
//...................................................................................
export default function BuildQuizData(props) {
  if (debugFunStart) console.log(debugModule)
  //
  //  Signed in User
  //
  const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
  const MaxQuestions = User_Settings_User.u_dftmaxquestions
  //
  //  Function Variables
  //
  let Data_Questions_Quiz = []

  let Data_Questions_qid = []
  let Data_Questions_qidString = ''

  let Data_Questions_qrefs = []
  let Data_Qrefs_String = ''
  //
  //  Deconstruct props
  //
  if (debugLog) console.log('props', props)
  const { SqlString_Q } = props
  //
  //  Update store
  //
  sessionStorage.setItem('BuildQuizData_SqlString_Q', JSON.stringify(SqlString_Q))
  //
  //  Reset the Data
  //
  sessionStorage.setItem('Data_Questions_Received', false)
  sessionStorage.setItem('Data_Bidding_Received', false)
  sessionStorage.setItem('Data_Hands_Received', false)
  sessionStorage.setItem('Data_Library_Received', false)
  sessionStorage.setItem('BuildQuizData_Received', false)

  sessionStorage.setItem('Data_Questions', [])
  sessionStorage.setItem('Data_Bidding', [])
  sessionStorage.setItem('Data_Hands', [])
  sessionStorage.setItem('Data_Library', [])

  sessionStorage.setItem('Data_Questions_Quiz', [])
  sessionStorage.setItem('Data_Questions_Quiz_Count', 0)
  sessionStorage.setItem('Data_Questions_qid', [])
  sessionStorage.setItem('Data_Qrefs_Unique', '')
  //
  //  Load data
  //
  LoadServerQuestions()
  //...................................................................................
  //.  Load Server - Questions
  //...................................................................................
  function LoadServerQuestions() {
    if (debugFunStart) console.log('LoadServerQuestions')
    //
    //  Selection
    //
    let sqlString = SqlString_Q
    if (debugLog) console.log('sqlString ', sqlString)
    //
    //  Process promise
    //
    const rowCrudparams = {
      axiosMethod: 'post',
      sqlCaller: functionName,
      sqlTable: 'questions',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseQuestions = rowCrud(rowCrudparams)
    //
    //  Resolve Status
    //
    myPromiseQuestions.then(function (rtnObj) {
      if (debugLog) console.log('rtnObj ', rtnObj)
      //
      //  No data returned
      //
      if (!rtnObj.rtnValue) return
      //
      //  Data
      //
      const Data_Questions = rtnObj.rtnRows
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Questions ', Data_Questions)
      sessionStorage.setItem('Data_Questions', JSON.stringify(Data_Questions))
      sessionStorage.setItem('Data_Questions_Received', true)
      //
      //  No Questions
      //
      if (!Data_Questions[0]) {
        sessionStorage.setItem('BuildQuizData_Received', true)
        return
      }
      //
      //  Store Owner/group
      //
      const row1 = Data_Questions[0]
      sessionStorage.setItem('Quiz_Select_Owner', JSON.stringify(row1.qowner))
      sessionStorage.setItem('Quiz_Select_OwnerGroup', JSON.stringify(row1.qgroup))
      //
      //  Output Data_Questions_Quiz
      //
      QuestionsSortMax(Data_Questions)
      //
      //  Load related
      //
      LoadServerBidding()
      LoadServerHands()
      LoadServerLibrary()
      return
    })

    return
  }
  //...................................................................................
  //.  Output Data_Questions_Quiz
  //...................................................................................
  function QuestionsSortMax(Data_Questions) {
    if (debugFunStart) console.log('QuestionsSortMax')
    //
    //  Random sort questions
    //
    const SortQuestions = User_Settings_User.u_sortquestions
    SortQuestions
      ? (Data_Questions_Quiz = randomSort(Data_Questions))
      : (Data_Questions_Quiz = Data_Questions)
    //
    //  Apply max number
    //
    if (Data_Questions_Quiz.length > MaxQuestions) {
      let i = Data_Questions_Quiz.length - 1
      for (i; i >= MaxQuestions; i--) {
        Data_Questions_Quiz.pop()
      }
    }
    //
    //  Question IDs & Refs
    //
    if (debugLog) console.log('Data_Questions_Quiz ', Data_Questions_Quiz)
    for (let i = 0; i < Data_Questions_Quiz.length; i++) {
      Data_Questions_qid.push(Data_Questions_Quiz[i].qid)
      Data_Questions_qrefs.push(Data_Questions_Quiz[i].qrefs)
    }
    if (debugLog) console.log('Data_Questions_qid ', Data_Questions_qid)
    if (debugLog) console.log('Data_Questions_qrefs ', Data_Questions_qrefs)
    //
    //  String version of ID
    //
    Data_Questions_qidString = Data_Questions_qid.toString()
    if (debugLog) console.log('Data_Questions_qidString ', Data_Questions_qidString)
    //
    //  String version of Refs
    //  ----------------------
    //
    //  Flatten
    //
    const Data_Qrefs_flat = Data_Questions_qrefs.flat()
    //
    //  Unique
    //
    const Data_Qrefs_Unique = [...new Set(Data_Qrefs_flat)]
    //
    //  Add quotes
    //
    let Data_Qrefs_Quote = []
    for (let i = 0; i < Data_Qrefs_Unique.length; i++) {
      Data_Qrefs_Quote.push(`'${Data_Qrefs_Unique[i]}'`)
    }
    if (debugLog) console.log('Data_Qrefs_Quote ', Data_Qrefs_Quote)
    //
    //  Convert to string with commas
    //
    Data_Qrefs_String = Data_Qrefs_Quote.toString()
    if (debugLog) console.log('Data_Qrefs_String ', Data_Qrefs_String)
    //
    //  Session Storage
    //
    sessionStorage.setItem('Data_Questions_Quiz', JSON.stringify(Data_Questions_Quiz))
    sessionStorage.setItem('Data_Questions_Quiz_Count', JSON.stringify(Data_Questions_Quiz.length))
    sessionStorage.setItem('Data_Questions_qid', JSON.stringify(Data_Questions_qid))
    sessionStorage.setItem('Data_Qrefs_Unique', JSON.stringify(Data_Qrefs_Unique))
  }
  //...................................................................................
  //.  Load Server - Bidding
  //...................................................................................
  function LoadServerBidding() {
    if (debugFunStart) console.log('LoadServerBidding')
    //
    //  Selection
    //
    let sqlString = `* from bidding where bid in (${Data_Questions_qidString}) order by bid`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const rowCrudparams = {
      axiosMethod: 'post',
      sqlCaller: functionName,
      sqlTable: 'bidding',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseBidding = rowCrud(rowCrudparams)
    //
    //  Resolve Status
    //
    myPromiseBidding.then(function (rtnObj) {
      if (debugLog) console.log('rtnObj ', rtnObj)
      //
      //  No data returned
      //
      if (!rtnObj.rtnValue) return
      //
      //  Data
      //
      const Data_Bidding = rtnObj.rtnRows
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Bidding ', Data_Bidding)
      sessionStorage.setItem('Data_Bidding', JSON.stringify(Data_Bidding))
      sessionStorage.setItem('Data_Bidding_Received', true)
      //
      //  All Data Received ?
      //
      CheckAllData()
      return
    })

    return
  }
  //...................................................................................
  //.  Load Server - Hands
  //...................................................................................
  function LoadServerHands() {
    if (debugFunStart) console.log('LoadServerHands')
    //
    //  Selection
    //
    let sqlString = `* from hands where hid in (${Data_Questions_qidString}) order by hid`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const rowCrudparams = {
      axiosMethod: 'post',
      sqlCaller: functionName,
      sqlTable: 'hands',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseHands = rowCrud(rowCrudparams)
    //
    //  Resolve Status
    //
    myPromiseHands.then(function (rtnObj) {
      if (debugLog) console.log('rtnObj ', rtnObj)
      //
      //  No data returned
      //
      if (!rtnObj.rtnValue) return
      //
      //  Data
      //
      const Data_Hands = rtnObj.rtnRows
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Hands ', Data_Hands)
      sessionStorage.setItem('Data_Hands', JSON.stringify(Data_Hands))
      sessionStorage.setItem('Data_Hands_Received', true)
      //
      //  All Data Received ?
      //
      CheckAllData()
      return
    })

    return
  }
  //...................................................................................
  //.  Load Server - Library
  //...................................................................................
  function LoadServerLibrary() {
    if (debugFunStart) console.log('LoadServerLibrary')
    let sqlString = `* from library where lrref in (${Data_Qrefs_String}) order by lrid`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const rowCrudparams = {
      axiosMethod: 'post',
      sqlCaller: functionName,
      sqlTable: 'library',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseLibrary = rowCrud(rowCrudparams)
    //
    //  Resolve Status
    //
    myPromiseLibrary.then(function (rtnObj) {
      if (debugLog) console.log('rtnObj ', rtnObj)
      //
      //  No data returned
      //
      if (!rtnObj.rtnValue) return
      //
      //  Data
      //
      const Data_Library = rtnObj.rtnRows
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Library ', Data_Library)
      sessionStorage.setItem('Data_Library', JSON.stringify(Data_Library))
      sessionStorage.setItem('Data_Library_Received', true)
      //
      //  All Data Received ?
      //
      CheckAllData()
      return
    })

    return myPromiseLibrary
  }
  //...................................................................................
  //.  All Data Received ?
  //...................................................................................
  function CheckAllData() {
    if (debugFunStart) console.log('CheckAllData')
    //
    //  Data received, end wait
    //
    const Data_Questions_Received = JSON.parse(sessionStorage.getItem('Data_Questions_Received'))
    const Data_Bidding_Received = JSON.parse(sessionStorage.getItem('Data_Bidding_Received'))
    const Data_Hands_Received = JSON.parse(sessionStorage.getItem('Data_Hands_Received'))
    const Data_Library_Received = JSON.parse(sessionStorage.getItem('Data_Library_Received'))
    //
    //  All data received
    //
    if (
      Data_Questions_Received &&
      Data_Bidding_Received &&
      Data_Hands_Received &&
      Data_Library_Received
    ) {
      if (debugLog) console.log('All DATA received')
      sessionStorage.setItem('BuildQuizData_Received', true)
    }
  }
  //...................................................................................
}
