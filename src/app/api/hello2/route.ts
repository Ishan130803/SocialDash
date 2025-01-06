import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  console.log(session)
  return Response.json(session);
}
