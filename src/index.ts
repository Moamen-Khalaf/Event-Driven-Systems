import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";
import { simulateRoute } from "./routes/simualte";

const app = new Hono();
app.use(trimTrailingSlash());
app.use("*", logger());
app.route("/api", simulateRoute);
app.use(
  "*",
  serveStatic({
    root: "/client/dist",
    manifest: {},
  })
);
export default {
  fetch: app.fetch,
};
