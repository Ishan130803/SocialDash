import "server-only";
import { getAllUsers } from "@/features/api/actions";
// import { sessionMiddleware } from "@/features/auth/api/route";
import { Hono } from "hono";
import { sessionMiddleware } from "@/features/auth/api/session-middleware";

const app = new Hono().get("/get-all", sessionMiddleware, async (c) => {
  const alldata = (await getAllUsers()).data;
  return c.json(alldata);
});

export default app;
