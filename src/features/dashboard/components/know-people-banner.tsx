import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type KnowPeopleBannerProps = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

function KnowPeopleBanner({ email, image, name }: KnowPeopleBannerProps) {
  const avatarFallback = name?.charAt(0) ?? "U";
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4 bg-neutral-100 border border-border rounded-xl">
      <Avatar className="size-[52px]transition border border-neutral-300">
        <AvatarImage src={image ?? ""} />
        <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
          {avatarFallback}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-medium text-neutral-900">{name || "User"}</p>
        <p className="text-xs text-neutral-500">{email}</p>
      </div>
      <Button className="w-full flex justify-center items-center gap-2 mt-4">
        <span className=""> Send Request</span>
        <Send />
      </Button>
    </div>
  );
}

export { KnowPeopleBanner };
