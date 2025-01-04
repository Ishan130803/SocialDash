import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { StatsCard } from "./stats-card"
import { RecentPosts } from "./recent-posts"
import { TrendingTopics } from "./trending-topics"
import { Users, ThumbsUp, MessageSquare } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <StatsCard title="Total Followers" value="10,234" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
            <StatsCard title="Post Likes" value="23,456" icon={<ThumbsUp className="h-4 w-4 text-muted-foreground" />} />
            <StatsCard title="Comments" value="3,456" icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />} />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <RecentPosts />
            <TrendingTopics />
          </div>
        </main>
      </div>
    </div>
  )
}

