import { insertUser } from "@/features/api/actions";
import { auth, signOut, signIn } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose-client";
import { Hono } from "hono";

const app = new Hono()
  .get("/current", async (c) => {
    const session = await auth();
    if (!session) {
      return c.body("User is not authenticated", 401);
    }
    const user_id = session.user?.id;
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
  })
  .post("/logout", async (c) => {
    try {
      await signOut({redirect:false});
      console.log("Signed Out")
      return c.body("Logged Out", 200);
    } catch (error) {
      console.error(error)
      throw error;
    }
  }).post("/login", async(c) => {
    try {
      type signInType = Parameters<typeof signIn>
      const data = await c.req.json() as signInType
      await signIn(...data)
      return c.body("Signed In")
    } catch (error) {
      console.error(error)
      throw error
    }
  })

export default app;
