import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";

type MiddlewareType = {
  Variables: {
    user_id: string;
  };
};
export const sessionMiddleware = createMiddleware<MiddlewareType>(
  async (c, next) => {
    const session = await auth();
    console.log(session, "IN middleware");
    if (!session) {
      return c.body("User is not authenticated", 401);
    }
    const user_id = session.user?.id;
    if (!user_id) {
      return c.body("User is not authenticated", 401);
    }
    c.set("user_id", user_id);
    await next();
  }
);
