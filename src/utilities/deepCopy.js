export default function deepCopy(inObject) {
  let outObject, value, key
  //
  // Return the value if inObject is not an object
  //
  if (typeof inObject !== 'object' || inObject === null) return inObject
  //
  // Create an array or object to hold the values
  //
  outObject = Array.isArray(inObject) ? [] : {}
  //
  //  Loop through the object keys
  //
  for (key in inObject) {
    value = inObject[key]
    //
    // Recursively (deep) copy for nested objects, including arrays
    //
    outObject[key] = deepCopy(value)
  }
  //
  //  Return the deep copy object
  //
  return outObject
}
