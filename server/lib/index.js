var express = require('express');
var app = express();

app.use(express.json());

  const medUtils = require('openhim-mediator-utils');
const winston = require('winston');
const _ = require('underscore');
const axios = require('axios');
var request = require('request');
// const fs = require('fs');
var https = require('https');
var http = require('http');
const utils = require('./utils');

var config = {} // this will vary depending on whats set in openhim-core
const apiConf = require('../config/config')
const mediatorConfig = require('../config/mediator');

var port = mediatorConfig.endpoints[0].port
var PORT = mediatorConfig.endpoints[0].port;

console.log(apiConf, "dddddddd");
console.log(mediatorConfig, "PPPPPP");
app.use(express.json());

app.all('*', async (req, res) => {
    winston.info(`Processing ${req.method} request on ${req.url}`)
    if (req.url.startsWith(apiConf.api.urlPattern)) {
    	const options = {
        url: apiConf.api.registry.url + req.path,
        method: req.method,
        headers: {
          'Content-Type': 'application/json'
        },
        params: req.query
      };

      if (req.method === "POST" || req.method === "PUT") {
        options.data = req.body;
      }

      try {
        	const response = await axios(options);
        	res.status(response.status).send(response.data);
  	  } catch (e) {
      	console.log(e);
        
      	let resp = {}; 
        if (e.toJSON) { 
          resp = e.toJSON();
        } else { 
          resp = e;
        };
      	res.status(resp.status).send({ message: "error", code: resp.status, data: null });
      }
	}
});

function start(callback) {
  if (apiConf.api.trustSelfSigned) { process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' }
  // if (false) {
  if (apiConf.register) {
    medUtils.registerMediator(apiConf.api, mediatorConfig, (err) => {
      if (err) {
        winston.error('Failed to register this mediator, check your config')
        winston.error(err.stack)
        process.exit(1)
      }
      apiConf.api.urn = mediatorConfig.urn
      medUtils.fetchConfig(apiConf.api, (err, newConfig) => {
        winston.info('Received initial config:')
        winston.info(JSON.stringify(newConfig))
        config = newConfig
        if (err) {
          winston.error('Failed to fetch initial config')
          winston.error(err.stack)
          process.exit(1)
        }
      })
    })
  }
}
exports.start = start


if (!module.parent) {
  // if this script is run directly, start the server
  start(() => winston.info(`Listening on ${port}...`))
}

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});