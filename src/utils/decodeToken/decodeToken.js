// Convert a base 64 url encoded string to a JSON object
function decodeToken(base64url) {
  let jsonString;
  try {
    const base64 = base64url.replace('-', '+').replace('_', '/');
    //atob() is a built in JS function that decodes a base-64 encoded string
    const utf8 = atob(base64);
    const json = JSON.parse(utf8);
    jsonString = JSON.stringify(json, null, 4);
  } catch (err) {
    jsonString = 'Bad Section.\nError: ' + err.message;
  }
  return jsonString;
}

module.exports = decodeToken;
