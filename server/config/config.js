module.exports = {
  "api": {
    "username": process.env.OPENHIM_USERNAME, //"root@openhim.org",
    "password": process.env.OPENHIM_PASSWORD, //"Gtsl@2020",
    "apiURL": process.env.OPENHIM_APIURL, //"http://rbchie01.gennxttechsol.com:8080",
    "trustSelfSigned": "true",
    "urlPattern": process.env.URL_PATTERN,//"/shr/",
    "registry": {
      "url": process.env.REGISTRY_URL, //"http://rbchie01.gennxttechsol.com:8078",
      "user": {
        "name": "rhiesEMR",
        "pwd": "YWRtaW5QYXNzMTIzNA"
      }
    }
  },
  "register": true,
  "verbose" :true,
  "heartbeat": true
}