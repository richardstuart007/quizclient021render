//
//  Libraries
//
import { Card, CardContent, Typography, CardActionArea } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
// Styles
//
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'moccasin'
  },
  cardHover: {
    '&:hover': {
      backgroundColor: 'yellow'
    }
  }
}))
//===================================================================================
export default function QuizPanelCard({ answer, handleSelect }) {
  //
  // Styles
  //
  const classes = useStyles()
  //.............................................................................
  return (
    <>
      <Card
        elevation={1}
        sx={{ mt: 2, maxWidth: 600 }}
        className={`${classes.cardHover} ${classes.root}`}
      >
        <CardActionArea>
          <CardContent onClick={() => handleSelect(answer.id)} sx={{ padding: '4px' }}>
            <Typography variant='body2' color='textSecondary'>
              {answer.details}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}
