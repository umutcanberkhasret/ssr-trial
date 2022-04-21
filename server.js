"use strict";
exports.__esModule = true;
var firebase_functions_1 = require("firebase-functions");
var next_1 = require("next");
var server = (0, next_1["default"])({
    dev: false,
    conf: { distDir: ".next" }
});
var nextjsHandle = server.getRequestHandler();
// the designed entry point for the cloud functions. This will be handling the incoming requests
exports.nextServer = firebase_functions_1.https.onRequest(function (req, res) {
    return server.prepare().then(function () { return nextjsHandle(req, res); });
});
