//------------------------------------------------------------------------
//  Remote - Production
//------------------------------------------------------------------------
exports.REMOTE_CLIENT = 'REMOTE:9103'
exports.REMOTE_SERVER = 'REMOTE:Netlify/9101'
exports.REMOTE_DATABASE = 'REMOTE:Elephant/21'
exports.REMOTE_SERVERURL = 'https://quizserver021render.onrender.com'
//------------------------------------------------------------------------
//  Local - Testing
//------------------------------------------------------------------------
//
//  8103 - Local Client --> Local Server --> Local Database
//
exports.LOC_LOC_LOC_CLIENT = 'LOCAL:8103'
exports.LOC_LOC_LOC_SERVER = 'LOCAL:8101'
exports.LOC_LOC_LOC_DATABASE = 'LOCAL/21'
exports.LOC_LOC_LOC_SERVERURL = 'http://localhost:8101'
//
//  9113 - Local Client --> Local Server --> Remote Database
//
exports.LOC_LOC_REMOTE_CLIENT = 'LOCAL:9113'
exports.LOC_LOC_REMOTE_SERVER = 'LOCAL:9101'
exports.LOC_LOC_REMOTE_SERVERURL = 'http://localhost:9101'
//
//  9103 - Local Client --> Remote Server --> Remote Database
//
exports.LOC_REMOTE_REMOTE_CLIENT = 'LOCAL:9103'
//------------------------------------------------------------------------
//  Server details
//------------------------------------------------------------------------
exports.URL_REGISTER = '/QuizRegister'
exports.URL_SIGNIN = '/QuizSignin'
exports.URL_PROFILE = '/QuizProfile/:id'
exports.URL_TABLES = '/QuizTables'
//------------------------------------------------------------------------
//  Other Parameters
//------------------------------------------------------------------------
exports.MAX_QUESTIONS_SELECT = 50
exports.WAIT = 100
exports.WAIT_MAX_TRY = 20
