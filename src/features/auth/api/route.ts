import { insertUser } from "@/features/api/actions";
import { auth, authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose-client";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { getServerSession } from "next-auth/next";

type MiddlewareType = {
  Variables: {
    user_id: string;
  };
};
export const sessionMiddleware = createMiddleware<MiddlewareType>(
  async (c, next) => {
    const session = await getServerSession(authOptions);
    console.log(session,"IN middleware")
    if (!session) {
      return c.body("User is not authenticated", 401);
    }
    const user_id = session.user.id;
    if (!user_id) {
      return c.body("User is not authenticated", 401);
    }
    c.set("user_id", user_id);
    await next();
  }
);

const app = new Hono()
  .get("/current", async (c) => {
    const session = await auth()
    if (!session) {
      return c.body("User is not authenticated", 401);
    }
    const user_id = session.user.id;
    if (!user_id) {
      return c.body("User is not authenticated", 401);
    }
    return c.json(session);
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
