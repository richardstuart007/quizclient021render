//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Sub Components
//
import UsersSettings from './UsersSettings/UsersSettings'
import QuizSplash from './QuizSplash/QuizSplash'
import QuizRegister from './QuizRegister/QuizRegister'
import QuizSignin from './QuizSignin/QuizSignin'
import QuizSelect from './QuizSelect/QuizSelect'
import Quiz from './Quiz/Quiz'
import QuizReview from './QuizReview/QuizReview'
import QuizHistory from './QuizHistory/QuizHistory'
import QuizHistoryDetail from './QuizHistory/QuizHistoryDetail'
import QuizRefs from './QuizRefs/QuizRefs'
import Library from './Library/Library'
import SwitchUser from './SwitchUser/SwitchUser'
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
function QuizControl({ handlePage }) {
  if (debugLog) console.log('Start QuizControl')
  //.............................................................................
  //.  Main Line
  //.............................................................................
  //
  //  Retrieve the state
  //
  const PageCurrent = JSON.parse(sessionStorage.getItem('Nav_Page_Current'))
  //
  //  Present the selected component
  //
  return (
    <>
      {(() => {
        switch (PageCurrent) {
          case 'QuizSplash':
            return <QuizSplash handlePage={handlePage} />
          case 'UsersSettings':
            return <UsersSettings handlePage={handlePage} />
          case 'QuizRegister':
            return <QuizRegister handlePage={handlePage} />
          case 'QuizSignin':
            return <QuizSignin handlePage={handlePage} />
          case 'QuizSelect':
            return <QuizSelect handlePage={handlePage} />
          case 'QuizRefs':
            return <QuizRefs handlePage={handlePage} />
          case 'Library':
            return <Library handlePage={handlePage} />
          case 'Quiz':
            return <Quiz handlePage={handlePage} />
          case 'QuizReview':
            return <QuizReview handlePage={handlePage} />
          case 'QuizHistory':
            return <QuizHistory handlePage={handlePage} />
          case 'QuizHistoryDetail':
            return <QuizHistoryDetail handlePage={handlePage} />
          case 'SwitchUser':
            return <SwitchUser handlePage={handlePage} />
          default:
            return null
        }
      })()}
    </>
  )
}

export default QuizControl
