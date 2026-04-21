import app from "./app";
import { bootstrapMasterAdmin } from "./bootstrap/admin";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Provision / refresh the master admin account from env vars before we
// start serving traffic. Failures are logged and swallowed so a bootstrap
// hiccup never prevents the rest of the API from coming online.
bootstrapMasterAdmin().finally(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
