import { Hono } from "hono";
import { handle } from "hono/vercel";
import friends from "@/features/friends/api/route";
import data from "@/features/data/api/route";
import users, { sessionMiddleware } from "@/features/auth/api/route";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .get("/hello", async (c) => {
    const session = await getServerSession(authOptions);
    return c.json({ hello: "hello", session });
  })
  .route("/friends", friends)
  .route("/data", data)
  .route("/user", users);

export const POST = handle(app);
export const GET = handle(app);

export type AppType = typeof routes;
