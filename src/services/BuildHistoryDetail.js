//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import getTable from './getTable'
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
  LoadServerReflinks()
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
      `r_id, r_qid, r_ans, qid, qowner, qkey, qdetail, qcorrect, qbad1, qbad2, qbad3, qgroup1, qrefs, hnorth, heast, hsouth, hwest, brounds`
    sqlString = sqlString + ' from usershistory'
    sqlString = sqlString + ' FULL OUTER JOIN questions on qid = ANY (r_qid)'
    sqlString = sqlString + ' FULL OUTER JOIN bidding on bid = qid'
    sqlString = sqlString + ' FULL OUTER JOIN hands on hid = qid'
    sqlString = sqlString + ` where r_id = ${row.r_id}`
    sqlString = sqlString + ' group by'
    sqlString =
      sqlString +
      ' r_id, r_qid, r_ans, qid, qowner, qkey, qdetail, qcorrect, qbad1, qbad2, qbad3, qgroup1, qrefs, hnorth, heast, hsouth, hwest, brounds'
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'questions',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseQuestions = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseQuestions.then(function (Data_Hist_Row_Join) {
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
          qcorrect,
          qbad1,
          qbad2,
          qbad3,
          qgroup1,
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
          qcorrect: qcorrect,
          qbad1: qbad1,
          qbad2: qbad2,
          qbad3: qbad3,
          qgroup1: qgroup1
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
  //.  Load Server - Reflinks
  //...................................................................................
  function LoadServerReflinks() {
    if (debugFunStart) console.log('LoadServerReflinks')
    //
    //  Initialise
    //
    sessionStorage.setItem('Data_Reflinks_Received', false)
    sessionStorage.setItem('Data_Reflinks', [])
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
    sqlString = sqlString + 'rid, rref, rdesc, rlink, rwho, rtype from reflinks'
    sqlString = sqlString + ' JOIN questions on rref = ANY (qrefs)'
    sqlString = sqlString + ` where qid in (${qidList})`
    sqlString = sqlString + ` group by rid, rref, rdesc, rlink, rwho, rtype`
    sqlString = sqlString + ` order by rid`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'reflinks',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseReflinks = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseReflinks.then(function (Data_Reflinks) {
      //
      //  Session Storage
      //
      if (debugLog) console.log('Data_Reflinks RESOLVED', Data_Reflinks)
      sessionStorage.setItem('Data_Reflinks', JSON.stringify(Data_Reflinks))
      sessionStorage.setItem('Data_Reflinks_Received', true)

      return
    })

    return myPromiseReflinks
  }
  //...................................................................................
}
