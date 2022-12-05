//
//  Utilities
//
import rowCrud from './../utilities/rowCrud'

//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()

const functionName = 'writeHistory'
//===================================================================================
export default function writeHistory() {
  //
  //  Answers
  //
  const r_ans = JSON.parse(sessionStorage.getItem('Data_Answers'))
  const r_questions = r_ans.length
  //
  //  If no questions answered, do not write history
  //
  if (r_questions === 0) return
  //
  //  Get User
  //
  const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
  //
  //  Key
  //
  const r_uid = User_Settings_User.u_id
  const r_datetime = new Date()
  //
  //  Selection Data
  //
  const r_owner = JSON.parse(sessionStorage.getItem('Quiz_Select_Owner'))
  const r_group = JSON.parse(sessionStorage.getItem('Quiz_Select_OwnerGroup'))
  //
  //  Correct Answers
  //
  let r_correct = 0
  r_ans.forEach(id => {
    if (id === 1) r_correct++
  })
  //
  //  Question IDs of Answered questions
  //
  let r_qid = []
  let count = 0
  const Data_Questions_Quiz = JSON.parse(sessionStorage.getItem('Data_Questions_Quiz'))
  Data_Questions_Quiz.forEach(row => {
    count++
    if (count <= r_questions) r_qid.push(row.qid)
  })
  //
  //  Build row
  //
  const sqlRow = {
    r_uid: r_uid,
    r_datetime: r_datetime,
    r_owner: r_owner,
    r_group: r_group,
    r_questions: r_questions,
    r_correct: r_correct,
    r_qid: r_qid,
    r_ans: r_ans
  }
  if (debugLog) console.log('sqlRow ', sqlRow)
  //
  //  Build Props
  //
  const props = {
    sqlCaller: functionName,
    axiosMethod: 'post',
    sqlAction: 'INSERT',
    sqlTable: 'usershistory',
    sqlRow: sqlRow
  }
  //
  //  Process promise
  //
  if (debugLog) console.log('rowCrud')
  const myPromiseInsert = rowCrud(props)
  //
  //  Resolve Status
  //
  myPromiseInsert.then(function (rtnObj) {
    if (debugLog) console.log('rtnObj ', rtnObj)
    //
    //  No data returned
    //
    if (!rtnObj.rtnValue) return
    //
    //  Data
    //
    const data = rtnObj.rtnRows
    const rtn_r_id = data[0].r_id
    if (debugLog) console.log(`Row (${rtn_r_id}) UPSERTED in Database`)
    return
  })
  //
  //  Return Promise
  //
  return myPromiseInsert
}
