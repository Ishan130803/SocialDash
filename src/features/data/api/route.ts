import { bulkGetBasicUserData, getCurrentUser } from "@/features/api/actions";
import { authOptions } from "@/lib/auth";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { getServerSession } from "next-auth";
type MiddlewareType = {
  Variables: {
    user_id: string;
  };
};
// const sessionMiddleware = createMiddleware<MiddlewareType>(async (c, next) => {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return c.body("User is not authenticated", 401);
//   }
//   const user_id = session.user.id;
//   if (!user_id) {
//     return c.body("User is not authenticated", 401);
//   }
//   c.set("user_id", user_id);
//   await next();
// });

const app = new Hono().post("/bulk-get", async (c) => {
  const session = await getCurrentUser()
  console.log(session, "Bulk get")
  const user_ids = await c.req.json();
  const friend_data = await bulkGetBasicUserData(user_ids);
  
  return c.json(friend_data);
});

export default app;
