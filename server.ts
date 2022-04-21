import { https } from "firebase-functions";
import next from "next";

const isDev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";

const server = next({
  dev: isDev,
  conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();

// the designed entry point for the cloud functions. This will be handling the incoming requests
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
