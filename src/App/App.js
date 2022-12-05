//
// Libraries
//
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Pages
//
import QuizControl from '../pages/QuizControl'
//
//  Utilities
//
import writeHistory from '../services/writeHistory'
//
//  Common Components
//
import Layout from '../components/Layout/Layout'
//
//  Layout Theme
//
const theme = createTheme({})
//------------------------------------------------------------------------
//  Remote - Production
//------------------------------------------------------------------------
//
//  Remote Client --> Remote Server 1 --> Remote Database 1
//
const { REM_CLIENT1 } = require('../services/constants.js')
const { REM_SERVER1 } = require('../services/constants.js')
const { REM_DATABASE1 } = require('../services/constants.js')
const { REM_SERVERURL1 } = require('../services/constants.js')
//
//  Remote Client --> Remote Server 2 --> Remote Database 2
//
const { REM_CLIENT2 } = require('../services/constants.js')
const { REM_SERVER2 } = require('../services/constants.js')
const { REM_DATABASE2 } = require('../services/constants.js')
const { REM_SERVERURL2 } = require('../services/constants.js')
//------------------------------------------------------------------------
//  Local
//------------------------------------------------------------------------
//
//  Local Client --> Local Server --> Local Database 6
//
const { LOC_LOC_LOC_CLIENT6 } = require('../services/constants.js')
const { LOC_LOC_LOC_SERVER6 } = require('../services/constants.js')
const { LOC_LOC_LOC_DATABASE6 } = require('../services/constants.js')
const { LOC_LOC_LOC_SERVERURL6 } = require('../services/constants.js')
//
//  Local Client --> Local Server --> Local Database 7
//
const { LOC_LOC_LOC_CLIENT7 } = require('../services/constants.js')
const { LOC_LOC_LOC_SERVER7 } = require('../services/constants.js')
const { LOC_LOC_LOC_DATABASE7 } = require('../services/constants.js')
const { LOC_LOC_LOC_SERVERURL7 } = require('../services/constants.js')
//
//  Local Client --> Local Server 1 --> Remote Database 1
//
const { LOC_LOC_REM_CLIENT1 } = require('../services/constants.js')
const { LOC_LOC_REM_SERVER1 } = require('../services/constants.js')
const { LOC_LOC_REM_SERVERURL1 } = require('../services/constants.js')
//
//  Local Client --> Local Server 2 --> Remote Database 2
//
const { LOC_LOC_REM_CLIENT2 } = require('../services/constants.js')
const { LOC_LOC_REM_SERVER2 } = require('../services/constants.js')
const { LOC_LOC_REM_SERVERURL2 } = require('../services/constants.js')
//
// Debug Settings
//
const debugLog = debugSettings()
//
// Global
//
let g_firstTimeFlag = true
//
//  Set Defaults for REMOTE setup
//
let w_port = '13011'
let w_Client = REM_CLIENT1
let w_Database = REM_DATABASE1
let w_Server = REM_SERVER1
let w_URL = REM_SERVERURL1
//----------------------------------------------------------------------------
//- Main Line
//----------------------------------------------------------------------------
export default function App() {
  if (debugLog) console.log(`Start APP`)
  const [pageCurrent, setPageCurrent] = useState('QuizSplash')
  //
  //  Screen Width
  //
  const ScreenMedium = useMediaQuery(theme.breakpoints.up('sm'))
  const ScreenSmall = !ScreenMedium
  sessionStorage.setItem('App_Settings_ScreenSmall', ScreenSmall)
  //
  //  Set PageStart
  //
  let PageStart = 'Library'
  sessionStorage.setItem('Nav_Page_PageStart', JSON.stringify(PageStart))
  //
  //  First Time Setup
  //
  if (g_firstTimeFlag) {
    g_firstTimeFlag = false
    firstTime()
  }
  //.............................................................................
  //  First Time Setup
  //.............................................................................
  function firstTime() {
    if (debugLog) console.log(`First Time APP Reset`)
    //
    //  Override LOCAL if Windows port (from package.json)
    //
    const windowport = window.location.port
    if (windowport) {
      w_port = windowport
      localport(w_port)
    }
    //
    //  Store Client, Server, Database, URL
    //
    sessionStorage.setItem('App_Settings_Client', JSON.stringify(w_Client))
    sessionStorage.setItem('App_Settings_Server', JSON.stringify(w_Server))
    sessionStorage.setItem('App_Settings_Database', JSON.stringify(w_Database))
    sessionStorage.setItem('App_Settings_URL', JSON.stringify(w_URL))
    if (debugLog)
      console.log(
        `QuizClient-PORT(${w_port}) CLIENT(${w_Client}) SERVER(${w_Server}) DATABASE(${w_Database}) URL(${w_URL})`
      )
    //
    //  DevMode if local client
    //
    let App_Settings_DevMode
    windowport ? (App_Settings_DevMode = true) : (App_Settings_DevMode = false)
    sessionStorage.setItem('App_Settings_DevMode', App_Settings_DevMode)
    //
    //  Navigation
    //
    sessionStorage.setItem('Nav_Page_Current', JSON.stringify('QuizSplash'))
    sessionStorage.setItem('Nav_Page_Previous', JSON.stringify(''))
    //
    //  SignedIn Status
    //
    sessionStorage.setItem('User_Settings_SignedIn', false)
    //
    //  QuizSelect
    //
    sessionStorage.setItem('QuizSelect_ShowSelectionGroup2', false)
    sessionStorage.setItem('QuizSelect_ShowSelectionGroup3', false)
    //
    //  Quiz
    //
    sessionStorage.setItem('Quiz_Reset', true)
    sessionStorage.setItem('Quiz_Select_Owner', JSON.stringify(''))
    sessionStorage.setItem('Quiz_Select_OwnerGroup', JSON.stringify(''))
    sessionStorage.setItem('Quiz_Select_Group2', JSON.stringify('All'))
    sessionStorage.setItem('Quiz_Select_Group3', JSON.stringify('All'))
    //
    //  QuizHistory
    //
    sessionStorage.setItem('QuizHistory_Reset', true)
    sessionStorage.setItem('QuizHistory_SearchValue', JSON.stringify(''))
    sessionStorage.setItem('QuizHistory_SearchType', JSON.stringify('ogtitle'))
  }
  //.............................................................................
  //.  Local Port Overridden - Update Constants
  //.............................................................................
  function localport(w_port) {
    switch (w_port) {
      //------------------------------------------------------
      //  Client(Local/Remote) --> Remote Server 1 --> Remote Database 1
      //------------------------------------------------------
      case '13011':
        w_Client = REM_CLIENT1
        w_Server = REM_SERVER1
        w_Database = REM_DATABASE1
        w_URL = REM_SERVERURL1
        break
      //------------------------------------------------------
      //  Client(Local/Remote) --> Remote Server 2 --> Remote Database 2
      //------------------------------------------------------
      case '13022':
        w_Client = REM_CLIENT2
        w_Server = REM_SERVER2
        w_Database = REM_DATABASE2
        w_URL = REM_SERVERURL2
        break
      //------------------------------------------------------
      //  Local Client --> Local Server 1 --> Remote Database 1
      //------------------------------------------------------
      case '13101':
        w_Client = LOC_LOC_REM_CLIENT1
        w_Server = LOC_LOC_REM_SERVER1
        w_Database = REM_DATABASE1
        w_URL = LOC_LOC_REM_SERVERURL1
        break
      //------------------------------------------------------
      //  Local Client --> Local Server 2 --> Remote Database 2
      //------------------------------------------------------
      case '13202':
        w_Client = LOC_LOC_REM_CLIENT2
        w_Server = LOC_LOC_REM_SERVER2
        w_Database = REM_DATABASE2
        w_URL = LOC_LOC_REM_SERVERURL2
        break
      //------------------------------------------------------
      //  Local Client --> Local Server --> Local Database 6
      //------------------------------------------------------
      case '13606':
        w_Client = LOC_LOC_LOC_CLIENT6
        w_Server = LOC_LOC_LOC_SERVER6
        w_Database = LOC_LOC_LOC_DATABASE6
        w_URL = LOC_LOC_LOC_SERVERURL6
        break
      //------------------------------------------------------
      //  Local Client --> Local Server --> Local Database 7
      //------------------------------------------------------
      case '13707':
        w_Client = LOC_LOC_LOC_CLIENT7
        w_Server = LOC_LOC_LOC_SERVER7
        w_Database = LOC_LOC_LOC_DATABASE7
        w_URL = LOC_LOC_LOC_SERVERURL7
        break
      //------------------------------------------------------
      //  Error
      //------------------------------------------------------
      default:
        w_Client = 'Error'
        w_Database = 'Error'
        w_Server = 'Error'
        w_URL = 'Error'
        break
    }
  }
  //.............................................................................
  //.  Handle Page Change
  //.............................................................................
  function handlePage(nextPage) {
    //
    //  Retrieve the state
    //
    let PageCurrent = JSON.parse(sessionStorage.getItem('Nav_Page_Current'))
    const PagePrevious = JSON.parse(sessionStorage.getItem('Nav_Page_Previous'))
    //
    //  If no change of Page, return
    //
    if (nextPage === PageCurrent) return
    //
    //  Back/Start ?
    //
    const PageNext =
      nextPage === 'PAGEBACK' ? PagePrevious : nextPage === 'PAGESTART' ? PageStart : nextPage
    //
    //  Quiz End, write history
    //
    if (PageCurrent === 'Quiz') {
      writeHistory()
    }
    //
    //  Change of Page
    //
    if (debugLog) console.log(`Current Page ${PageCurrent} ==> New Page ${PageNext}`)
    //
    //  Update Previous Page
    //
    sessionStorage.setItem('Nav_Page_Previous', JSON.stringify(PageCurrent))
    if (debugLog)
      console.log(
        `UPDATED Nav_Page_Previous ${JSON.parse(sessionStorage.getItem('Nav_Page_Previous'))}`
      )
    //
    //  If SignIN, Update signed in info
    //
    if (PageNext === 'QuizSignin') {
      sessionStorage.setItem('User_Settings_SignedIn', false)
    }
    //
    //  Update NEW Page
    //
    sessionStorage.setItem('Nav_Page_Current', JSON.stringify(PageNext))
    if (debugLog)
      console.log(
        `UPDATED Nav_Page_Current ${JSON.parse(sessionStorage.getItem('Nav_Page_Current'))}`
      )
    //
    //  Update State
    //
    setPageCurrent(PageNext)
  }
  //.............................................................................
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Layout handlePage={handlePage} pageCurrent={pageCurrent}>
            <QuizControl handlePage={handlePage} />
          </Layout>
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  )
}
