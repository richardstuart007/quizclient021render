//
//  Utilities
//
import rowUpsert from './rowUpsert'
import MyQueryPromise from './MyQueryPromise'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
function writeHistory() {
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
  const r_email = User_Settings_User.u_email
  const r_uid = User_Settings_User.u_id
  const r_datetime = new Date()
  //
  //  Selection Data
  //
  const r_owner = JSON.parse(sessionStorage.getItem('Quiz_Select_Owner'))
  const r_group1 = JSON.parse(sessionStorage.getItem('Quiz_Select_Group1'))
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
    r_email: r_email,
    r_uid: r_uid,
    r_datetime: r_datetime,
    r_owner: r_owner,
    r_group1: r_group1,
    r_questions: r_questions,
    r_correct: r_correct,
    r_qid: r_qid,
    r_ans: r_ans
  }
  //
  //  Data
  //
  if (debugLog) console.log('sqlRow ', sqlRow)
  //
  //  Build Props
  //
  const props = {
    sqlTable: 'usershistory',
    sqlKeyName: ['r_email', 'r_datetime'],
    sqlRow: sqlRow
  }
  //
  //  Process promise
  //
  if (debugLog) console.log('rowUpsert')
  const myPromiseInsert = MyQueryPromise(rowUpsert(props))
  //
  //  Resolve Status
  //
  myPromiseInsert.then(function (data) {
    if (debugLog) console.log('myPromiseInsert data ', data)
    //
    //  No data returned
    //
    if (!data) {
      console.log('No Data returned')
      throw Error
    } else {
      //
      //  Get ID
      //
      const rtn_r_id = data[0].r_id
      if (debugLog) console.log(`Row (${rtn_r_id}) UPSERTED in Database`)
    }
    return
  })
  //
  //  Return Promise
  //
  return myPromiseInsert
}

export default writeHistory
