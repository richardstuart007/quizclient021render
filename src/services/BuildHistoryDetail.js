//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import rowCrud from './../utilities/rowCrud'
//
//  Constants
//
const functionName = 'BuildHistoryDetail'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'BuildHistoryDetail'

//...................................................................................
//.  Main Line
//...................................................................................
export default function BuildHistoryDetail(row) {
  if (debugFunStart) console.log(debugModule)
  //
  //  Load data
  //
  LoadServerQuestions()
  LoadServerLibrary()
  //...................................................................................
  //.  Load Server - Questions
  //...................................................................................
  function LoadServerQuestions() {
    if (debugFunStart) console.log('LoadServerQuestions')
    //
    //  Initialise
    //
    sessionStorage.setItem('Data_Hist_Row_Join_Received', false)
    sessionStorage.setItem('Data_Hist_Row_Join', [])
    sessionStorage.setItem('Data_Questions_Quiz', [])
    sessionStorage.setItem('Data_Bidding', [])
    sessionStorage.setItem('Data_Hands', [])
    //
    //  Load Data_Hist_Row_Join
    //
    let sqlString = ''
    sqlString =
      sqlString +
      `r_id, r_qid, r_ans, qid, qowner, qkey, qdetail, qans, qpoints, qgroup, qrefs, hnorth, heast, hsouth, hwest, brounds`
    sqlString = sqlString + ' from usershistory'
    sqlString = sqlString + ' FULL OUTER JOIN questions on qid = ANY (r_qid)'
    sqlString = sqlString + ' FULL OUTER JOIN bidding on bid = qid'
    sqlString = sqlString + ' FULL OUTER JOIN hands on hid = qid'
    sqlString = sqlString + ` where r_id = ${row.r_id}`
    sqlString = sqlString + ' group by'
    sqlString =
      sqlString +
      ' r_id, r_qid, r_ans, qid, qowner, qkey, qdetail, qans, qpoints, qgroup, qrefs, hnorth, heast, hsouth, hwest, brounds'
    if (debugLog) console.log('sqlString', sqlString)
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
      const Data_Hist_Row_Join = rtnObj.rtnRows
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Hist_Row_Join RESOLVED', Data_Hist_Row_Join)
      sessionStorage.setItem('Data_Hist_Row_Join', JSON.stringify(Data_Hist_Row_Join))
      //
      //  Store separately
      //
      let Data_Questions_Quiz = []
      let Data_Bidding = []
      let Data_Hands = []

      Data_Hist_Row_Join.forEach(row => {
        const {
          qid,
          qowner,
          qkey,
          qdetail,
          qans,
          qpoints,
          qgroup,
          brounds,
          hnorth,
          heast,
          hsouth,
          hwest
        } = row
        if (debugLog) console.log('row ', row)
        //
        //  Index of current question
        //
        if (debugLog) console.log('row.r_qid.indexOf ', row.r_qid.indexOf(qid))
        //
        //  Questions
        //
        const rowQuestion = {
          qid: qid,
          qowner: qowner,
          qkey: qkey,
          qdetail: qdetail,
          qans: qans,
          qpoints: qpoints,
          qgroup: qgroup
        }
        Data_Questions_Quiz.push(rowQuestion)
        //
        //  Bidding
        //
        if (brounds !== null) {
          const rowBidding = {
            bid: qid,
            brounds: brounds
          }
          Data_Bidding.push(rowBidding)
        }
        //
        //  Hands
        //
        if (hnorth !== null || heast !== null || hsouth !== null || hwest !== null) {
          const rowHands = {
            hid: qid,
            hnorth: hnorth,
            heast: heast,
            hsouth: hsouth,
            hwest: hwest
          }
          Data_Hands.push(rowHands)
        }
      })
      //
      //  Completion
      //
      sessionStorage.setItem('Data_Questions_Quiz', JSON.stringify(Data_Questions_Quiz))
      sessionStorage.setItem('Data_Bidding', JSON.stringify(Data_Bidding))
      sessionStorage.setItem('Data_Hands', JSON.stringify(Data_Hands))
      sessionStorage.setItem('Data_Hist_Row_Join_Received', true)
    })

    return
  }
  //...................................................................................
  //.  Load Server - Library
  //...................................................................................
  function LoadServerLibrary() {
    if (debugFunStart) console.log('LoadServerLibrary')
    //
    //  Initialise
    //
    sessionStorage.setItem('Data_Library_Received', false)
    sessionStorage.setItem('Data_Library', [])
    //
    //  List of Questions in a string
    //
    let qidList = ''
    let firstElem = true
    row.r_qid.forEach(qid => {
      firstElem ? (qidList = qidList + `${qid}`) : (qidList = qidList + `, ${qid}`)
      firstElem = false
    })
    if (debugLog) console.log('qidList ', qidList)
    //
    //  Build SqlString
    //
    let sqlString = ''
    sqlString = sqlString + 'lrid, lrref, lrdesc, lrlink, lrwho, lrtype from library'
    sqlString = sqlString + ' JOIN questions on lrref = ANY (qrefs)'
    sqlString = sqlString + ` where qid in (${qidList})`
    sqlString = sqlString + ` group by lrid, lrref, lrdesc, lrlink, lrwho, lrtype`
    sqlString = sqlString + ` order by lrid`
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
      if (debugLog) console.log('Data_Library RESOLVED', Data_Library)
      sessionStorage.setItem('Data_Library', JSON.stringify(Data_Library))
      sessionStorage.setItem('Data_Library_Received', true)

      return
    })

    return myPromiseLibrary
  }
  //...................................................................................
}
