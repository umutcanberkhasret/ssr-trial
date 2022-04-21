// After a change, run tsc server.ts to make sure you have the updated version translated into js

import { https } from "firebase-functions";
import next from "next";

const server = next({
  dev: false,
  conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();

// the designed entry point for the cloud functions. This will be handling the incoming requests
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
