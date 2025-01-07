"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
type UserAvatarProps = {
  _image: string;
  _name: string;
  _email: string;
};
function UserAvatar({ _name, _image }: UserAvatarProps) {
  const name = _name || "User";
  const image = _image || "";
  const avatarFallback = name.charAt(0) || "U";
  return (
    <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
      <AvatarImage src={image} />
      <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
        {avatarFallback}
      </AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };
