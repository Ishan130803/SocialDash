

import { authOptions } from "@/lib/auth";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { getServerSession } from "next-auth";
import { acceptFriendRequest } from "@/features/api/actions";
const app = express();
const router = express.Router();

type MiddlewareType = (req: Request, res: Response, next: NextFunction) => void;

const sessionMiddleware: MiddlewareType = async (req, res, next) => {
  const user_id = req.headers["user_id"];
  if (!user_id) {
    return res.status(404).json({ message: "User Id Mission" });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  const session_user_id = session?.user.id;
  if (user_id !== session_user_id) {
    return res
      .status(401)
      .json({ message: "Unauthorized User trying to acess" });
  }
  next();
};

router.use(sessionMiddleware);
app.use("/api/user", router);

router.get("/", (req, res) => {
  return "Hello World";
});

router.post("/send-friend-request", async (req: Request, res: Response) => {
  const friend_id = req.query.friend_id as string;
  const user_id = req.headers["user_id"]! as string;
  if (!friend_id) {
    return res.status(404).json({ message: "friend_id is not defined" });
  }

  const result1 = await addToSent(user_id, friend_id);
  if (result1.status !== 200) {
    return res.status(result1.status).json({ message: result1.message });
  }

  const result2 = await addToPending(user_id, friend_id);

  if (result2.status !== 200) {
    return res.status(result2.status).json({ message: result2.message });
  }
  return res.status(200).json({ message: "Successfully sent the request" });
});

router.post("/accept-friend-request", async (req: Request, res: Response) => {
  const user_id = req.headers["user_id"] as string;
  const friend_id = req.query.friend_id as string;

  if (!friend_id) {
    return res.status(404).json({ message: "friend_id is not defined" });
  }

  const result = await acceptFriendRequest(user_id, friend_id);
  return res.status(result.status).json({ message: result.message });
});

app.listen(3000, () => {
  console.log("Server is Running");
});
