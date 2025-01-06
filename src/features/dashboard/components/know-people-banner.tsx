"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/rpc";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Plus, X } from "lucide-react";

type KnowPeopleBannerProps = {
  _id: string;
  name: string;
  email: string;
  image: string;
  friend_status: number;
};

function KnowPeopleBanner({
  _id,
  email,
  image,
  name,
  friend_status,
}: KnowPeopleBannerProps) {
  const avatarFallback = name?.charAt(0) ?? "U";
  let ButtonType:
    | typeof SendRequestButton
    | typeof AlreadyFriendsButton
    | typeof AlreadyFriendsButton
    | typeof AcceptRequestButton;
  if (friend_status == 0) {
    ButtonType = SendRequestButton;
  } else if (friend_status == 1) {
    ButtonType = AlreadyFriendsButton;
  } else if (friend_status == 2) {
    ButtonType = CancelRequestButton;
  } else {
    ButtonType = AcceptRequestButton;
  }

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
      <ButtonType friend_id={_id} />
    </div>
  );
}

export { KnowPeopleBanner };

const SendRequestButton = ({ friend_id }: { friend_id: string }) => {
  const queryClient = useQueryClient();
  const sendRequestHandler = async () => {
    await client.api.friends["send-friend-request"].$post({
      query: { friend_id: friend_id },
    });
    queryClient.invalidateQueries({ queryKey: ["recommended"] });
  };
  return (
    <Button
      onClick={sendRequestHandler}
      className="w-40  flex justify-center items-center gap-2 mt-4"
      variant={"primary"}
    >
      <span className="">Add Friend</span>
      <Plus />
    </Button>
  );
};

const CancelRequestButton = ({ friend_id }: { friend_id: string }) => {
  const queryClient = useQueryClient();
  const onClickHandler = async () => {
    await client.api.friends["cancel-friend-request"].$post({
      query: { friend_id: friend_id },
    });
    queryClient.invalidateQueries({ queryKey: ["recommended"] });
  };
  return (
    <Button
      onClick={onClickHandler}
      variant={"muted"}
      className="w-40 flex justify-center items-center gap-2 mt-4"
    >
      <span className="">Cancel Request</span>
      <X />
    </Button>
  );
};

const AlreadyFriendsButton = ({ friend_id }: { friend_id: string }) => {
  const queryClient = useQueryClient();
  const onClickHandler = async () => {
    await client.api.friends["un-friend-request"].$post({
      query: { friend_id },
    });
    queryClient.invalidateQueries({ queryKey: ["recommended"] });
  };
  return (
    <Button
      onClick={onClickHandler}
      variant={"destructive"}
      className="w-40  flex justify-center items-center gap-2 mt-4"
    >
      <span className="">Unfriend</span>
      <X />
    </Button>
  );
};
const AcceptRequestButton = ({ friend_id }: { friend_id: string }) => {
  const queryClient = useQueryClient();
  const onClickHandler = async () => {
    await client.api.friends["accept-friend-request"].$post({
      query: { friend_id },
    });
    queryClient.invalidateQueries({ queryKey: ["recommended"] });
  };
  return (
    <Button
      variant={"teritary"}
      onClick={onClickHandler}
      className="w-40  flex justify-center items-center gap-2 mt-4"
    >
      <span className="">Accept Request</span>
      <Check />
    </Button>
  );
};
