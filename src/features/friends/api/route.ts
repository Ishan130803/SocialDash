import {
  acceptFriendRequest,
  cancelFriendRequest,
  send_friend_request,
  unfriend,
} from "@/features/api/actions";
import { sessionMiddleware } from "@/features/auth/api/session-middleware";
import { Hono } from "hono";

const app = new Hono()
  .post("/accept-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.query("friend_id");
    if (!friend_id) {
      return c.text("friend_id parameter not defined", 404);
    }

    const result = await acceptFriendRequest(user_id, friend_id);
    if (result.status !== 200) {
      return c.text(result.message, 500);
    }
    return c.text(result.message, 200);
  })
  .post("/send-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.query("friend_id");
    if (!friend_id) {
      return c.text("friend_id parameter not defined", 404);
    }

    const result = await send_friend_request(user_id, friend_id);

    if (result.status !== 200) {
      return c.text(result.message, 500);
    }
    return c.text(result.message, 200);
  })
  .post("/cancel-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.query("friend_id");
    if (!friend_id) {
      return c.text("friend_id parameter not defined", 404);
    }

    try {
      await cancelFriendRequest(user_id, friend_id);
    } catch (error) {
      return c.text((error as any).message, 500);
    }
    return c.text("Successfully Cancelled friend Request", 200);
  })
  .post("/un-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.query("friend_id");
    if (!friend_id) {
      return c.text("friend_id parameter not defined", 404);
    }

    try {
      await unfriend(user_id, friend_id);
    } catch (error) {
      return c.text((error as any).message, 500);
    }
    return c.text("Unfriended Successfully", 200);
  });

export default app;
