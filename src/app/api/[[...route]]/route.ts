import { Hono } from "hono";
import { handle } from "hono/vercel";
import friends from "@/features/friends/api/route";
import data from "@/features/data/api/route";
import users from "@/features/auth/api/route";
import { auth } from "@/lib/auth";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .get("/hello", async (c) => {
    const session = await auth()
    return c.json({ hello: "hello", session });
  })
  .route("/friends", friends)
  .route("/data", data)
  .route("/user", users);

export const POST = handle(app);
export const GET = handle(app);

export type AppType = typeof routes;
