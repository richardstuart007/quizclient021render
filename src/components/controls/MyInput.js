//
//  Libraries
//
import { TextField } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'azure'
  }
}))
//
// Debug Settings
//
const debugLog = debugSettings()
//=====================================================================================
export default function MyInput(props) {
  if (debugLog) console.log('Start MyInput')
  //
  //  Deconstruct
  //
  const { name, label, value, className, error = null, onChange, ...other } = props
  //
  //  Styles
  //
  const classes = useStyles()
  //
  //  Classes
  //
  let classNames = classes.root
  if (className) classNames = classNames + ` ${className}`
  if (debugLog) console.log('classNames ', classNames)

  return (
    <TextField
      className={classNames}
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}
