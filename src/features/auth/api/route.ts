import { getUserData, insertUser } from "@/features/api/actions";
import { signOut, signIn } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose-client";
import { Hono } from "hono";
import { sessionMiddleware } from "./session-middleware";

const app = new Hono()
  .get("/current", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const user_data = (await getUserData(user_id)).data;
    if (!user_data) {
      return c.text("Unable to find the user", 404);
    }
    return c.json(user_data);
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
  })
  .post("/logout", async (c) => {
    try {
      await signOut({ redirect: false });
      return c.body("Logged Out", 200);
    } catch (error) {
      console.error(error);
      throw error;
    }
  })
  .post("/login", async (c) => {
    try {
      type signInType = Parameters<typeof signIn>;
      const data = (await c.req.json()) as signInType;
      await signIn(...data);
      return c.body("Signed In");
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

export default app;
