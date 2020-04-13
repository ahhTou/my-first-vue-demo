export default function compare(obj1, obj2) {
  if (Object.keys(obj1).length != Object.keys(obj2).length) {
    return false
  } else {
    for (let key in obj1) {
      if (obj2.hasOwnProperty(key)) {
        if (!Object.is(obj1[key], obj2[key])) {
          return false
        }
      } else {
        return false
      }
    }
    return true
  }
}
