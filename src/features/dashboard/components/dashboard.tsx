import { StatsCard } from "./stats-card";
import { RecentPosts } from "./recent-posts";
import { Users, ThumbsUp, MessageSquare } from "lucide-react";
import { UserProfileSection } from "./user-profile-section";


export function Dashboard({ params: { page } }: routeParams) {
  return <UserProfileSection />;

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatsCard
          title="Total Followers"
          value="10,234"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Post Likes"
          value="23,456"
          icon={<ThumbsUp className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Comments"
          value="3,456"
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecentPosts />
      </div>
    </>
  );
}
