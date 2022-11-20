//
//  Libraries
//
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
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
export default function MySelect(props) {
  if (debugLog) console.log('Start MySelect')
  //
  //  Deconstruct
  //
  const { name, label, value, className, error = null, onChange, options, ...other } = props
  if (debugLog) console.log('props ', props)
  if (debugLog) console.log('options ', options)
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
    <FormControl variant='outlined' {...(error && { error: true })} {...other}>
      <InputLabel>{label}</InputLabel>
      <Select
        className={classNames}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
      >
        {options.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
