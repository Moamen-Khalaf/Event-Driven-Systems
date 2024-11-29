import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { logger } from "hono/logger";
import { simulateRoute } from "./routes/simualte";

const app = new Hono();
app.use("*", logger());
app.route("/api", simulateRoute);
app.use(
  "/client/*",
  serveStatic({
    root: "/client/dist",
    manifest: {},
  })
);
export default {
  fetch: app.fetch,
};
