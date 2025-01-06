import "server-only";
import { bulkGetBasicUserData } from "@/features/api/actions";
import { authOptions } from "@/lib/auth";
// import { sessionMiddleware } from "@/features/auth/api/route";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { getServerSession } from "next-auth/next";
type MiddlewareType = {
  Variables: {
    user_id: string;
  };
};
const sessionMiddleware = createMiddleware<MiddlewareType>(async (c, next) => {
  const session = await getServerSession(authOptions);
  console.log(session, "In Post middleware");
  if (!session) {
    return c.body("User is not authenticated", 401);
  }
  const user_id = session.user.id;
  if (!user_id) {
    return c.body("User is not authenticated", 401);
  }
  c.set("user_id", user_id);
  await next();
});

const app = new Hono().post("/bulk-get", async (c) => {
  const user_ids = await c.req.json();
  const friend_data = await bulkGetBasicUserData(user_ids);
  return c.json(friend_data);
});

export default app;
