//
//  Libraries
//
import { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone'
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import ScoreboardIcon from '@mui/icons-material/Scoreboard'
import QuizIcon from '@mui/icons-material/Quiz'
import PeopleIcon from '@mui/icons-material/People'
import { format, parseISO } from 'date-fns'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
import PageHeader from '../../components/controls/PageHeader'
import useMyTable from '../../components/controls/useMyTable'
import MyActionButton from '../../components/controls/MyActionButton'
//
//  Services
//

import rowCrud from '../../utilities/rowCrud'
import BuildQuizData from '../../services/BuildQuizData'
import BuildHistoryDetail from '../../services/BuildHistoryDetail'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  searchInputLarge: {
    minWidth: '300px',
    width: '30%'
  },
  searchInputSmall: {
    minWidth: '220px',
    width: '30%'
  },
  searchInputTypeBox: {
    width: '10%',
    margin: `0 0 0 ${theme.spacing(2)}`
  },
  searchInputType: {
    minWidth: '200px'
  },
  myButton: {
    margin: `0 0 0 ${theme.spacing(4)}`,
    backgroundColor: 'azure'
  }
}))
//
//  Table Heading
//
const headCellsLarge = [
  { id: 'r_id', label: 'ID' },
  { id: 'yymmdd', label: 'Date' },
  { id: 'r_owner', label: 'Owner' },
  { id: 'ogtitle', label: 'Group 1' },
  { id: 'r_questions', label: 'Questions' },
  { id: 'r_correct', label: 'Correct' },
  { id: 'r_percent', label: '%' },
  { id: 'review', label: 'Review', disableSorting: true },
  { id: 'quiz', label: 'Quiz', disableSorting: true }
]
const headCellsSmall = [
  { id: 'ogtitle', label: 'Group' },
  { id: 'review', label: 'Review', disableSorting: true },
  { id: 'quiz', label: 'Quiz', disableSorting: true }
]
const searchTypeOptionsLarge = [
  { id: 'r_id', title: 'ID' },
  { id: 'yymmdd', title: 'Date' },
  { id: 'r_owner', title: 'Owner' },
  { id: 'ogtitle', title: 'Group' }
]
const searchTypeOptionsSmall = [{ id: 'ogtitle', title: 'Group' }]
//
//  Constants
//
const functionName = 'QuizHistory'
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
//
//  Global Variables
//
let g_allUsers = false
let g_allUsersText = 'ALL'
//...................................................................................
//.  Main Line
//...................................................................................
export default function QuizHistory({ handlePage }) {
  //
  //  Start of function
  //
  if (debugFunStart) console.log(`Function: ${functionName}`)

  //
  //  Styles
  //
  const classes = useStyles()
  //
  //  State
  //
  const [records, setRecords] = useState([])
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })
  const [searchType, setSearchType] = useState('ogtitle')
  const [searchValue, setSearchValue] = useState('')
  const [startPage0, setStartPage0] = useState(false)
  const [allUsersText, setAllUsersText] = useState('ALL')
  const [subtitle, setSubtitle] = useState('')
  //
  //  Small Screen overrides
  //
  const ScreenSmall = JSON.parse(sessionStorage.getItem('App_Settings_ScreenSmall'))
  let headCells = headCellsLarge
  let searchTypeOptions = searchTypeOptionsLarge
  let searchInput = classes.searchInputLarge
  let buttonTextView = 'View'
  let buttonTextQuiz = 'Quiz'
  if (ScreenSmall) {
    headCells = headCellsSmall
    searchTypeOptions = searchTypeOptionsSmall
    searchInput = classes.searchInputSmall
    buttonTextView = null
    buttonTextQuiz = null
  }
  //
  //  Get User
  //
  const User_Settings_User = JSON.parse(sessionStorage.getItem('User_Settings_User'))
  const u_name = User_Settings_User.u_name
  const u_id = User_Settings_User.u_id
  //
  //  Default if not signed in
  //
  const User_Admin = JSON.parse(sessionStorage.getItem('User_Settings_UserAdmin'))
  //
  //  Reset Quiz State
  //
  let QuizHistory_Reset = JSON.parse(sessionStorage.getItem('QuizHistory_Reset'))
  if (debugLog) console.log('QuizHistory_Reset ', QuizHistory_Reset)
  //
  //  Initial Data Load
  //
  useEffect(() => {
    handleQuizReset()
    // eslint-disable-next-line
  }, [])
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useMyTable(
    records,
    headCells,
    filterFn,
    startPage0,
    setStartPage0
  )
  //...................................................................................
  //.  Reset the Quiz
  //...................................................................................
  function handleQuizReset() {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: handleQuizReset`)
    //
    //  Restore saved search values & search
    //
    if (!QuizHistory_Reset) {
      const QuizHistory_SearchValue = JSON.parse(sessionStorage.getItem('QuizHistory_SearchValue'))
      setSearchValue(QuizHistory_SearchValue)
      if (debugLog) console.log('QuizHistory_SearchValue ', QuizHistory_SearchValue)

      const QuizHistory_SearchType = JSON.parse(sessionStorage.getItem('QuizHistory_SearchType'))
      setSearchType(QuizHistory_SearchType)
      if (debugLog) console.log('QuizHistory_SearchType ', QuizHistory_SearchType)
    }
    //
    //  Reset flag
    //
    sessionStorage.setItem('QuizHistory_Reset', false)
    QuizHistory_Reset = false
    if (debugLog) console.log('QuizHistory_Reset ', false)
    //
    //  Get Data
    //
    getRowAllData()
  }
  //.............................................................................
  //.  GET ALL
  //.............................................................................
  function getRowAllData() {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: getRowAllData`)

    //
    //  Selection
    //
    let sqlString = `r_id, r_uid, r_datetime, r_owner, r_group, ogtitle, r_qid, r_ans, r_questions, r_correct, 100 * r_correct/r_questions as r_percent`
    sqlString = sqlString + ` from usershistory`
    sqlString = sqlString + ` join ownergroup on r_group = oggroup`
    if (!User_Admin) sqlString = sqlString + ` where r_uid='${u_id}'`
    sqlString = sqlString + ` order by r_id desc`
    if (debugLog) console.log('sqlString', sqlString)
    //
    //  Process promise
    //
    const rowCrudparams = {
      axiosMethod: 'post',
      sqlCaller: functionName,
      sqlTable: 'usershistory',
      sqlAction: 'SELECTSQL',
      sqlString: sqlString
    }
    const myPromiseGet = rowCrud(rowCrudparams)
    //
    //  Resolve Status
    //
    myPromiseGet.then(function (rtnObj) {
      if (debugLog) console.log('rtnObj ', rtnObj)
      //
      //  No data returned
      //
      if (!rtnObj.rtnValue) return
      //
      //  Data
      //
      const Data_Hist = rtnObj.rtnRows
      //
      //  Data History add time stamp
      //
      const Data_Hist_Update = Data_Hist.map(record => ({
        ...record,
        yymmdd: format(parseISO(record.r_datetime), 'yy-MM-dd')
      }))
      //
      //  Session Storage
      //
      sessionStorage.setItem('Data_Hist', JSON.stringify(Data_Hist_Update))
      if (debugLog) console.log('Data_Hist ', Data_Hist_Update)
      //
      //  Update Table
      //
      setRecords(Data_Hist_Update)
      //
      //  Filter
      //
      handleSearch()
      return
    })
    //
    //  Return Promise
    //
    return myPromiseGet
  }
  //...................................................................................
  //.  Prepare Row before switching to QuizHistoryDetail
  //...................................................................................
  function QuizHistoryRow(row) {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: QuizHistoryRow`)
    //
    //  Store Row
    //
    sessionStorage.setItem('Data_Hist_Row', JSON.stringify(row))
    //
    //  Get data
    //
    BuildHistoryDetail(row)
    //
    //  Wait for data
    //
    const waitSessionStorageParams = {
      sessionItem: 'Data_Hist_Row_Join_Received',
      handlePageValue: 'QuizHistoryDetail'
    }
    waitSessionStorage(waitSessionStorageParams, handlePage)
  }
  //...................................................................................
  //.  Prepare Row before switching to Quiz
  //...................................................................................
  function QuizBuild(row) {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: QuizBuild`)
    //
    //  Store Row
    //
    sessionStorage.setItem('Data_Hist_Row', JSON.stringify(row))
    //
    //  BuildQuizData
    //
    const SqlString_Q = `* from questions where qowner = '${row.r_owner}' and qgroup = '${row.r_group}'`
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
      handlePageValue: 'Quiz'
    }
    waitSessionStorage(waitSessionStorageParams, handlePage)
  }
  //--------------------------------------------------------------------
  //-  Wait
  //--------------------------------------------------------------------
  function waitSessionStorage(props, handlePage) {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: waitSessionStorage`)
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
        sessionStorage.setItem('QuizHistory_SearchValue', JSON.stringify(searchValue))
        sessionStorage.setItem('QuizHistory_SearchType', JSON.stringify(searchType))
        handlePage(handlePageValue)
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
  //.............................................................................
  //  Search/Filter
  //.............................................................................
  function handleSearch() {
    //
    //  Start of function
    //
    if (debugFunStart) console.log(`Function: handleSearch`)
    //
    //  Start at first page (0)
    //
    setStartPage0(true)
    if (debugLog) console.log('setStartPage0(true)')
    //
    //  Subtitle
    //
    g_allUsers ? setSubtitle('ALL USERS') : setSubtitle(`${u_name} (${u_id})`)
    //
    //  Filter
    //
    setFilterFn({
      fn: items => {
        if (debugLog) console.log('searchValue ', searchValue)
        if (debugLog) console.log('searchType ', searchType)
        if (debugLog) console.log('u_id ', u_id)
        //
        //  Filter by user ?
        //
        let userFilter = items
        if (debugLog) console.log('userFilter ', userFilter)
        if (debugLog) console.log('g_allUsers ', g_allUsers)
        if (!g_allUsers) {
          if (debugLog) console.log('Filter by user ')
          userFilter = items.filter(x => x.r_uid === u_id)
        }
        if (debugLog) console.log('userFilter ', userFilter)
        //
        //  Nothing to search, return rows
        //
        if (searchValue === '') {
          if (debugLog) console.log('setFilterFn userFilter ', userFilter)
          return userFilter
        }
        //
        //  Numeric
        //
        const searchValueInt = parseInt(searchValue)
        if (debugLog) console.log('searchValueInt ', searchValueInt)
        //
        //  Filter
        //
        let itemsFilter = userFilter
        if (debugLog) console.log('itemsFilter ', itemsFilter)
        switch (searchType) {
          case 'r_id':
            itemsFilter = userFilter.filter(x => x.r_id === searchValueInt)
            break
          case 'yymmdd':
            itemsFilter = userFilter.filter(x => x.yymmdd === searchValue)
            break
          case 'r_owner':
            itemsFilter = userFilter.filter(x =>
              x.r_owner.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'ogtitle':
            itemsFilter = userFilter.filter(x =>
              x.ogtitle.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          default:
        }
        if (debugLog) console.log('setFilterFn itemsFilter ', itemsFilter)
        return itemsFilter
      }
    })
  }
  //.............................................................................
  //  Switch to All/Users
  //.............................................................................
  function handleAllUsers() {
    if (g_allUsers) {
      g_allUsers = false
      g_allUsersText = 'ALL'
    } else {
      g_allUsers = true
      g_allUsersText = 'Users'
    }
    if (debugLog) console.log('g_allUsers ', g_allUsers)
    if (debugLog) console.log('g_allUsersText ', g_allUsersText)
    //
    //  Button Text
    //
    setAllUsersText(g_allUsersText)
    //
    //  Subtitle
    //
    g_allUsers ? setSubtitle('ALL USERS') : setSubtitle(`${u_name} (${u_id})`)
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      {/* .......................................................................................... */}
      {ScreenSmall ? null : (
        <PageHeader
          title='QUIZ History'
          subTitle={subtitle}
          icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
        />
      )}
      {/* .......................................................................................... */}
      <Paper className={classes.pageContent}>
        <Toolbar>
          {/* .......................................................................................... */}
          <MyInput
            label='Search'
            name='Search'
            value={searchValue}
            className={searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={e => setSearchValue(e.target.value)}
          />
          {/* .......................................................................................... */}
          {ScreenSmall ? null : (
            <Box className={classes.searchInputTypeBox}>
              <MySelect
                name='SearchType'
                label='Search By'
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
                options={searchTypeOptions}
                className={classes.searchInputType}
              />
            </Box>
          )}
          {/* .......................................................................................... */}
          <MyButton
            text='Filter'
            variant='outlined'
            startIcon={<FilterListIcon />}
            onClick={handleSearch}
            className={classes.myButton}
          />
          {/* .......................................................................................... */}
          {User_Admin & !ScreenSmall ? (
            <MyButton
              text={allUsersText}
              variant='outlined'
              startIcon={<PeopleIcon />}
              onClick={handleAllUsers}
              className={classes.myButton}
            />
          ) : null}
          {/* .......................................................................................... */}
        </Toolbar>
        {/* .......................................................................................... */}
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(row => (
              <TableRow key={row.r_id}>
                {ScreenSmall ? null : <TableCell>{row.r_id}</TableCell>}
                {ScreenSmall ? null : <TableCell>{row.yymmdd}</TableCell>}
                {ScreenSmall ? null : <TableCell>{row.r_owner}</TableCell>}
                <TableCell>{row.ogtitle}</TableCell>
                {ScreenSmall ? null : <TableCell>{row.r_questions}</TableCell>}
                {ScreenSmall ? null : <TableCell>{row.r_correct}</TableCell>}
                {ScreenSmall ? null : <TableCell>{row.r_percent}</TableCell>}
                <TableCell>
                  <MyActionButton
                    startIcon={<ScoreboardIcon fontSize='small' />}
                    text={buttonTextView}
                    color='warning'
                    onClick={() => {
                      QuizHistoryRow(row)
                    }}
                  ></MyActionButton>
                </TableCell>
                <TableCell>
                  <MyActionButton
                    startIcon={<QuizIcon fontSize='small' />}
                    text={buttonTextQuiz}
                    color='warning'
                    onClick={() => {
                      QuizBuild(row)
                    }}
                  ></MyActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  )
}
