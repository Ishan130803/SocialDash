import "server-only";
import { bulkGetBasicUserData } from "@/features/api/actions";
// import { sessionMiddleware } from "@/features/auth/api/route";
import { Hono } from "hono";
import { sessionMiddleware } from "@/features/auth/api/session-middleware";

const app = new Hono().post("/bulk-get", sessionMiddleware, async (c) => {
  const user_ids = await c.req.json();
  const friend_data = await bulkGetBasicUserData(user_ids);
  return c.json(friend_data);
});

export default app;
