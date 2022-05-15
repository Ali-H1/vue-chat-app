const process = require('process')

const initializeApp = require('firebase/app');
const qs = require('qs')

const handler = async function (event) {
  // apply our function to the queryStringParameters and assign it to a variable
  const API_PARAMS = qs.stringify(event.queryStringParameters)
  console.log('API_PARAMS', API_PARAMS)
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { apiKey,appId,authDomain ,measurementId,messagingSenderId,projectId,storageBucket} = process.env
  console.log('Constructed URL is ...', apiKey,appId,authDomain ,measurementId,messagingSenderId,projectId,storageBucket)

  try {
    console.log("tocken try")
    return {
      statusCode: 200,
      body:  JSON.stringify({
        "apiKey":apiKey,
        "appId":appId,
        "authDomain":authDomain ,
        "measurementId":measurementId,
        "messagingSenderId":messagingSenderId,
        "projectId":projectId,
        "storageBucket":storageBucket
      }),apiKey
    }
  } catch (error) {
    console.log(error)
    const {  status } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status }),
    }
  }
}

module.exports = { handler }
