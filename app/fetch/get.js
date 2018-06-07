import 'whatwg-fetch'
import 'es6-promise'

export function get(url) {
  var result = fetch(url, {    //()里的整个{}可选
      credentials: 'include',
      headers: {
          'Accept': 'application/json, text/plain, */*'
      }
  })
  return result;
}


