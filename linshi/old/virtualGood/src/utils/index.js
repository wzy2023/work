import string from './string.js'
import number from './number.js'
import array from './array.js'
import object from './object.js'
import other from './other.js'
import hooks from './hooks.js'

export default {
  ...string,
  ...number,
  ...array,
  ...object,
  ...other,
  ...hooks,
}
