//
//  Libraries
//
import { Table, TableBody, Card } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizBiddingTableHeader from './QuizBiddingTableHeader'
import QuizBiddingTableLine from './QuizBiddingTableLine'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizBidding = ({ qid }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (debugLog) console.log('qid ', qid)
  let testingQid = qid
  //
  //  Get Bidding
  //
  const Data_BiddingJSON = sessionStorage.getItem('Data_Bidding')
  //
  //  No Bidding, return
  //
  if (Data_BiddingJSON === []) return null
  //
  //  Parse data
  //
  const Data_Bidding = JSON.parse(Data_BiddingJSON)
  if (debugLog) console.log('Data_Bidding ', Data_Bidding)
  //
  //  Find the BiddingRow
  //
  let BiddingRow = Data_Bidding.find(element => element.bid === testingQid)
  if (debugLog) console.log('BiddingRow ', BiddingRow)
  //
  //  Has BiddingRow ?
  //
  let hasBidding
  BiddingRow === undefined ? (hasBidding = false) : (hasBidding = true)
  if (debugLog) console.log('hasBidding ', hasBidding)
  //
  //  No BiddingRow, return
  //
  if (hasBidding === false) return null
  //
  //  Build Bidding Arrays
  //
  let Rounds = [...BiddingRow.brounds]
  if (debugLog) console.log('BiddingRow.brounds ', BiddingRow.brounds)
  if (debugLog) console.log('Rounds ', Rounds)
  //
  //  Process each Round
  //
  let RoundCount = 0
  let roundsbidObjArray = []
  Rounds.forEach(round => {
    //
    //  Process each bid for a round - Create roundBidsArray
    //
    let bidObjArray = []
    round.forEach(bid => {
      if (debugLog) console.log('bid ', bid)
      //
      //  Fill bidObj (bid/suit)
      //
      const bidObj = {
        bid: '',
        suit: ''
      }
      const level = bid.substr(0, 1)
      if (debugLog) console.log('level ', level)
      switch (level) {
        // Pass
        case 'P':
          bidObj.bid = 'Pass'
          bidObj.suit = null
          break
        // Question
        case '?':
          bidObj.bid = bid
          bidObj.suit = null
          break
        // Double
        case 'X':
          bidObj.bid = bid
          bidObj.suit = null
          break
        //  Nothing
        case ' ':
          bidObj.bid = null
          bidObj.suit = null
          break
        //  Nothing
        case 'n':
          bidObj.bid = null
          bidObj.suit = null
          break
        //  Nothing
        case 'N':
          bidObj.bid = null
          bidObj.suit = null
          break
        default:
          //  No Trump
          if (bid.substr(1, 1) === 'N') {
            bidObj.bid = bid
            bidObj.suit = null
          }
          //  Suit
          else {
            bidObj.bid = level
            bidObj.suit = bid.substr(1, 1)
          }
          break
      }
      //
      //  Load bidObj to bidObjArray
      //
      bidObjArray.push(bidObj)
    })
    //
    //  Prefix bidObj with round number
    //
    if (debugLog) console.log('bidObjArray ', bidObjArray)
    const objTemp = {
      roundCount: '',
      innerArray: []
    }
    RoundCount++
    objTemp.roundCount = 'Round' + RoundCount.toString()
    objTemp.innerArray = bidObjArray
    //
    //  Load to all rounds (bidObj)
    //
    roundsbidObjArray.push(objTemp)
  })
  if (debugLog) console.log('roundsbidObjArray ', roundsbidObjArray)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Card sx={{ maxWidth: 200, marginTop: '16px' }} style={{ backgroundColor: 'LightGray' }}>
        <Table>
          {/* .......................................................................................... */}
          <QuizBiddingTableHeader />
          {/* .......................................................................................... */}
          <TableBody>
            {roundsbidObjArray.map(objTemp => (
              <QuizBiddingTableLine
                key={objTemp.roundCount}
                roundCount={objTemp.roundCount}
                round={objTemp.innerArray}
              />
            ))}
          </TableBody>
          {/* .......................................................................................... */}
        </Table>
      </Card>
    </>
  )
}

export default QuizBidding
