import {
  acceptFriendRequest,
  send_friend_request,
} from "@/features/api/actions";
import { authOptions } from "@/lib/auth";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { getServerSession } from "next-auth";
type MiddlewareType = {
  Variables: {
    user_id: string;
  };
};

const sessionMiddleware = createMiddleware<MiddlewareType>(async (c, next) => {
  const session = await getServerSession(authOptions);
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

const app = new Hono()
  .post("/accept-friend-request",sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.param("friend_id");
    if (!friend_id) {
      return c.body("friend_id parameter not defined", 404);
    }

    const result = await acceptFriendRequest(user_id, friend_id);
    if (result.status !== 200) {
      return c.body(result.message, 500);
    }
    return c.body(result.message, 200);
  })
  .post("/send-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.param("friend_id");
    if (!friend_id) {
      return c.body("friend_id parameter not defined", 404);
    }

    const result = await send_friend_request(user_id, friend_id);

    if (result.status !== 200) {
      return c.body(result.message, 500);
    }
    return c.body(result.message, 200);
  });

export default app;
