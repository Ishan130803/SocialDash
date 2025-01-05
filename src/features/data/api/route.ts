import { bulkGetBasicUserData, insertUser } from "@/features/api/actions";
import { connectToDatabase } from "@/lib/mongoose-client";
import { Hono } from "hono";
// type MiddlewareType = {
//   Variables: {
//     user_id: string;
//   };
// };
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

const app = new Hono()
  .post("/bulk-get", async (c) => {
    const user_ids = await c.req.json();
    const friend_data = await bulkGetBasicUserData(user_ids);

    return c.json(friend_data);
  })
  .post("/register", async (c) => {
    await connectToDatabase();
    const user_data = await c.req.json();
    try {
      await insertUser(user_data);
      return c.body("User Registered Successfully", 200);
    } catch (error) {
      return c.body((error as any).message, 500);
    }
  });

export default app;
