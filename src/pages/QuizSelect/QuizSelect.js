//
//  Libraries
//
import { useState } from 'react'
import { Paper, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MySelect from '../../components/controls/MySelect'
import { useMyForm, MyForm } from '../../components/controls/useMyForm'
//
//  Services
//
import BuildQuizData from '../../services/BuildQuizData'
//
let g_DataLoad = true
//
//  Settings
//
let QuizSelect_ShowSelectionGroup2
let QuizSelect_ShowSelectionGroup3
//
//  Data output
//
let Data_Options_Owner = []
let Data_Options_OwnerGroup = []
let Data_Options_Group2 = []
let Data_Options_Group3 = []
let Data_Options_OwnerGroup_Subset = []
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'QuizSelect'
//
//  Initial Values
//
const initialFValues = {
  qowner: '',
  qgroup: '',
  qgroup2: '',
  qgroup3: ''
}
//
//  References to display
//
let g_PageNew
//...................................................................................
//.  Main Line
//...................................................................................
export default function QuizSelect({ handlePage }) {
  if (debugFunStart) console.log(debugModule)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //
  //  Signed in User
  //
  const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
  //
  //  Set Selection from any previous values
  //
  initialFValues.qowner = JSON.parse(sessionStorage.getItem('Quiz_Select_Owner'))
  initialFValues.qgroup = JSON.parse(sessionStorage.getItem('Quiz_Select_OwnerGroup'))
  initialFValues.qgroup2 = JSON.parse(sessionStorage.getItem('Quiz_Select_Group2'))
  initialFValues.qgroup3 = JSON.parse(sessionStorage.getItem('Quiz_Select_Group3'))
  //
  //  Default owner from User if empty
  //
  if (initialFValues.qowner === '') initialFValues.qowner = User_Settings_User.u_dftowner
  if (debugLog) console.log('initialFValues ', initialFValues)
  //
  //  Load setup values
  //
  QuizSelect_ShowSelectionGroup2 = JSON.parse(
    sessionStorage.getItem('QuizSelect_ShowSelectionGroup2')
  )
  QuizSelect_ShowSelectionGroup3 = JSON.parse(
    sessionStorage.getItem('QuizSelect_ShowSelectionGroup3')
  )
  //
  //  Load the data array from the store
  //
  if (g_DataLoad) {
    g_DataLoad = false
    LoadOptions()
  }
  //
  //  Interface to Form
  //
  const { values, setValues, errors, setErrors, handleInputChange } = useMyForm(
    initialFValues,
    true,
    validate
  )
  //...................................................................................
  //.  Initial Load of Options
  //...................................................................................
  function LoadOptions() {
    if (debugFunStart) console.log('LoadOptions')
    //
    //  Get Data from the Store  Data_Options_OwnerGroup
    //
    const Data_Options_OwnerJSON = sessionStorage.getItem('Data_Options_Owner')
    Data_Options_Owner = JSON.parse(Data_Options_OwnerJSON)

    const Data_Options_OwnerGroupJSON = sessionStorage.getItem('Data_Options_OwnerGroup')
    Data_Options_OwnerGroup = JSON.parse(Data_Options_OwnerGroupJSON)

    const Data_Options_Group2JSON = sessionStorage.getItem('Data_Options_Group2')
    Data_Options_Group2 = JSON.parse(Data_Options_Group2JSON)

    const Data_Options_Group3JSON = sessionStorage.getItem('Data_Options_Group3')
    Data_Options_Group3 = JSON.parse(Data_Options_Group3JSON)
    //
    //  Set ownergroup Options
    //
    Data_Options_OwnerGroup_Subset = loadOwnerGroupSubset(
      true,
      initialFValues.qowner,
      initialFValues.qgroup
    )
    sessionStorage.setItem(
      'Data_Options_OwnerGroup_Subset',
      JSON.stringify(Data_Options_OwnerGroup_Subset)
    )
  }
  //.............................................................................
  //.  Load Owner/Group Options
  //.............................................................................
  function loadOwnerGroupSubset(InitialLoad, owner, group) {
    if (debugFunStart) console.log('loadOwnerGroupSubset')
    if (debugLog) console.log('owner ', owner)
    if (debugLog) console.log('group ', group)
    if (debugLog) console.log('Data_Options_OwnerGroup ', Data_Options_OwnerGroup)
    //
    //  Select out Owner
    //
    let options = []
    Data_Options_OwnerGroup.forEach(item => {
      if (item.owner === owner) {
        const itemObj = {
          id: item.id,
          title: item.title
        }
        options.push(itemObj)
      }
    })
    //
    //  If current Group is not in valid value, force first
    //
    const valid = options.some(option => option['id'] === group)
    if (debugLog) console.log(`valid `, valid)
    if (!valid) {
      const firstOption = options[0]
      if (!InitialLoad) {
        setValues({
          ...values,
          qowner: owner,
          qgroup: firstOption.id
        })
        if (debugLog) console.log(`qgroup default to ${firstOption.id}`)
      }
    }
    //
    //  Save and return
    //
    sessionStorage.setItem('Data_Options_OwnerGroup_Subset', JSON.stringify(options))
    if (debugLog) console.log('Data_Options_OwnerGroup_Subset ', options)
    return options
  }
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  function validate(fieldValues = values) {
    if (debugFunStart) console.log('validate')
    if (debugLog) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    //
    //  qowner
    //
    if ('qowner' in fieldValues) {
      temp.qowner = fieldValues.qowner.length !== 0 ? '' : 'This field is required.'
      Data_Options_OwnerGroup_Subset = loadOwnerGroupSubset(
        false,
        fieldValues.qowner,
        values.qgroup
      )
    }
    //
    //  qgroup
    //
    if ('qgroup' in fieldValues) {
      temp.qgroup = fieldValues.qgroup.length !== 0 ? '' : 'This field is required.'
    }
    //
    //  Set the errors
    //
    setErrors({
      ...temp
    })

    if (fieldValues === values) return Object.values(temp).every(x => x === '')
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  //
  //  Validate
  //
  const SubmitForm = e => {
    if (debugFunStart) console.log('SubmitForm')
    if (validate()) {
      QuizBuild()
    }
  }
  //...................................................................................
  //.  Prepare Row before switching to Quiz
  //...................................................................................
  function QuizBuild() {
    if (debugLog) console.log('QuizBuild')
    //
    //  BuildQuizData
    //
    const { qowner, qgroup, qgroup2, qgroup3 } = values
    let SqlString_Q = `* from questions where qowner = '${qowner}' and qgroup = '${qgroup}'`
    if (qgroup2 & (qgroup2 !== 'All')) SqlString_Q = SqlString_Q + ` qgroup2 = '${qgroup2}`
    if (qgroup3 & (qgroup3 !== 'All')) SqlString_Q = SqlString_Q + ` qgroup3 = '${qgroup3}`
    const params = {
      SqlString_Q: SqlString_Q
    }
    BuildQuizData(params)
    //
    //  Reset Quiz Data
    //
    sessionStorage.setItem('Quiz_Reset', true)
    //
    //  Wait for data
    //
    const waitSessionStorageParams = {
      sessionItem: 'BuildQuizData_Received',
      handlePageValue: g_PageNew
    }
    waitSessionStorage(waitSessionStorageParams, handlePage)
  }
  //--------------------------------------------------------------------
  //-  Wait
  //--------------------------------------------------------------------
  function waitSessionStorage(props, handlePage) {
    if (debugLog) console.log('Start waitSessionStorage')
    if (debugLog) console.log('props ', props)
    const timeStart = new Date()
    //
    //  Constants
    //
    const { WAIT } = require('../../services/constants')
    const { WAIT_MAX_TRY } = require('../../services/constants')
    //
    //  Deconstruct props
    //
    const { sessionItem, dftWait = WAIT, dftMaxTry = WAIT_MAX_TRY, handlePageValue } = props
    if (debugLog) console.log('sessionItem ', sessionItem)
    if (debugLog) console.log('dftWait ', dftWait)
    if (debugLog) console.log('dftMaxTry ', dftMaxTry)
    //
    //  Global
    //
    let completedFlag = false
    let totalWAIT = 0
    //
    //  Wait for data
    //
    let w_try = 0
    const myInterval = setInterval(myTimer, dftWait)
    function myTimer() {
      //
      //  Data received, end wait
      //
      completedFlag = JSON.parse(sessionStorage.getItem(sessionItem))
      if (completedFlag) {
        const timeEnd = new Date()
        const timeDiff = timeEnd - timeStart
        if (debugLog)
          console.log(
            `waitSessionStorage sessionStorage(${sessionItem}) value(${completedFlag}) Elapsed Time(${timeDiff})`
          )
        clearInterval(myInterval)
        updateSelection(handlePageValue)
      } else {
        //
        //  Waited enough
        //
        if (w_try >= dftMaxTry) {
          if (debugLog)
            console.log(`waitSessionStorage sessionStorage(${sessionItem}) Timed out(${totalWAIT})`)
          clearInterval(myInterval)
        }
        //
        //  Update counters
        //
        totalWAIT = totalWAIT + dftWait
        w_try++
      }
    }
  }
  //...................................................................................
  //.  Update Selection
  //...................................................................................
  function updateSelection(handlePageValue) {
    if (debugFunStart) console.log('updateSelection')
    //
    //  No questions
    //
    const Data_Questions_Quiz_Count = JSON.parse(
      sessionStorage.getItem('Data_Questions_Quiz_Count')
    )

    if (Data_Questions_Quiz_Count === 0) {
      setForm_message('QuizSelect: No Questions found')
      if (debugLog) console.log('QuizSelect: No Questions found')
      return
    }
    //
    //  No Refs
    //
    const Data_LibraryJSON = sessionStorage.getItem('Data_Library')
    if (debugLog) console.log('Data_LibraryJSON ', Data_LibraryJSON)
    if (handlePageValue === 'QuizRefs') {
      if (Data_LibraryJSON === '') {
        setForm_message('QuizSelect: No Learning Material found')
        return
      }
    }
    //
    //  Start Quiz
    //
    sessionStorage.setItem('Quiz_Reset', true)
    handlePage(handlePageValue)
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm>
        <Paper
          sx={{
            margin: 2,
            padding: 2,
            maxWidth: 400,
            backgroundColor: 'whitesmoke',
            elevation: 12
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent='flex-start'
            alignItems='flex-start'
            direction='column'
          >
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MySelect
                name='qowner'
                label='Owner'
                value={values.qowner}
                onChange={handleInputChange}
                options={Data_Options_Owner}
                error={errors.qowner}
                sx={{ minWidth: '300px' }}
              />
            </Grid>
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <MySelect
                name='qgroup'
                label='Group'
                value={values.qgroup}
                onChange={handleInputChange}
                options={Data_Options_OwnerGroup_Subset}
                error={errors.qgroup}
                sx={{ minWidth: '300px' }}
              />
            </Grid>
            {/*.................................................................................................*/}
            {QuizSelect_ShowSelectionGroup2 ? (
              <Grid item xs={12}>
                <MySelect
                  name='qgroup2'
                  label='Group2'
                  value={values.qgroup2}
                  onChange={handleInputChange}
                  options={Data_Options_Group2}
                  sx={{ minWidth: '300px' }}
                />
              </Grid>
            ) : null}
            {/*.................................................................................................*/}
            {QuizSelect_ShowSelectionGroup3 ? (
              <Grid item xs={12}>
                <MySelect
                  name='qgroup3'
                  label='Group3'
                  value={values.qgroup3}
                  onChange={handleInputChange}
                  options={Data_Options_Group3}
                  sx={{ minWidth: '300px' }}
                />
              </Grid>
            ) : null}
            {/*.................................................................................................*/}
            <Grid item xs={12}>
              <Typography style={{ color: 'red' }}>{form_message}</Typography>
            </Grid>
            {/*.................................................................................................*/}
            <MyButton
              text='Start Quiz'
              onClick={() => {
                g_PageNew = 'Quiz'
                SubmitForm()
              }}
            />
          </Grid>
        </Paper>
        {/*.................................................................................................*/}
        <Grid
          item
          xs={12}
          sx={{
            maxWidth: 400
          }}
        >
          <MyButton
            color='warning'
            text='Learn'
            sx={{ float: 'right' }}
            onClick={() => {
              g_PageNew = 'QuizRefs'
              SubmitForm()
            }}
          />
        </Grid>
        {/* .......................................................................................... */}
      </MyForm>
    </>
  )
}
