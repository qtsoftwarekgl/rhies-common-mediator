module.exports = {
  "urn": "urn:uuid:c21716b0-a230-11e9-89b5-f705ca19e0e8",
  "version": "0.0.2",
  "name": process.env.MED_NAME, //"OpenMRS to SHR mediator",
  "description": process.env.MED_DESCRIPTION, //"A mediator to post OpenMRS patient medical history to SHR",
  "defaultChannelConfig": [
    {
      "name": process.env.CHANNEL_NAME, //"OpenMRS to SHR channel",
      "urlPattern": process.env.URL_PATTERN, //"/shr/",
      "alerts": [],
      "txRerunAcl": [],
      "txViewFullAcl": [],
      "txViewAcl": [],
      "properties": [],
      "matchContentTypes": [],
      "routes": [
        {
          "name": process.env.ROUTE_NAME, //"OpenMRS to SHR route",
          "host": process.env.HOST, //"rbchie01.gennxttechsol.com",
          "port": process.env.PORT, //"4004",
          "primary": true,
          "type": process.env.PROTOCOL, //"http"
        }
      ],
      "allow": ["openmrs"],
      "type": process.env.PROTOCOL, //"http"
    }
  ],
  "endpoints": [
    {
      "name": "OpenMRS to SHR endpoint",
      "host": process.env.HOST,
      "path": process.env.URL_PATTERN,
      "port": process.env.PORT,
      "primary": true,
      "type": process.env.PROTOCOL
    }
  ],
  "configDefs": [
    {
      "param": "upstreamUrl",
      "displayName": "Upstream URL",
      "description": "The URL of the service upstream of the mediator",
      "type": "string",
      "template": []
    }
  ],
  "config": {
    "upstreamUrl": process.env.UPSTREAM_URL, //"http://rbchie01.gennxttechsol.com:4004"
  }
}
